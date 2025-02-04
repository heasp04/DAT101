"use strict";
//--------------- Objects and Variables ----------------------------------//
import lib2d from "../../common/libs/lib2D_v2.mjs";
import libSound from "../../common/libs/libSound.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TColorButton } from "./colorButton.mjs";



// prettier-ignore
export const SpriteInfoList = {
  background:     { x: 0, y:    0, width: 720, height: 720, count:  1 },
  buttonYellow:   { x: 0, y:  720, width: 314, height: 314, count:  2, dst: { x:  29, y: 377, r1: 100, r2: 333 } },
  buttonBlue:     { x: 0, y: 1034, width: 314, height: 314, count:  2, dst: { x: 377, y: 377, r1: 100, r2: 333 } },
  buttonRed:      { x: 0, y: 1348, width: 314, height: 314, count:  2, dst: { x: 377, y:  29, r1: 100, r2: 333 } },
  buttonGreen:    { x: 0, y: 1662, width: 314, height: 314, count:  2, dst: { x:  29, y:  29, r1: 100, r2: 333 } },
  buttonStartEnd: { x: 0, y: 1976, width: 360, height: 360, count:  2, dst: { x: 180, y: 180, r1:   1, r2: 180 } },
  number:         { x: 0, y: 2344, width:  23, height:  34, count: 10, dst: { x: 365, y: 385}},
};

const cvs = document.getElementById("cvs");
const spriteCvs = new libSprite.TSpriteCanvas(cvs);

export const EGameStatus = {
  idle: 0,
  computer: 1,
  player: 2,
  gameOver: 3,
};

export const gameProps = {
  background: new libSprite.TSprite(spriteCvs, SpriteInfoList.background, {x: 0, y: 0}),
  gameCenter: new lib2d.TPosition(SpriteInfoList.background.width / 2, SpriteInfoList.background.height /2),
  status: EGameStatus.computer,
  gameSpeed: 800,
  spNumberRound: new libSprite.TSpriteNumber(
    spriteCvs, SpriteInfoList.number, SpriteInfoList.number.dst),

  colorButtons: [new TColorButton(spriteCvs, SpriteInfoList.buttonYellow),
                 new TColorButton(spriteCvs, SpriteInfoList.buttonBlue),
                 new TColorButton(spriteCvs, SpriteInfoList.buttonRed),
                 new TColorButton(spriteCvs, SpriteInfoList.buttonGreen)],
  sequence: [],
  seqIndex: null, //Hvilken knapp i sekvensen vi er på
  activeButton: null,
  buttonStartEnd: new libSprite.TSpriteButton(
    spriteCvs, SpriteInfoList.buttonStartEnd, SpriteInfoList.buttonStartEnd.dst, lib2d.TCircle),
};



//--------------- Functions ----------------------------------------------//

function loadGame(){
  cvs.width = gameProps.background.width;
  cvs.height = gameProps.background.height;
  gameProps.buttonStartEnd.onClick = startGame;
  setDisabledButtons(true);
  drawGame();
  
}

function startGame(){
  //Hardkoding av simluasjon
  gameProps.buttonStartEnd.visible = false;
  libSound.activateAudioContext();
  gameProps.colorButtons[0].sound = new libSound.TSoundWave(4, "G", libSound.EWaveformType.Sine);
  gameProps.colorButtons[1].sound = new libSound.TSoundWave(4, "A", libSound.EWaveformType.Sine);
  gameProps.colorButtons[2].sound = new libSound.TSoundWave(5, "C", libSound.EWaveformType.Sine);
  gameProps.colorButtons[3].sound = new libSound.TSoundWave(4, "B", libSound.EWaveformType.Sine);
  //gameProps.sequence.push(gameProps.colorButtons[0]);
  gameProps.sequence = [];
  gameProps.gameSpeed = 800;
  gameProps.spNumberRound.value = 0; //Vi starter alltid på runde 0
  createSequence();
}

function drawGame(){
  spriteCvs.clearCanvas();
  gameProps.background.draw();
  
  for(let i = 0; i < gameProps.colorButtons.length; i++){
      gameProps.colorButtons[i].draw();
    }

  gameProps.spNumberRound.draw();
  gameProps.buttonStartEnd.draw();

  requestAnimationFrame(drawGame);

}

function setDisabledButtons(aDisabled){
  for(let i = 0; i < gameProps.colorButtons.length; i++){
    gameProps.colorButtons[i].disable = aDisabled;
  }
}

export function createSequence(){
  const index = Math.floor(Math.random() * gameProps.colorButtons.length);
  const button = gameProps.colorButtons[index];

  gameProps.sequence.push(button);
  gameProps.seqIndex = 0;
  gameProps.activeButton = gameProps.sequence[0];

  gameProps.status = EGameStatus.computer;
  setDisabledButtons(true);

  setTimeout(setMouseDown, gameProps.gameSpeed);

  //Kan endres på for å øke farten raskere
  if(gameProps.gameSpeed > 100){
    gameProps.gameSpeed -= 50;
  }

}

function setMouseDown(){
 gameProps.activeButton.onMouseDown();
 setTimeout(setMouseUp, gameProps.gameSpeed);
}

function setMouseUp(){
  let done = false;

  if(gameProps.seqIndex < gameProps.sequence.length - 1){
    //Her er det flere knapper igjen i sekvensen
    gameProps.activeButton.onMouseUp();
    gameProps.seqIndex++;
  } else {
    gameProps.activeButton.onMouseUp();
    gameProps.seqIndex = 0;
    done = true;
  }
  
  gameProps.activeButton = gameProps.sequence[gameProps.seqIndex];

  if(!done){
    setTimeout(setMouseDown, gameProps.gameSpeed);
  } else {
    gameProps.status = EGameStatus.player;
    setDisabledButtons(false);
  }
}



//--------------- Event Handlers -----------------------------------------//

//--------------- Main Code ----------------------------------------------//
spriteCvs.loadSpriteSheet("./media/spriteSheet.png", loadGame);