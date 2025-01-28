"use strict";

import lib2D from "../../common/libs/lib2D.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TBait extends libSprite.TSprite{
    #speed;
    #sinWave;

    constructor(aSpriteCanvas, aSpriteInfo, aPosition){
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.animationSpeed = 15;
        this.#speed = Math.ceil(Math.random() * 10) / 10 + 0.5;

        const amplitude = Math.ceil(Math.random() * 3);
        this.#sinWave = new lib2D.TSinWave(1.5, 1);
        this.posY = this.#sinWave.value;
    }

    update(){
        if(GameProps.status === EGameStatus.playing){
            this.translate(-this.#speed, this.#sinWave.value);
        } else {
            this.translate(this.#speed / 2, this.#sinWave.value);
        }
    }

}

