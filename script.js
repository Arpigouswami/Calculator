const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let opratorValue = '';
 let awaitingNextValue = false;

function sendNumberValue(number){
// Replace current display value if first value is  enterd
if(awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
}else{
    // if current display value is 0, replace it , if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
}
function addDecimal(){
    // if operator pressed dont add it
    if(awaitingNextValue) return;
    // if no decimal add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


// Calculate first and second value 
const calculate = {
 '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

 '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

 '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

 '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

 '=': (firstNumber, secondNumber) =>  secondNumber,
};
function useOprator(oprator){
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple oprator
    if(opratorValue && awaitingNextValue) {
        opratorValue = oprator;
        return;
    }
    // Assign first Value if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
    
        const calculation = calculate[opratorValue](firstValue, currentValue);
       calculatorDisplay.textContent= calculation;
        firstValue=calculation;
    }

    // Ready for next store value
    awaitingNextValue = true;
    opratorValue = oprator;
    
}

// Add Event listener for Numbers, operartors and decimal
inputBtns.forEach((inputBtn) => {
 if(inputBtn.classList.length === 0){
     inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
 }else if(inputBtn.classList.contains('oprator')){
    inputBtn.addEventListener('click', () => useOprator(inputBtn.value));
}else if(inputBtn.classList.contains('decimal')){  
    inputBtn.addEventListener('click', () => addDecimal());
 }
});
// reset all values Display
function resetAll(){
     firstValue = 0;
     opratorValue = '';
      awaitingNextValue = false;
      calculatorDisplay.textContent = '0';

}
// Event Listener
clearBtn.addEventListener('click', resetAll);