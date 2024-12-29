"use strict";

const carTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const girlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const movieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const buttonCalculate = document.getElementById("cmbTask1Calculate");
buttonCalculate.addEventListener("click", calculate);

function calculate(){
  const txtRectHeight = document.getElementById("txtRectHeight");
  const txtRectWidth = document.getElementById("txtRectWidth");
  const outputTask1 = document.getElementById("txtTask1Output");
  let height = Number(txtRectHeight.value);
  let width = Number(txtRectWidth.value);

  let perimeter = (height * 2 + width * 2);
  let area = (height * width);
  outputTask1.innerHTML = "Perimeter: " + perimeter + "&nbsp; Area: " + area;
}

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const inputTask2 = document.getElementById("txtTask2Word");
inputTask2.addEventListener("keypress", wordKeyPress);
const outputTask2 = document.getElementById("txtTask2Output");

let wordsArray = [];

function wordKeyPress(aEvent){
  const key = aEvent.key;
  switch(key){
    case "Enter":
      let words = inputTask2.value.split(" ");
      inputTask2.value = "";
      wordsArray = wordsArray.concat(words);
      outputTask2.innerHTML = "Number of words: " + wordsArray.length + "<br>" + wordsArray.join(" ");
      break;
  }
}

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const buttonCheckAnswer = document.getElementById("cmbTask3CheckAnswer");
buttonCheckAnswer.addEventListener("click", checkAnswerClick);
const outputTask3 = document.getElementById("txtTask3Output");

let text = "";

function checkAnswerClick(){
  const checkTask3 = document.getElementsByName("chkTask3");
  
  for(let i = 0; i < checkTask3.length; i++){
    let checkBox = checkTask3[i];

    if(checkBox.checked){
      let value = checkBox.value;

      if(value === "4"){
        text += "You have chosen number " + value + ". ... Uhhhhhhhh, dunno how much I agree with you, but to each their own I suppose <br />"
  
      }else{
        text += "You have chosen number " + value + ".<br />"
      }

    }

  }
  outputTask3.innerHTML = text;
  text = "";
}


//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const divContainer = document.getElementById("divTask4Cars");

for(let i = 0; i < carTypes.length; i++){
  let car = carTypes[i];

  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.id = car.value;
  radioButton.name = "cars";
  radioButton.value = car.value;

  const label = document.createElement("label");
  label.htmlFor = car.id;
  label.textContent = car.caption;

  divContainer.appendChild(radioButton);
  divContainer.appendChild(label);
  divContainer.appendChild(document.createElement("br"));

}


//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const dropdown = document.getElementById("selectTask5Animals");
dropdown.addEventListener("change", changeDropdown);

function changeDropdown(){
  let selectedValue = dropdown.value;

  const outputTask4 = document.getElementById("selectTask5Animals");
  outputTask4.innerHTML = "You selected: " + selectedValue;

}

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const selectName = document.getElementById("selectTask6Girls");
let optionName;

for(let i = 0; i < girlsNames.length; i++){
  let name = girlsNames[i];
  
  optionName = document.createElement("option");
  optionName.textContent = name;
  optionName.value = name;

  selectName.appendChild(optionName);

}

const outputName = document.getElementById("txtTask6Output");
outputName.addEventListener("change", printName)

function printName(){
  console.log("You selected: " + optionName.value)
  outputName = "You selected: " + optionName.value; 
}


//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectMovieGenre = document.getElementById("selectMovieGenre");
let optionGenre;

for(let i = 0; i < movieGenre.length; i++){
  let genre = movieGenre[i];
  
  optionGenre = document.createElement("option");
  optionGenre.textContent = genre;
  optionGenre.value = genre;

  selectMovieGenre.appendChild(optionGenre);

}