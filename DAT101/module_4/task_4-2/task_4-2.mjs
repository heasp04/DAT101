"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const hardArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let text = "";
for(let i = 0; i < hardArray.length; i++){
    text += hardArray[i] + ", ";
}

printOut(text);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(hardArray.join(", "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const sentence = "Hei på deg, hvordan har du det?";
const words = sentence.split(" ");

words.every(everyWord);
function everyWord(aWord, aIndex){
    printOut(aIndex + " " + (aIndex + 1) + " " + aWord);
    return true;
}
printOut("");

words.forEach(eachWord);
function eachWord(aWord, aIndex){
    printOut(aIndex + " " + (aIndex + 1) + " " + aWord);
}

printOut("");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let femaleNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
                   "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", 
                   "Maria", "Elisabeth", "Kristin"];

function removeElement(aArray, aName){
    const result = aArray.indexOf(aName);
    if(result > -1){
        printOut("You can remove " + aName + " from the array");
        aArray.splice(result, 1);
    } else {
        printOut("You cannot remove " + aName + " from the array");
    }
}

function findAndRemove(aArray, aName){
    let index = -1;
    const result = aArray.find(findName);
    if(result){
        printOut("You have removed " + aName + " from the array");
        aArray.splice(index, 1);
    } else {
        printOut("You cannot remove" + aName + "from the array");
    }

    function findName(aNewName, aIndex){
        index = aIndex;
        return aNewName === aName;
    }

}

removeElement(femaleNames, "Arne");
findAndRemove(femaleNames, "Ingrid");
printOut(femaleNames.join(", "));

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let maleNames = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah",
                 "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", 
                 "Liam", "Håkon", "Theodor", "Magnus"];

let allNames = femaleNames.concat(maleNames);
printOut(allNames.join(", "));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TBook {
    #title;
    #author;
    #ISBN;

    constructor(aTitle, aAuthor, aISBN){
        this.#title = aTitle;
        this.#author = aAuthor;
        this.#ISBN = aISBN;
    }

    toString(){
        return this.#title + ", " + this.#author + ", " + this.#ISBN;
    }
}

const books = [
    new TBook("The Hobbit", "J.R.R. Tolkien", "978-0-395-07122-1"),
    new TBook("The Shining", "Stephen King", "978-0-385-12167-5"),
    new TBook("The Da Vinci Code", "Dan Brown", "978-0-385-50420-5")
]

books.forEach(printBook);
function printBook(aBook){
    printOut(aBook.toString());
}

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const EWeekDays = {
    WeekDay1: {value: 0x01, name: "Mandag"},
    WeekDay2: {value: 0x02, name: "Tirsdag"},
    WeekDay3: {value: 0x04, name: "Onsdag"},
    WeekDay4: {value: 0x08, name: "Torsdag"},
    WeekDay5: {value: 0x10, name: "Fredag"},
    WeekDay6: {value: 0x20, name: "Lørdag"},
    WeekDay7: {value: 0x40, name: "Søndag"},
    Workdays: {value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager"},
    Weekends: {value: 0x20 + 0x40, name: "Helg"}        
};

const keys = Object.keys(EWeekDays);

for(let index = 0; index < keys.length; index++){
    let text = "";
    const key = keys[index];
    text = key + ": ";
    
    const keyObject = EWeekDays[key];
    const keyObjectKeys = Object.keys(keyObject);
    
    for(let i = 0; i < keyObjectKeys.length; i++){
      const keyObjectKey = keyObjectKeys[i];
      const keyObjectValue = keyObject[keyObjectKey];
      text += " " + keyObjectKey + ": " + keyObjectValue;
    }
    printOut(text);
  }
  printOut(newLine);

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let randomArray = [];

for(let i = 0; i < 35; i++){
    randomArray.push(Math.ceil(Math.random() * 20));
}
printOut("Random values: " + randomArray.join(", "));

function sortRandomValues(aValue1, aValue2){
    return aValue1 - aValue2;
}

randomArray.sort(sortRandomValues);
printOut("Stigende rekkefølge: " + randomArray.join(", "));
randomArray.reverse();
printOut("Synkende rekkefølge: " + randomArray.join(", "));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const freq = {};
for(let i = 0; i < randomArray.length; i++){
    const value = randomArray[i];

    if(freq[value]){
        freq[value]++;
    } else {
        freq[value] = 1;
    }
}

let freqKeys = Object.keys(freq);
freqKeys.sort(sortFreq);

function sortFreq(aValue1, aValue2){
    const freq1 = freq[aValue1];
    const freq2 = freq[aValue2];
    return freq2 - freq1;
}

text = "";
for(let i = 0; i < freqKeys.length; i++){
    const freqKey = freqKeys[i];
    const freqValue = freq[freqKey];
    text += freqKey + ": " + freqValue + ", ";
}

printOut(text);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let nestedArray = [];

for(let columns = 1; columns <= 9; columns++){
    for(let rows = 1; rows <= 5; rows++){
        nestedArray.push("Row" + rows + " Column" + columns);
    }
    printOut(nestedArray.join(", "));
    nestedArray.length = 0;
}
printOut(newLine);
