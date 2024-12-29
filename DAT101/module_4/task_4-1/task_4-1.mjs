"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const accountType = {
    normal: "Brukskonto",
    saving: "Sparekonto",
    credit: "Kreditkonto",
    pension: "Pensionskonto"
};

const currencyTypes = {
    NOK: {value: 1.0000, name: "Norske kroner",        denomination: "kr"},
    EUR: {value: 0.0985, name: "Europeiske euro",      denomination: "€"},
    USD: {value: 0.1091, name: "Amerikanske dollar",   denomination: "$"},
    GBP: {value: 0.0847, name: "Pound sterling",       denomination: "£"},
    INR: {value: 7.8309, name: "Indiske rupee",        denomination: "₹"},
    AUD: {value: 0.1581, name: "Australienske dollar", denomination: "A$"},
    PHP: {value: 6.5189, name: "Filippinske peso",     denomination: "₱"},
    SEK: {value: 1.0580, name: "Svenske kroner",       denomination: "kr"},
    CAD: {value: 0.1435, name: "Canadiske dollar",     denomination: "C$"},
    THB: {value: 3.3289, name: "Thai baht",            denomination: "฿"}
};

class TAccount {
    #type;
    #balance;
    #withdrawCount;
    #currencyType;

    constructor(aType){
        this.#type = aType;
        this.#balance = 0;
        this.#withdrawCount = 0;
        this.#currencyType = currencyTypes.NOK;
    }

    getType(){
        if(typeof this.#type == "undefined"){
            console.log("You have not defined what type of account you want");
        } else {
            console.log("Your account is a " + this.#type + " account");
        }
        return this.#type;
        
    }

    getBalance(){
        return this.#balance;
    }


    setType(aType){
        if(typeof this.#type == "undefined"){
            this.#type = aType;
        } else {
            console.log("Your account will be changed from a " + this.#type + " account to a " + aType + " account")
            this.#type = aType;
            this.#withdrawCount = 0;
        }
        
    }

    setCurrencyType(aNewCurrencyType){
        if(this.#currencyType == aNewCurrencyType){
            return;
        } else {
        this.#balance = this.#balance * this.#currencyConverter(aNewCurrencyType);
        console.log("Changed currency type from " + this.#currencyType.name + " to " + aNewCurrencyType.name);
        this.#currencyType = aNewCurrencyType;
        printOut("You have changed your currency type. New Balance is " + this.#balance.toFixed(2) + aNewCurrencyType.denomination);
        }
        
    }
    
    deposit(aAmount, aType = currencyTypes.NOK){
        const newAmount = aAmount / this.#currencyConverter(aType);
        this.#balance += newAmount;
        this.#withdrawCount = 0;
        printOut("Deposit of " + aAmount + this.#currencyType.denomination + ". New balance is " + this.getBalance().toFixed(2) + this.#currencyType.denomination);
    }

    withdraw(aAmount, aCurrencyType){
        switch(this.getType()){
            case "Pension":
                printOut("You cannot withdraw from a " + this.getType() + " account")
                break;
            case "Saving":
                if(this.#withdrawCount >= 3){
                    printOut("You cannot withdraw more than three times from a " + this.getType() + "account");
                    
                } else {
                    this.#balance -= aAmount;
                    printOut("Withdrawal of " + aAmount.toFixed(2) + aCurrencyType.denomination + ". New balance is " + this.getBalance().toFixed(2) + this.#currencyType.denomination + 
                    ". You can withdraw " + (2 - this.#withdrawCount) + " more times");
                    this.#withdrawCount++;
                }
                break;
            case "Normal":
                this.#balance -= aAmount;
                printOut("Withdrawal of " + aAmount + aCurrencyType.denomination + ". New balance is " + this.getBalance() + this.#currencyType.denomination);
                break;
            case "undefined":
                printOut("You need to define what type of account you want to have");
                break;
        }
    
    }

    #currencyConverter(aType){
        return currencyTypes.NOK.value / this.#currencyType.value * aType.value;
    }

};


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
printOut(accountType.normal + ", " + accountType.saving + ", " + accountType.credit + ", " + accountType.pension);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
const myAccount = new TAccount();
myAccount.setType("Normal");

printOut("myAccount = " + myAccount.getType());
myAccount.setType("Saving");
printOut("myAccount = " + myAccount.getType());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
myAccount.deposit(100, currencyTypes.NOK);
myAccount.withdraw(10, currencyTypes.NOK);

printOut("My account balance is " + myAccount.getBalance());

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
//Making a new one cause then I can start "fresh" with the balance

const taskFourAccount = new TAccount();
taskFourAccount.setType("Saving");
printOut(taskFourAccount.getType());
taskFourAccount.deposit(100);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
myAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
myAccount.setCurrencyType(currencyTypes.SEK);
myAccount.setCurrencyType(currencyTypes.USD);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(12, currencyTypes.USD);
myAccount.withdraw(15, currencyTypes.EUR);
myAccount.setCurrencyType(currencyTypes.PHP);

printOut(newLine);
