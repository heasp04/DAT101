"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
//Lagde først med array, men fant så en måte å gjøre det uten å bruke array

//Med Array
let list1 = [];
let list2 = [];

for(let i = 0; i < 10; i++){
    list1[i] = i +1;
    list2[i] = 10 - i;
}
printOut(list1.join(", "));
printOut(list2.join(", "));

printOut(newLine);

//Uten Array
let text1 = "";
let text2 = "";

for(let i = 1; i <= 10; i++){
    text1 += i.toString();
    text2 += (11 - i).toString();
    if(i < 10){
        text1 += ", ";
        text2 += ", ";
    }
}
printOut(text1);
printOut(text2);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
let randomInt = Math.floor((Math.random() * 60) + 1);
let guessingInt = 0;
let attempt = 0;

while(guessingInt != randomInt){
    guessingInt = Math.floor(Math.random() * 60);
    attempt += 1;
}

printOut("The number that needs to be guessed is: " + randomInt);
printOut("It took " + attempt + " tries for the function to guess the original number");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
//Guess between 1 and 1 million, and figure out how many milliseconds it too with Date.now();

randomInt = Math.floor((Math.random() * 2000000) + 1);
guessingInt = 0;
attempt = 0;
let endTime;
let duration;

let startTime = Date.now();
while(guessingInt != randomInt){
    guessingInt = Math.floor(Math.random() * 2000000);
    attempt++;
}
endTime = Date.now();
duration = endTime - startTime;


printOut("The number that needs to be guessed is: " + randomInt);
printOut("It took " + attempt + " tries and");
printOut(duration + " milliseconds for the function to guess the original number")
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
//Synes det er enklest å jobbe med array, som er hvorfor det er brukt

let primes = [];
let counter = 2;

while(counter <= 200) {
    let isPrime = true;
    for(let i = 2; i < counter - 1; i++) {
        if(counter % i == 0) {
            isPrime = false;
            break;
        }
    }
    if(isPrime) {
        primes.push(counter);
    }
    counter++
}

printOut(primes.join(", "));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
//Brukte array fordi jeg jobbet rundt "PrintOut()"
//Kunne nok gjort det uten array, men da måtte jeg ha jobbet med "PrintOut()", 
//og da var det enklere for meg å heller jobbe med den enn "mot den"

let letterK = "K";
let letterR = "R";
let rowArray = [];

for(let columns = 1; columns <= 7; columns++){
    for(let rows = 1; rows <= 9; rows++){
        rowArray.push(letterK + rows + letterR + columns);
    }
    printOut(rowArray.join(" "));
    rowArray.length = 0;
}

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
//Brukte array fordi det er det som gir mest mening for meg

let pointsInt;
let studentPoints = [];
let studentGrades = [];
let percentage;

for(let i = 1; i <= 5; i++){
    pointsInt = Math.floor((Math.random() * 236) + 1);
    studentPoints[i - 1] = pointsInt;
    percentage = Math.round((studentPoints[i - 1] / 236) * 100);

    if(percentage >= 89){
        studentGrades[i - 1] = "A";
    }
    else if(percentage >= 77 && percentage <= 88){
        studentGrades[i - 1] = "B";
    }
    else if(percentage >= 65 && percentage <= 76){
        studentGrades[i - 1] = "C";
    }
    else if(percentage >= 53 && percentage <= 64){
        studentGrades[i - 1] = "D";
    }
    else if(percentage >= 41 && percentage <= 52){
        studentGrades[i - 1] = "E";
    }
    else if(percentage <= 40){
        studentGrades[i - 1] = "F";
    }

    printOut("Student " + (i) + " got " + studentPoints[i - 1] + " points, which is " + percentage + "% and therefore " + studentGrades[i - 1]);
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
//På en måte litt knotete, men jeg tror at andre løsninger kan være mer knotete for meg
//Dette er det jeg forstår best og kan forklare til andre dersom noen trenger hjelp

let throws;
let throwAmounts; 
let diceThrows = [];
let index = 0;

//Tower
let tower = false;
throwAmounts = 0;

while(tower != true){

    for(let i = 0; i <= 5; i++){
        throws = Math.floor((Math.random() * 6) + 1);
        diceThrows[i] = throws;
    }
    diceThrows.sort();

    if(diceThrows[index] == diceThrows[index + 1] &&
       diceThrows[index + 1] != diceThrows[index + 2] &&
       diceThrows[index + 2] == diceThrows[index + 3] &&
       diceThrows[index + 3] == diceThrows[index + 4] &&
       diceThrows[index + 4] == diceThrows[index + 5])
       {
        tower = true;
        
       } else if(diceThrows[index] == diceThrows[index + 1] &&
        diceThrows[index + 1] == diceThrows[index + 2] &&
        diceThrows[index + 2] == diceThrows[index + 3] &&
        diceThrows[index + 3] != diceThrows[index + 4] &&
        diceThrows[index + 4] == diceThrows[index + 5])
        {
        tower = true;
       }
    throwAmounts++;
}

printOut(diceThrows.join(", "));
printOut("It took " + throwAmounts + " throws to get a tower");
printOut(newLine)

//3 pairs
diceThrows.length = 0;
let pairs = false;
throwAmounts = 0;

while(pairs != true){

    for(let i = 0; i <= 5; i++){
        throws = Math.floor((Math.random() * 6) + 1);
        diceThrows[i] = throws;
    }
    diceThrows.sort();

    if(diceThrows[index] == diceThrows[index + 1] &&
       diceThrows[index + 1] != diceThrows[index + 2] &&
       diceThrows[index + 2] == diceThrows[index + 3] &&
       diceThrows[index + 3] != diceThrows[index + 4] &&
       diceThrows[index + 4] == diceThrows[index + 5])
       {
        pairs = true;
       }
    throwAmounts++;
}

printOut(diceThrows.join(", "));
printOut("It took " + throwAmounts + " throws to get 3 pairs");
printOut(newLine)

//Full straight
diceThrows.length = 0;
let straight = false;
throwAmounts = 0;

while(straight != true){

    for(let i = 0; i <= 5; i++){
        throws = Math.floor((Math.random() * 6) + 1);
        diceThrows[i] = throws;
    }
    diceThrows.sort();

    if(diceThrows[index] != diceThrows[index + 1] &&
       diceThrows[index + 1] != diceThrows[index + 2] &&
       diceThrows[index + 2] != diceThrows[index + 3] &&
       diceThrows[index + 3] != diceThrows[index + 4] &&
       diceThrows[index + 4] != diceThrows[index + 5])
       {
        straight = true;
       }
    throwAmounts++;
}

printOut(diceThrows.join(", "));
printOut("It took " + throwAmounts + " throws to get a full straight");
printOut(newLine)

//Yatzy
diceThrows.length = 0;
let yahtzee = false;
throwAmounts = 0;

while(yahtzee != true){
    
    for(let i = 0; i <= 5; i++){
        throws = Math.floor((Math.random() * 6) + 1);
        diceThrows[i] = throws;
    }

    if(diceThrows[index] == diceThrows[index + 1] &&
       diceThrows[index] == diceThrows[index + 2] &&
       diceThrows[index] == diceThrows[index + 3] &&
       diceThrows[index] == diceThrows[index + 4] &&
       diceThrows[index] == diceThrows[index + 5])
       {
        yahtzee = true;
       }

    throwAmounts++;
}


printOut(diceThrows.join(", "));
printOut("It took " + throwAmounts + " throws to get a Yahtzee");
