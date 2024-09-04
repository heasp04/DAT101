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

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
let days = 3;
let hours = 12;
let minutes = 14;
let seconds = 45;
let totalMinutes;

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
//Gjenbruker samme navn som forige oppgave
totalMinutes = 6322.52;

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
let totalDollars = 54;
// 76 NOK = 8.6 USD

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
let sentence = "There is much between heaven and earth that we do not understand.";

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
if(5 > 3){

}

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
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