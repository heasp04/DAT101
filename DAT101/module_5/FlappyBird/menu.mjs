"use strict";
import lib2D from "../../common/libs/lib2D.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus, startGame} from "./FlappyBird.mjs";

export class TMenu{
    #spGameName;
    #spPlayButton;
    #spGetReady;
    #spNumber;
    #spGameOver;
    #spMedal;

    #posScore;
    #posBestScore;
    #posPlayScore;
    #ranking = {first: 0, second: 0, third: 0};

    #spriteCvs;
    #activeSprite;

    constructor(aSpriteCanvas){
        this.#spriteCvs = aSpriteCanvas;

        //GameProps.status = EGameStatus.gameOver;
        const bgMiddle = SpriteInfoList.background.width / 2;

        //GameNameSprite creation 
        let middleX = bgMiddle - SpriteInfoList.flappyBird.width / 2;
        let pos = new lib2D.TPosition(middleX, 50);
        this.#spGameName = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);

        //"Get ready" info text creation
        middleX = bgMiddle - SpriteInfoList.infoText.width / 2;
        pos.x = middleX;
        this.#spGetReady = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

        //"GameOver" creation
        middleX = bgMiddle - SpriteInfoList.gameOver.width / 2;
        pos.x = middleX;
        pos.y = 150;
        this.#spGameOver = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.gameOver, pos);

        //Creates play button
        middleX = bgMiddle - SpriteInfoList.buttonPlay.width / 2;
        pos.x = middleX;
        pos.y = 300;
        this.#spPlayButton = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);

        //Creates numbers
        middleX = bgMiddle - SpriteInfoList.numberBig.width / 2;
        pos.x = middleX;
        pos.y = 150;
        this.#spNumber = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
        this.#spNumber.index = 3;

        //Creates medal
        pos.x = 201;
        pos.y = 192;
        this.#spMedal = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.medal, pos);

        

        this.#spriteCvs.addEventListener("mousemove", this.#onMouseMove);
        this.#spriteCvs.addEventListener("click", this.#onClick);
        this.#activeSprite = null;
        
        //Scores
        this.#posScore = new lib2D.TPosition(380, 202);
        this.#posBestScore = new lib2D.TPosition(380, 245);
        this.#posPlayScore = new lib2D.TPosition(75, 30);
    }

    draw(){
        switch(GameProps.status){
            case EGameStatus.idle:
                this.#spGameName.draw();
                this.#spPlayButton.draw();
                break;
            case EGameStatus.getReady:
                GameProps.sounds.countDown.play();
                this.#spGetReady.index = 0;
                this.#spGetReady.draw();
                this.#spNumber.draw();
                break;
            case EGameStatus.gameOver:
                GameProps.sounds.running.stop();
                GameProps.sounds.gameOver.play();
                this.#spGetReady.index = 1;
                this.#spGetReady.draw();
                this.#spGameOver.draw();
                this.#spPlayButton.draw();
                this.#spMedal.draw();

                this.#spriteCvs.drawText(GameProps.score.toString(), this.#posScore);
                this.#spriteCvs.drawText(GameProps.bestScore.toString(), this.#posBestScore);
                break;
            case EGameStatus.playing:
                this.#spriteCvs.drawText(GameProps.score.toString(), this.#posPlayScore);
                break;
        }
    } //end of draw

    increaseScore(aScore){
        GameProps.score += aScore;

        if(GameProps.score > this.#ranking.first){ //Første plass
            this.#ranking.third = this.#ranking.second;
            this.#ranking.second = this.#ranking.first;
            this.#ranking.first = GameProps.score;
            GameProps.bestScore = this.#ranking.first;
            this.#spMedal.index = 2;

        } else if (GameProps.score > this.#ranking.second){ //Andre plass
            this.#ranking.third = this.#ranking.second;
            this.#ranking.second = GameProps.score;
            this.#spMedal.index = 1;

        } else if (GameProps.score > this.#ranking.third){ //Tredje plass
            this.#ranking.third = GameProps.score;
            this.#spMedal.index = 3;

        } else { //Ingen plassering
            this.#spMedal.index = 0;
        }
    }

    reset(){
        GameProps.score = 0;
        this.#spNumber.index = 3;
        GameProps.sounds.gameOver.stop();
        GameProps.sounds.dead.stop();
        GameProps.sounds.countDown.stop();
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
            this.#spNumber.index = 3;
            setTimeout(this.#onCountDown, 1000);
        }
    }

    #onCountDown = () => {
        if(this.#spNumber.index > 1){
            this.#spNumber.index--;
            console.log(this.#spNumber.index);
            setTimeout(this.#onCountDown, 1000)
        } else {
            startGame()
        }
    }

} //End of TMenu
