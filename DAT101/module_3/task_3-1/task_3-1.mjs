"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Task 1, 2 and 3");
printOut(newLine);
printOut("My expression statement is 'wakeUpTime == 7'");

let wakeUpTime = 8;

if (wakeUpTime == 7) {
  printOut("I can take the bus to school.");
} else if (wakeUpTime == 8) {
  printOut("I can take the train to school");
} else{
  printOut("I need to tace the car to school");
}
printOut(newLine);

printOut("--- Part 4, 5 -------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let integer = -1;
let answer = "";

if(integer > 0){
  answer = "Positive";
} else if (integer == 0){
  answer = "Zero";
} else {
  answer = "Negative";
}

printOut(answer);
printOut(newLine);

printOut("--- Part 6, 7 -------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let randomInt = Math.floor(Math.random() * 9);

printOut("Your file is " + randomInt + "MP")
if(randomInt >= 4 && randomInt < 6){
  answer = "Thank you";

} else if (randomInt >= 6){
  answer = "Your file is too big";

} else {
  answer = "Your image is too small";
}

printOut(answer);
printOut(newLine);


printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const monthList =["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];
printOut("Month: " + monthName);

if(monthName.includes("r")){
  answer = "You need to take more vitamin D";
} else {
  answer = "You do not need to take more vitamin D";
}
printOut(answer);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Current month: " + monthName);

if(monthName == "January" || 
   monthName == "March" || 
   monthName == "May" || 
   monthName == "July" || 
   monthName == "August" || 
   monthName == "October" ||
   monthName == "December"){

  answer = "The month contains 31 days";

} else if(monthName == "April" || 
          monthName == "June" || 
          monthName == "September" || 
          monthName == "November"){

  answer = "The month contains 30 days";

} else if (monthName == "February"){
  answer = "The month contains 28 days";
}

printOut(answer);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");

printOut("Current month: " + monthName);
if(monthName == "March" || monthName == "May"){
  answer = "The gallery is closed";
  
} else if (monthName == "April"){
  answer = "We have temporary premises in the building next door";

} else {
  answer = "The gallery is open";

}

printOut(answer);
printOut(newLine);
