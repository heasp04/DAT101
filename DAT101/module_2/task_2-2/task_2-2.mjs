"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let originalAnswer;
let modifiedAnswer;

originalAnswer = 2 + 3 * 2 - 4 * 6;
modifiedAnswer = 2 + 3 * (2 - 4) * 6;

printOut("The original answer is " + originalAnswer + ". The modified answer is " + modifiedAnswer);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
let meters = 25;
let centimeters = 34;
let inchInMillimeters = 25.4;
let millimeters = meters * 1000 + centimeters * 10;
let inches = millimeters / inchInMillimeters;

printOut(meters + " meters and " + centimeters + " centimeters is: " + inches.toFixed(2) + " inches");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
let days = 3;
let hours = 12;
let minutes = 14;
let seconds = 45;
let totalMinutes = days * 24 * 60 +
                   hours * 60 +
                   minutes +
                   seconds / 60;

printOut(days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds is: " + totalMinutes + " minutes");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
//Gjenbruker samme navn som forige oppgave
let originalMinutes = 6322.52;totalMinutes = originalMinutes;
days = Math.floor(totalMinutes / 60 / 24);
totalMinutes -= days * 60 * 24;

hours = Math.floor(totalMinutes / 60);
totalMinutes -= hours * 60;

minutes = Math.floor(totalMinutes);
totalMinutes -= minutes;

seconds = totalMinutes * 60;

printOut(originalMinutes + " minutes is the same as: " + days+ " days, " +hours+ " hours, " +minutes+ " minutes and " +seconds.toFixed(1)+ " seconds");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
let dollars = 54;
let kroner = (dollars / 8.6) * 76;
dollars = (kroner / 76) * 8.6;

printOut("Kroner: " +  Math.floor(kroner) + ". Dollar: " + Math.floor(dollars));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
let sentence = "There is much between heaven and earth that we do not understand.";

printOut(sentence);
printOut("Answer 1: " + sentence.length);
printOut("Answer 2: " + sentence.charAt(19));
printOut("Answer 3: " + sentence.slice(35, 35 + 8));
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");

if(5 > 3){
    printOut("First one is: True");
} else{
    printOut("First one is: False");
}

if(7 >= 7){
    printOut("Second one is: True");
} else {
    printOut("Second one is: False");
}

if("a" > "b"){
    printOut("Third one is: True");
} else {
    printOut("Third one is: False");
}

if("1" < "a"){
    printOut("Fourth one is: True");
} else {
    printOut("Fourth one is: False");
}

if("2500" < "abcd"){
    printOut("Fifth one is: True");
} else {
    printOut("Fifth one is: False");
}

if("arne" != "thomas"){
    printOut("Sixth one is: True");
} else {
    printOut("Sixth one is: False");
}

if((2==5) == true){
    printOut("Seventh one is: True");
} else {
    printOut("Seventh one is: False");
}

if(("abcd" > "bcd") != true){
    printOut("Eight one is: True");
} else {
    printOut("Eight one is: False");
}

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
let first = "254";
let second = "57.23";
let third = "25 kroner";

printOut(parseInt(first).toString());
printOut(parseFloat(second).toString());
printOut(parseInt(third).toString());
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
let r = Math.round(Math.random() * 360);

printOut("This will now be a random number between 1 and 360: " + r);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
let totalDays = 131;
let weeks;
days = 0;

days = totalDays % 7;
totalDays = totalDays - days;
weeks = totalDays / 7;

printOut("131 days is the same as " + weeks + " weeks and " + days + " days");
printOut(newLine);