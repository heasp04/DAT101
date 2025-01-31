/**
 * @library libSprite
 * @description A library for classes that manage sprite animations
 */

import lib2D from "./lib2D.mjs";
import lib2d from "./lib2D.mjs";

class TSpriteCanvas {
    #cvs;
    #ctx;
    #img;
    #boundingRect;

    constructor(aCanvas){
        this.#cvs = aCanvas;
        this.#ctx = aCanvas.getContext("2d");
        this.#img = new Image();
        this.#boundingRect = this.#cvs.getBoundingClientRect();
        this.mousePos = new lib2D.TPosition(0, 0);
    }

    loadSpriteSheet(aFileName, aLoadedFinal){
        this.#img.onload = aLoadedFinal;
        this.#img.src = aFileName;
    }

    drawSprite(aSpriteInfo, aDx = 0, aDy = 0, aIndex = 0, aRot = 0){
        let index = aIndex;

        const sourceX = aSpriteInfo.x + (index * aSpriteInfo.width);
        const sourceY = aSpriteInfo.y;
        const sourceWidth = aSpriteInfo.width;
        const sourceHeight = aSpriteInfo.height;

        const dx = aDx;
        const dy = aDy;
        const dw = sourceWidth;
        const dh = sourceHeight;

        if(aRot !== 0){
            //Sjekk denne i Git om noe ikke passer/funker
            const centerX = dx + dw / 2;
            const centerY = dy + dh / 2;

            const rad = aRot * Math.PI / 180;
            this.#ctx.translate(centerX, centerY);
            this.#ctx.rotate(rad);
            this.#ctx.drawImage(this.#img, sourceX, sourceY, sourceWidth, sourceHeight, -dw / 2, -dh / 2, dw, dh);
            this.#ctx.rotate(-rad);
            this.#ctx.translate(-centerX, -centerY);
        } else {
            this.#ctx.drawImage(this.#img, sourceX, sourceY, sourceWidth, sourceHeight, dx, dy, dw, dh);
        }
    }

    drawText(aText, aPos){
        this.#ctx.font = "25px Arial";
        this.#ctx.fillStyle = "#333333";
        this.#ctx.textAlign = "right";
        this.#ctx.fillText(aText, aPos.x, aPos.y);
    }

    clearCanvas(){
        this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
    }

    addEventListener(aType, aListener){
        this.#cvs.addEventListener(aType, aListener);
    }

    getMousePos(aEvent){
        this.mousePos.x = aEvent.clientX - this.#boundingRect.left;
        this.mousePos.y = aEvent.clientY - this.#boundingRect.top;

        return this.mousePos;
    }

    get style(){
        return this.#cvs.style;
    }

    
} //End of TSpriteCanvas

class TSprite {
    #spriteCanvas;
    #spriteInfo;
    #pos;
    #index;
    #speedIndex;
    
    rotation;
    boundingBox;
    animationSpeed;

    constructor(aSpriteCanvas, aSpriteInfo, aPosition){
        this.#spriteCanvas = aSpriteCanvas;
        this.#spriteInfo = aSpriteInfo;
        this.#pos = aPosition.clone(); //Vi trenger en kopi av posisjonen
        this.#index = 0;
        this.#speedIndex = 0;

        this.rotation = 0;
        this.animationSpeed = 0;
        this.boundingBox = new lib2D.TRectangle(this.#pos.x, this.#pos.y, this.#spriteInfo.width, this.#spriteInfo.height);
        
    }

    get posX(){
        return this.#pos.x;
    }

    get posY(){
        return this.#pos.y;
    }

    get left(){
        return this.#pos.x;
    }

    get right(){
        return this.#pos.x + this.#spriteInfo.width;
    }

    get index(){
        return this.#index;
    }



    getPos(){
        return this.#pos.x, this.#pos.y;
    }

    getCenter(){
        return this.boundingBox.center;
    }

    set posX(aX){
        this.#pos.x = aX;
        this.boundingBox.x = aX;
    }

    set posY(aY){
        this.#pos.y = aY;
        this.boundingBox.y = aY;
    }

    set index(aIndex){
        this.#index = aIndex;
    }

    
    
    /*set animationSpeed(aSpeed){
        this.animationSpeed = aSpeed;
    }*/

    setPos(aX, aY){
        this.#pos.x = aX;
        this.#pos.y = aY;
        this.boundingBox.x = aX;
        this.boundingBox.y = aY;
    }

    draw(){
        if(this.animationSpeed > 0){
            this.#speedIndex += this.animationSpeed / 100;

            if(this.#speedIndex >= 1){
                this.#index++;
                this.#speedIndex = 0;

                if(this.#index >= this.#spriteInfo.count){
                    this.#index = 0;
                }
            }
        }
        this.#spriteCanvas.drawSprite(this.#spriteInfo, this.#pos.x, this.#pos.y, this.#index, this.rotation);   
    }

    translate(aDx, aDy){
        this.#pos.x += aDx;
        this.#pos.y += aDy;
        this.boundingBox.x += aDx;
        this.boundingBox.y += aDy;
    }

    hasCollided(aSpriteInfo){
        return this.boundingBox.isInsideRect(aSpriteInfo.boundingBox);
    }

} //End of TSprite



/*class Square {
    #color

    constructor(aColor){
        this.#color = aColor;
    }
}

let square = new Square(red);*/

export default{
    /**
     * @class TSpriteCanvas
     * @description A class that manage sprite canvas for loading sprite sheets.
     * @param {HTMLCanvasElement} aCanvas - The canvas element to use
     * @function loadSpriteSheet - Loads a sprite sheet image
     * @param {string} aFileName - The file name of the sprite sheet image
     * @param {function} aLoadedFinal - A callback function to call when sheet is done loading
     */
    TSpriteCanvas: TSpriteCanvas,

    /**
   * @class TSprite
   * @description A class that manage sprite animations.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {TPosition} aPosition - The position of the sprite.
   * @function draw - Draws the sprite on the canvas.
   */
    TSprite: TSprite
}