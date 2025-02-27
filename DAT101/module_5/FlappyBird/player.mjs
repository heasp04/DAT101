"use strict";
import lib2D from "../../common/libs/lib2D.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { EGameStatus, GameProps } from "./FlappyBird.mjs";

class TPlayer extends libSprite.TSprite{
    #spriteInfo;
    #gravity;
    #velocity;
    #sinWave;

    isDead;
    constructor(aSpriteCanvas, aSpriteInfo,aPosition){
        super(aSpriteCanvas, aSpriteInfo, aPosition); 
        this.#spriteInfo = aSpriteInfo;
        this.#gravity = 9.81 / 60;
        this.#velocity = 0;
        this.#sinWave = new lib2D.TSinWave(2, 5);

        this.animationSpeed = 10;
        this.isDead = false;
        //this.rotation = -45;

    }

    update(){
        //console.log("Bird pos: " + this.posY + ". Ground pos " + SpriteInfoList.ground.y);
        const groundPos = GameProps.ground.posY - this.#spriteInfo.height;

        if(this.posY < groundPos){
            if(this.posY < 0){
                this.posY = 0;
                this.#velocity = 0;
            }
            this.translate(0 , this.#velocity);
            this.rotation = this.#velocity * 8;
            this.#velocity += this.#gravity;
        } else {
            this.posY = groundPos;
            GameProps.status = EGameStatus.gameOver;
            this.animationSpeed = 0;

            GameProps.sounds.dead.play();
        }
    }

    flap(){
        this.#velocity = -4;
    }

    draw(){
        super.draw(); 
    }

    updateIdle(){
        this.translate(0, this.#sinWave.value);
    }


}

export default TPlayer;