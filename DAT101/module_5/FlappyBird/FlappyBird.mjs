"use strict";
import lib2D from "../../common/libs/lib2D.mjs";
import libSound from "../../common/libs/libSound.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import TPlayer from "./player.mjs";
import TObstacle from "./obstacle.mjs";
import {TBait} from "./bait.mjs";
import { TMenu } from "./menu.mjs";


//--------------- Objects and Variables ----------------------------------//
const chkMuteSound = document.getElementById("chkMuteSound");
const rbDayNight = document.getElementsByName("rbDayNight");
const cvs = document.getElementById("cvs");
const spriteCvs = new libSprite.TSpriteCanvas(cvs);

// prettier-ignore
export const SpriteInfoList = {
  hero1:        { x:    0, y: 545, width:   34, height:  24, count:  4 },
  hero2:        { x:    0, y: 569, width:   34, height:  24, count:  4 },
  hero3:        { x:    0, y: 593, width:   34, height:  24, count:  4 },
  obstacle:     { x:    0, y:   0, width:   52, height: 320, count:  4 },
  background:   { x:  246, y:   0, width:  576, height: 512, count:  2 },
  flappyBird:   { x:    0, y: 330, width:  178, height:  50, count:  1 },
  ground:       { x:  246, y: 512, width: 1152, height: 114, count:  1 },
  numberSmall:  { x:  681, y: 635, width:   14, height:  20, count: 10 },
  numberBig:    { x:  422, y: 635, width:   24, height:  36, count: 10 },
  buttonPlay:   { x: 1183, y: 635, width:  104, height:  58, count:  1 },
  gameOver:     { x:    0, y: 384, width:  226, height: 114, count:  1 },
  infoText:     { x:    0, y: 630, width:  200, height:  55, count:  2 },
  food:         { x:    0, y: 696, width:   70, height:  65, count: 34 },
  medal:        { x:  985, y: 635, width:   44, height:  44, count:  4 },
};

export const EGameStatus = {
  idle: 0,
  getReady: 1,
  playing: 2,
  gameOver: 3
};

export const GameProps = {
  soundMuted: false,
  dayTime: true,
  speed: 1,
  status: EGameStatus.idle, //Status for testing. Normalt EGameStatus.idle
  background: null,
  ground: null,
  player: null,
  obstacles: [],
  baits: [],
  menu: null,
  score: 0,
  bestScore: 0,
  sounds: {countDown: null, food: null, gameOver: null, dead: null, running: null},
};

//--------------- Functions ----------------------------------------------//

function playSound(aSound) {
  if (!GameProps.soundMuted) {
    aSound.play();
  } else {
    aSound.pause();
  }
}


export function startGame(){
  const pos = new lib2D.TPosition(0, 0);
  pos.x = (cvs.width / 2) - SpriteInfoList.hero1.width / 2;
  pos.y = (cvs.height / 2) - SpriteInfoList.hero1.height /2 - 75;

  GameProps.player = new TPlayer(spriteCvs, SpriteInfoList.hero1, pos);
  GameProps.obstacles = [];
  GameProps.baits = [];
  GameProps.menu.reset();
  GameProps.status = EGameStatus.playing;

  spawnObstacle();
  spawnBait();

  GameProps.sounds.running.play();

}

function loadGame(){
  console.log("Game ready to load");
  cvs.width = SpriteInfoList.background.width;
  cvs.height = SpriteInfoList.background.height;

  //Creates Menu
  GameProps.menu = new TMenu(spriteCvs);

  //Places background
  let pos = new lib2D.TPosition(0,0);
  GameProps.background = new libSprite.TSprite(spriteCvs, SpriteInfoList.background, pos);

  //Places ground
  pos.y = cvs.height - SpriteInfoList.ground.height;
  GameProps.ground = new libSprite.TSprite(spriteCvs, SpriteInfoList.ground, pos);

  //Place player
  pos.x = (cvs.width / 2) - SpriteInfoList.hero1.width / 2;
  pos.y = (cvs.height / 2) - SpriteInfoList.hero1.height /2 - 75 ;
  GameProps.player = new TPlayer(spriteCvs, SpriteInfoList.hero1, pos);

  //Load sounds
  GameProps.sounds.running = new libSound.TSoundFile("./Media/running.mp3");
  GameProps.sounds.gameOver = new libSound.TSoundFile("./Media/heroIsDead.mp3");
  GameProps.sounds.dead = new libSound.TSoundFile("./Media/gameOver.mp3");
  GameProps.sounds.food = new libSound.TSoundFile("./Media/food.mp3");
  GameProps.sounds.countDown = new libSound.TSoundFile("./Media/countDown.mp3");


  requestAnimationFrame(drawGame);
  setInterval(animateGame, 10);

} //end of loadGame

function drawGame(){
  spriteCvs.clearCanvas();
  GameProps.background.draw();
  drawObstacles();
  drawBait();
  GameProps.ground.draw();
  GameProps.player.draw();
  GameProps.menu.draw();
  

  requestAnimationFrame(drawGame);
}

function drawObstacles(){
  for(let i = 0; i < GameProps.obstacles.length; i++){
    const obstacle = GameProps.obstacles[i];
    obstacle.draw();
  }

}

function drawBait(){
  for(let i = 0; i < GameProps.baits.length; i++){
    const bait = GameProps.baits[i];
    bait.draw();
  }
}

function animateGame(){
  //Stops game if dead
  switch(GameProps.status){
    case EGameStatus.playing:
      if(GameProps.player.isDead){
        GameProps.player.animationSpeed = 0;
        GameProps.player.update();
        return;
      }
    
      GameProps.ground.translate(-GameProps.speed, 0);

    if(GameProps.ground.posX <= -SpriteInfoList.background.width){
      GameProps.ground.posX = 0;
    } 

    let delObstacleIndex = -1;
    

    for(let i = 0; i < GameProps.obstacles.length; i++){
      const obstacle = GameProps.obstacles[i];
      obstacle.update(); 

      if(obstacle.right < GameProps.player.left && !obstacle.hasPassed){
        GameProps.menu.increaseScore(20);

        obstacle.hasPassed = true;
      }

      if(obstacle.posX < -100){
        delObstacleIndex = i;
      }

      if(delObstacleIndex >= 0){
        GameProps.obstacles.splice(delObstacleIndex, 1);
      }

    }
    GameProps.player.update();

    case EGameStatus.gameOver:

      let delBaitIndex = -1;
      const posPlayer = GameProps.player.getCenter();

      for(let i = 0; i < GameProps.baits.length; i++){
        const bait = GameProps.baits[i];
        bait.update();
        const posBait = bait.getCenter();
        const distance = posPlayer.distanceToPoint(posBait);
        if(distance < 20){
          delBaitIndex = i;
        }

      }
      if(delBaitIndex >= 0){
        GameProps.baits.splice(delBaitIndex, 1);
        GameProps.sounds.food.stop();
        GameProps.sounds.food.play();
        GameProps.menu.increaseScore(10);
      }
    
    break;
    case EGameStatus.idle:
      GameProps.player.updateIdle();
      break;

  }
  
  
}

// Spawning
function spawnObstacle(){
  const obstacle = new TObstacle(spriteCvs, SpriteInfoList.obstacle);
  GameProps.obstacles.push(obstacle);
  
  //Spawns a new obstacle in 10-30 seconds
  if(GameProps.status === EGameStatus.playing){
    const seconds = Math.ceil(Math.random() * 6) + 2;
    setTimeout(spawnObstacle, seconds * 1000);
  }
}

function spawnBait(){
  const pos = new lib2D.TPosition(SpriteInfoList.background.width, 100);
  const bait = new TBait(spriteCvs, SpriteInfoList.food, pos);
  GameProps.baits.push(bait);

  if(GameProps.status === EGameStatus.playing){
    const seconds = Math.ceil(Math.random() * 10) / 10 + 1;
    setTimeout(spawnBait, seconds * 1000);
  }
}


//--------------- Event Handlers -----------------------------------------//

function setSoundOnOff() {
  if (chkMuteSound.checked) {
    GameProps.soundMuted = true;
    console.log("Sound muted");
  } else {
    GameProps.soundMuted = false;
    console.log("Sound on");
  }
} // end of setSoundOnOff

function setDayNight() {
  if (rbDayNight[0].checked) {
    GameProps.dayTime = true;
    console.log("Day time");
  } else {
    GameProps.dayTime = false;
    console.log("Night time");
  }
} // end of setDayNight

function onKeyDown(aEvent){
  console.log("Key down: " + aEvent.code);
  switch(aEvent.code){
    case "Space":
      if(!GameProps.player.isDead){
      GameProps.player.flap();
      }
      break;
  }

}

//--------------- Main Code ----------------------------------------------//
chkMuteSound.addEventListener("change", setSoundOnOff);
rbDayNight[0].addEventListener("change", setDayNight);
rbDayNight[1].addEventListener("change", setDayNight);

spriteCvs.loadSpriteSheet("./Media/FlappyBirdSprites.png", loadGame);
document.addEventListener("keydown", onKeyDown);

