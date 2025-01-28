"use strict";
/**
 * @library lib2d
 * @description A library for classes that manage 2D graphics
 */


class TPoint{
    x = 0;
    y = 0;

    constructor(aX, aY){
        this.x = aX;
        this.y = aY;
    }
}

class TPosition extends TPoint { //Inherits from TPoint

    constructor(aX, aY){
        super(aX, aY);
    }

    clone(){
        return new TPosition(this.x, this.y);
    }

    distanceToPoint(aPoint){
        const dx = this.x - aPoint.x;
        const dy = this.y - aPoint.y;
        return Math.hypot(dx, dy);
    }
} //End of TPosition

class TRectangle extends TPosition {
    width;
    height;

    constructor(aX, aY, aWidth, aHeight){
        super(aX, aY);
        this.width = aWidth;
        this.height = aHeight;
    }
    
    set center(aPoint){
        this.x = aPoint.x - this.width / 2;
        this.y = aPoint.y - this.height / 2;
    }

    get left(){
        return this.x;
    }

    get right(){
        return this.x + this.width;
    }

    get top(){
        return this.y;
    }

    get bottom(){
        return this.y + this.height;
    }
    get center(){
        return new TPosition(this.x + this.width / 2, this.y + this.height / 2);
    }

    isInsideRect(aRectangle){
        if(this.left >= aRectangle.right) return false;
        if(this.right <= aRectangle.left) return false;
        if(this.top >= aRectangle.bottom) return false;
        if(this.bottom <= aRectangle.top) return false;
        return true;

    }

    isPositionInside(aPosition){
        if(this.left >= aPosition.x) return false;
        if(this.right <= aPosition.x) return false;
        if(this.top >= aPosition.y) return false;
        if(this.bottom <= aPosition.y) return false;
        return true;
    }
} //end of rectangle

const rad = Math.PI / 180;

class TSinWave {
    #amplitude;
    #frequency;
    #angle;

    constructor(aAmplitude, aFrequency){
        this.#amplitude = aAmplitude;
        this.#frequency = aFrequency;
        this.#angle = 0;
    }

    get value(){
        let value = this.#amplitude * Math.sin(this.#angle * rad);
        this.#angle += this.#frequency;
        return value;
    }
} //end of TSinWave

export default {
    /**
     * @class TPoint
     * @description A class representation for x and y point in 2D
     * @param {number} aX - x-coordinate
     * @param {number} aY - y-coordinate
     */
    TPoint,

    /**
     * @class TPosition
     * @description A position class for manipulation of point in 2D
     * @extends TPoint
     * @param {number} aX - x-coordinate
     * @param {number} aY - y-coordinate
     * @method clone - A method to clone the position object
     * @method distanceToPoint - A method to calculate the distance to another point
     */
    TPosition,


    /**
     * @class TRectangle
     * @extends TPosition
     * @description A class representation for a rectangle in 2D
     * @param {number} aX - The x-coordinate
     * @param {number} aY - The y-coordinate
     *  
     */
    TRectangle,

    /**
     * @class TSinWave
     * @description A class representation for a sine wave
     */
    TSinWave
}