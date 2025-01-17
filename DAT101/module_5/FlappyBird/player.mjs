"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class TPlayer extends libSprite.TSprite{
    #spriteInfo;
    #gravity;
    #velocity;
    constructor(aSpriteCanvas, aSpriteInfo,aPosition){
        super(aSpriteCanvas, aSpriteInfo, aPosition); 
        this.#spriteInfo = aSpriteInfo;
        this.#gravity = 9.81 / 60;
        this.#velocity = 0;
        this.animationSpeed = 10;
    }

    update(){
        //console.log("Bird pos: " + this.posY + ". Ground pos " + SpriteInfoList.ground.y);
        const groundPos = GameProps.ground.posY - this.#spriteInfo.height;

        if(this.posY < groundPos){
            if(this.posY){
                this.posY = 0;
                this.#velocity = 0;
            }
            this.translate(0 , this.#velocity);
            this.#velocity += this.#gravity;
        } else {
            this.posY = groundPos;
        }
    }

    flap(){
        this.#velocity = -4;
    }

    draw(){
        super.draw(); 
    }


}

export default TPlayer;