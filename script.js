const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const output = document.querySelector('.output');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]'); 


allClearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
equalsButton.addEventListener('click', compute); 

let prev = '';
let current = '';
let reset = false; 

function clear() {
  currentOperand.innerText = 0; 
  previousOperand.innerText = '';
}

function del() {
  if(currentOperand.innerText == '') {
    currentOperand.innerText = previousOperand.innerText;
    previousOperand.innerText = '';
  } 
  if(currentOperand.innerText !== ''){
    currentOperand.innerText = String(currentOperand.innerText).slice(0,-1);
  } 
}

function appendNumber() {
  if((String(currentOperand.innerText)).length >= 9) {
    return;
  }
  if(currentOperand.innerText == 0 && String(this.innerText) == '.') {
    currentOperand.innerText += String(this.innerText); 
  } else if (String(currentOperand.innerText).includes('.') && String(this.innerText) == '.') {
    return;
  } else {
    if(reset) {
      currentOperand.innerText = String(this.innerText); 
      reset = false;
    } else if(String(currentOperand.innerText) == '0') {
      currentOperand.innerText = String(this.innerText);
    } else {
      currentOperand.innerText += String(this.innerText); 
    }
  }
}
for(i = 0; i < numberButtons.length; i++) {
  numberButtons[i].onclick = appendNumber;
}

function chooseOperation() {
  if(currentOperand.innerText == 0) {
    return;
  } else if (previousOperand.innerText !== '') {
    compute();
  }
  currentOperand.innerText += String(this.innerText);
  operator = this.innerText;
  previousOperand.innerText = currentOperand.innerText;
  currentOperand.innerText = '';
}
for(i = 0; i < operationButtons.length; i++) {
  operationButtons[i].onclick = chooseOperation;
}


function compute() {
  prev = parseFloat(previousOperand.innerText);
  current = parseFloat(currentOperand.innerText);
  if(isNaN(prev) || isNaN(current)) {
    return;
  }
  switch(operator) {
    case '+':
      currentOperand.innerText = (prev + current); 
      break;
    case '-':
      currentOperand.innerText = (prev - current);
      break; 
    case '÷':
      currentOperand.innerText = (prev / current).toFixed(1); 
      break;
    case 'x':
      currentOperand.innerText = (prev * current); 
      break;
      default:
        return;
  }
  
  previousOperand.innerText = '';
  reset = true;
}
