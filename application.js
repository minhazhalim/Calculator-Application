const calculator = document.querySelector('.calculator');
const calculatorDisplay = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
keys.addEventListener('click',event => {
     if(!event.target.closest('button')) return;
     const key = event.target;
     const keyValue = key.textContent;
     const displayValue = calculatorDisplay.textContent;
     const {type} = key.dataset;
     const {previousKeyType} = calculator.dataset;
     if(type === 'number'){
          if(displayValue === '0' || previousKeyType === 'operator'){
               calculatorDisplay.textContent = keyValue;
          }else{
               calculatorDisplay.textContent = displayValue + keyValue;
          }
     }
     if(type === 'operator'){
          operatorKeys.forEach(element => {
               element.dataset.state = '';
          });
          key.dataset.state = 'selected';
          calculator.dataset.firstNumber = displayValue;
          calculator.dataset.operator = key.dataset.key;
     }
     if(type === 'equal'){
          const firstNumber = calculator.dataset.firstNumber;
          const operator = calculator.dataset.operator;
          const secondNumber = displayValue;
          calculatorDisplay.textContent = calculate(firstNumber,operator,secondNumber);
     }
     if(type === 'clear'){
          calculatorDisplay.textContent = '0';
          delete calculator.dataset.firstNumber;
          delete calculator.dataset.operator;
     }
     calculator.dataset.previousKeyType = type;
});
function calculate(firstNumber,operator,secondNumber){
     firstNumber = parseInt(firstNumber);
     secondNumber = parseInt(secondNumber);
     if(operator === 'plus'){
          return firstNumber + secondNumber;
     }
     if(operator === 'minus'){
          return firstNumber - secondNumber;
     }
     if(operator === 'multiply'){
          return firstNumber * secondNumber;
     }
     if(operator === 'divide'){
          return firstNumber / secondNumber;
     }
}