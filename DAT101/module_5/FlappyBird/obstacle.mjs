"use strict";
import lib2D from "../../common/libs/lib2D.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class TObstacle {
    #spriteInfo;
    #upper;
    #lower;

    hasPassed;

    constructor(aSpriteCanvas, aSpriteInfo){
        this.#spriteInfo = aSpriteInfo;

        const spawnPointX = 576;
        const minTop = -320 + 25;
        let top = Math.floor(Math.random() * minTop);
        let pos = new lib2D.TPosition(650, top);

        const posU = new lib2D.TPosition(spawnPointX, top);
        this.#upper = new libSprite.TSprite(aSpriteCanvas, aSpriteInfo, posU);
        this.#upper.index = 3;
        const groundY = GameProps.ground.posY;
        top += this.#spriteInfo.height + 170;
        const gap = top - groundY - 25;

        top = Math.floor(Math.random() * gap) + groundY -25;
        pos.y = top;

        const posL = new lib2D.TPosition(spawnPointX, top);
        this.#lower = new libSprite.TSprite(aSpriteCanvas, aSpriteInfo, posL);
        this.#lower.index = 2;

        this.hasPassed = false;
    }

    get posX(){
        return this.#upper.posX;
    }

    get right(){
        return this.#upper.right;
    }

    get left(){
        return this.#upper.left;
    }

    update(){
        this.#upper.translate(-1, 0);
        this.#lower.translate(-1, 0);
        
        const hasCollided = 
        GameProps.player.hasCollided(this.#upper) ||
        GameProps.player.hasCollided(this.#lower);

        if(hasCollided){
            GameProps.player.flap();
            GameProps.player.isDead = true;
            console.log("Ya died");
        }
        
    }

    draw(){
        if(GameProps.dayTime === false){
            this.#upper.index = 1;
            this.#lower.index = 0;
        } else {
            this.#upper.index = 3;
            this.#lower.index = 2;
        }
        this.#upper.draw();
        this.#lower.draw();
    }

}

export default TObstacle;