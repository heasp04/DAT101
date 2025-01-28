"use strict";
import lib2D from "../../common/libs/lib2D.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TMenu{
    #spGameName;
    #spPlayButton;
    #spGetReady;
    #spNumber;
    #spriteCvs;
    #activeSprite;

    constructor(aSpriteCanvas){
        this.#spriteCvs = aSpriteCanvas;

        //GameNameSprite creation 
        const middleXName = SpriteInfoList.background.width / 2 - SpriteInfoList.flappyBird.width / 2;
        let pos = new lib2D.TPosition(middleXName, 50);
        this.#spGameName = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);

        //"Get ready" info text creation
        this.#spGetReady = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

        //Creates play button
        const middleXButton = SpriteInfoList.background.width / 2 - SpriteInfoList.buttonPlay.width / 2;
        pos = new lib2D.TPosition(middleXButton, 150);
        this.#spPlayButton = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);

        //Creates numbers
        const middleXNumber = SpriteInfoList.background.width / 2 - SpriteInfoList.numberBig.width / 2;
        pos = new lib2D.TPosition(middleXNumber, 150);
        this.#spNumber = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
        this.#spNumber.index = 3;

        this.#spriteCvs.addEventListener("mousemove", this.#onMouseMove);
        this.#spriteCvs.addEventListener("click", this.#onClick);
        this.#activeSprite = null;
        
    }

    draw(){
        switch(GameProps.status){
            case EGameStatus.idle:
                this.#spGameName.draw();
                this.#spPlayButton.draw();
                break;
            case EGameStatus.getReady:
                this.#spGetReady.draw();
                this.#spNumber.draw();
                break;
        }
    }

    #onMouseMove = (aEvent) => {
        const pos = this.#spriteCvs.getMousePos(aEvent);
        const boundRect = this.#spPlayButton.boundingBox;

        switch(GameProps.status){
            case EGameStatus.idle:
                if(boundRect.isPositionInside(pos)){
                    this.#spriteCvs.style.cursor = "pointer";
                    this.#activeSprite = this.#spPlayButton;
                } else {
                    this.#spriteCvs.style.cursor = "default";
                    this.#activeSprite = null;
                }
                break;
        }

    }

    #onClick = () => {
        if(this.#activeSprite === this.#spPlayButton){
            GameProps.status = EGameStatus.getReady;
            this.#spriteCvs.style.cursor = "default";
            this.#onCountDown();
        }
    }

    #onCountDown = () => {
        if(this.#spNumber.index > 1){
            this.#spNumber.index--;
            setTimeout(this.#onCountDown, 1000)
        } else {
            GameProps.status = EGameStatus.playing;
        }
    }

} //End of TMenu
