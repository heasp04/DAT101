"use strict";
import lib2d from "../../common/libs/lib2D_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { gameProps, EGameStatus, createSequence } from "./SimonSays.mjs";

export class TColorButton extends libSprite.TSpriteButton{

    sound;

    constructor(aSpriteCanvas, aSpriteInfo){
        super(aSpriteCanvas, aSpriteInfo, aSpriteInfo.dst);
        this.sound = null;
    }

    isMouseInside(aPoint){
        let isInside = super.isMouseInside(aPoint);

        if(isInside){
            const dx = aPoint.x - gameProps.gameCenter.x;
            const dy = aPoint.y - gameProps.gameCenter.y;
            const dist = Math.hypot(dx, dy);
            isInside = (dist >= this.spi.dst.r1) && (dist <= this.spi.dst.r2);
        }
        return isInside;
    }

    onMouseDown(){
        this.index = 1;
        this.sound.play();
    }

    onMouseUp(){
        if(this.index !== 1) return; //Dersom knappen ikke er trykket ned

        this.index = 0;
        this.sound.stop();
        if(gameProps.status !== EGameStatus.player){
            return;
        }

        if(gameProps.activeButton === this){
            console.log("You did it");

            //Gameplay
            //Dersom det er flere knapper i sekvensen
            if(gameProps.seqIndex < gameProps.sequence.length - 1){
                gameProps.seqIndex++;
                gameProps.activeButton = gameProps.sequence[gameProps.seqIndex];
            } else {
                //Siste knapp i sekvensen. Computer sin tur
                gameProps.spNumberRound.value++;
                createSequence();
            }

        } else {
            console.log("... Are you dumb?");

            //Gameplay
            gameProps.status = EGameStatus.gameOver;
            gameProps.buttonStartEnd.index = 1;
            gameProps.buttonStartEnd.visible = true;

        }
    }

    onLeave(aEvent){
        if(aEvent.buttons !== 0){
            this.index = 0; 
            this.sound.stop(); 
        }
    }
} // end of TColorButton

//A.P.I.E (Abstract, polymorphism, Inheritance, Encapsulation)
//KOMMER PÅ EKSAMEN