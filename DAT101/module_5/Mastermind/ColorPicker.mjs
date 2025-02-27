"use strict"

import lib2D_v2 from "../../common/libs/lib2D_v2.mjs";
import libSprite_v2 from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";


const positions = MastermindBoard.ColorPicker;

export class TColorPicker extends libSprite_v2.TSprite{

    constructor(spriteCvs, spriteInfo, color, index){
        super(spriteCvs, spriteInfo, positions[color]);
        //this.index = index;
        
    }
}