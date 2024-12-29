"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 & 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function todaysDate(){
    let today   = new Date()
    
    printOut(today.toLocaleString('no-NB', {timeZone: "UTC",
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"}));
}

todaysDate();

printOut(newLine);


printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
let radius = 5;

function circle(aRadius){
    let diameter = aRadius * 2;
    let circumference = diameter * Math.PI;
    let area = Math.PI * (aRadius**2);

    return "With a radius of " + aRadius + ", the diameter is " + diameter + " with a circumference of " + circumference.toFixed(2) + " and an area of " + area.toFixed(2);
}

let result = circle(radius);

printOut(result.toString());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let width = 3;
let height = 4;

function rectangle(aWidth, aHeight){
    let circumference = aWidth * 2 + aHeight * 2;
    let area = aWidth * aHeight;

    return "With a height of " + aHeight + " and a width of " + aWidth + 
    ", the circumference is " + circumference + ", and the area is " + area;
}

result = rectangle(width, height);

printOut(result.toString());
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const ETemperatureType = {Celsius: 1, Fahrenheit: 2, Kelvin: 3};

function convertTemperature(aTemperature, aType){
    let Fahrenheit = 0;
    let Celsius = 0;
    let Kelvin = 0;

    switch(aType){
        case ETemperatureType.Celsius:
            printOut("Convert from Celsius");
            Celsius = aTemperature;
            Fahrenheit = (Celsius * (9/5) + 32);
            Kelvin = Celsius + 237.15;
            break;
        case ETemperatureType.Fahrenheit:
            printOut("Convert from Fahrenheit");
            Fahrenheit = aTemperature;
            Celsius = (Fahrenheit - 32) * (5/9);
            Kelvin = (5/9) * Fahrenheit + 459.67;
            break;
        case ETemperatureType.Kelvin:
            printOut("Convert from Kelvin");
            Kelvin = aTemperature;
            Celsius = Kelvin - 237.15;
            Fahrenheit = (Kelvin - 237.15) * (9/5) + 32;
            
            break;
    } //end switch

    printOut("Celcius = " + Celsius.toFixed(0));
    printOut("Fahernheit = " + Fahrenheit.toFixed(0));
    printOut("Kelvin = " + Kelvin.toFixed(0));
}

convertTemperature(0, ETemperatureType.Celsius)

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function calculateNetPrice(aPrice, aTaxGroup){
    let net = NaN;
    let taxGroup =aTaxGroup.toUpperCase();
    let vat = NaN;

    printOut("Tax Group = " + taxGroup);

    switch(taxGroup){
        case "NORMAL":
            vat = 25;
            break;
        case "FOOD":
            vat = 15;
            break;
        case "CINEMA":
            vat = 10;
            break;
        case "CLOTHING":
            vat = 10;
            break;
        case "OTHER":
            vat = 10;
            break;
    }

    if(!Number.isNaN(vat)){
        net = (100* aPrice) / (vat + 100);
    }

    return net;
}

const netPrice1 = calculateNetPrice(0, "normal");

if(Number.isNaN(netPrice1)){
    printOut("Unknown VAT group!");

} else {
    printOut("netPrice1 = " + netPrice1.toFixed(2));
}


printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");

function speedTriangle(aSpeed, aDistance, aTime){
    console.log(aSpeed, aDistance, aTime);
    let speed = aSpeed;
    let distance = aDistance;
    let time = aTime;
    let answer;
    console.log(speed, distance, time, answer);
    
    
    if(Number.isNaN(speed) && !Number.isNaN(distance) && !Number.isNaN(time)){
        //calculate speed
        speed = distance / time;
        answer = "If you travel a distance of " + distance + " km in the span of " + time + " hours, you need a speed of " + speed.toFixed() + " km/h";
        return answer;

    } else if(!Number.isNaN(speed) && Number.isNaN(distance) && !Number.isNaN(time)){
        //calculate distance
        distance = speed * time;
        answer = "If you travel for " + time + " hours with a speed of " + speed + " km/h, you will have traveled " + distance.toFixed(2) + " km";
        return answer;

    } else if(!Number.isNaN(speed) && !Number.isNaN(distance) && Number.isNaN(time)){
        //calculate time
        time = distance / speed;
        answer = "If you travel a distance of " + distance + " km, with a speed of " + speed + " km/h, you'll use " + time.toFixed(2) + " hours";
        return answer;

    } else {
        answer = "You are missing two or all variables to perform the equation";
        return answer;
    }
    
}
//Må skrive inn NaN i enn av argumentene. Vil ikke fungere ellers
result = speedTriangle(3, 4, NaN);

printOut(result.toString());
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function stringParameters(aText, aMaxSize, aChar, aInsertion){
    if(typeof aText !== "string" || typeof aMaxSize !== "number" || typeof aChar !== "string" || typeof aInsertion !== "boolean"){
        printOut("You have inputed one or more invalid parameters");
        return;
    }

    if(aText.length >= aMaxSize){
        return aText;
    }

    let charsToAdd = aMaxSize - aText.length;
    let padding = aChar.repeat(charsToAdd);
    let newText;
    if(aInsertion){
        newText = padding + aText;
    } else {
        newText = aText + padding;
    }

    return newText;
}

printOut(stringParameters("Hello world", 15, "x", true));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
//Denne blir ikke ferdig.
//Ikke pga programmerings kunnskapen min, men fordi jeg suger i matte-

function testIfMathIsFun(){
    let op = 1;
    let line = 1;

    //Left side
    let ok = false;

    do{
        let sumLeft = 0;
        for(let left = 0; left < line + 1; left++){
            sumLeft += op;
            op++;
        }

        //op = 1;
        //Right side
        let sumRight = 0;
        for(let right = 0; right < line; right++){
            sumRight += op;
            op++;
        }
        
        if(sumLeft !== sumRight){
            ok = false
            //må stoppe funksjonen
        } else {
            ok = true;
        }
        line++;
        
    } while(ok);
}

printOut("Jeg vet ikke hvordan jeg skulle løst denne på papir, så jeg vet ikke hvordan jeg skal løse den med kode");
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let number = 6;
function factorial(aNumber){
    if(aNumber <= 1){
        return aNumber
    }
    return aNumber * factorial(aNumber - 1);
}


printOut("Factorial of " + number + " = " + factorial(number));
printOut(newLine);
