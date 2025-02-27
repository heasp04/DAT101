"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2d from "../../common/libs/lib2D_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TColorPicker } from "./ColorPicker.mjs";
import MastermindBoard from "./MastermindBoard.mjs";


//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  board:              { x: 320, y:   0, width: 441, height: 640, count: 1 },
  buttonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 2 },
  buttonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 2 },
  buttonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 2 },
  panelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  colorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  colorHint:          { x:   0, y: 250, width:  19, height:  18, count: 2 },
};

const cvs = document.getElementById("cvs");
const spriteCvs = new libSprite.TSpriteCanvas(cvs);


//Add all you game objects here
export const gameProps = {
 board: null,
 colorPickers: [],
}

//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

function newGame() {
}

function drawGame(){
  spriteCvs.clearCanvas();
  gameProps.board.draw();

  for(let i = 0; i < gameProps.colorPickers.length; i++){
    const colorPicker = gameProps.colorPickers[i];
    colorPicker.draw();
  }
  
  //Draw all game objects here, remember to think about the draw order (layers in PhotoShop for example!)
  
  requestAnimationFrame(drawGame);
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.board.width;
  cvs.height = SpriteInfoList.board.height;

  gameProps.board = new libSprite.TSprite(spriteCvs, SpriteInfoList.board, {x: 0, y: 0});

  const colorKeys = Object.keys(MastermindBoard.ColorPicker);
  for(let i = 0; i < colorKeys.length; i++){
    const colorName = colorKeys[i];
    const colorPicker = new TColorPicker(spriteCvs, SpriteInfoList.colorPicker, colorName)
    gameProps.colorPickers.push(colorPicker);
  }

  //gameProps.colorPickers = new TColorPicker(spriteCvs, SpriteInfoList.colorPicker, "Black");

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}


//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------


spriteCvs.loadSpriteSheet("./Media/SpriteSheet.png", loadGame);