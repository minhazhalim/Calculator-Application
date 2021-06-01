const initApplication = () => {
     const currentValueElement = document.querySelector('.currentvalue');
     const previousValueElement = document.querySelector('.previousvalue');
     let itemArray = [];
     let equationArray = [];
     let newNumberFlag = false;
     const inputButtons = document.querySelectorAll('.number');
     inputButtons.forEach(button => {
          button.addEventListener('click',(event) => {
               const newInput = event.target.textContent;
               if(newNumberFlag){
                    currentValueElement.value = newInput === '.' ? "0." : newInput;
                    newNumberFlag = false;
               }else if(currentValueElement.value.includes('.') && newInput === '.'){
                    return;
               }else{
                    currentValueElement.value = currentValueElement.value == 0 && currentValueElement.value.length == 1 && newInput !== '.' ? newInput : `${currentValueElement.value}${newInput}`;
               }
          });
     });
     const operatorButtons = document.querySelectorAll('.operator');
     operatorButtons.forEach(button => {
          button.addEventListener('click',(event) => {
               if(newNumberFlag){
                    previousValueElement.textContent = "";
                    itemArray = [];
               }
               const newOperator = event.target.textContent;
               let currentValue = parseFloat(currentValueElement.value);
               if(isNaN(currentValue)) currentValue = 0;
               if(!itemArray.length){
                    itemArray.push(currentValue,newOperator);
                    previousValueElement.textContent = `${currentValue}${newOperator}`;
                    return newNumberFlag = true;
               }
               if(itemArray.length){
                    itemArray.push(currentValue);
                    const equationObject = {
                         number1: parseFloat(itemArray[0]),
                         number2: parseFloat(currentValue),
                         operator: itemArray[1],
                    };
                    equationArray.push(equationObject);
                    const equationString = `${equationObject['number1']}${equationObject['operator']}${equationObject['number2']}`;
                    if(dividedByZero(equationString)){
                         equationArray.pop();
                         currentValueElement.value = "/0=🤯💩";
                         itemArray = [0,newOperator];
                    }else{
                         const newValue = calculate(equationString);
                         previousValueElement.textContent = `${newValue}${newOperator}`;
                         itemArray = [newValue,newOperator];
                    }
                    newNumberFlag = true;
               }
          });
     });
     const equalsButton = document.querySelector('.equals');
     equalsButton.addEventListener('click',() => {
          const currentValue = currentValueElement.value;
          let equationObject;
          if(!itemArray.length && equationArray.length){
               const lastEquation = equationArray[equationArray.length - 1];
               equationObject = {
                    number1: parseFloat(currentValue),
                    number2: lastEquation.number2,
                    operator: lastEquation.operator,
               };
          }else if(!itemArray.length){
               return currentValue;
          }else{
               itemArray.push(currentValue);
               equationObject = {
                    number1: parseFloat(itemArray[0]),
                    number2: parseFloat(currentValue),
                    operator: itemArray[1],
               };
          }
          equationArray.push(equationObject);
          const equationString = `${equationObject['number1']} ${equationObject['operator']} ${equationObject['number2']}`;
          previousValueElement.textContent = `${equationString} =`;
          if(dividedByZero(equationString)){
               equationArray.pop();
               currentValueElement.value = "/0=🤯💩";
          }else{
               currentValueElement.value = calculate(equationString);
          }
          newNumberFlag = true;
          itemArray = [];
     });
     const clearButtons = document.querySelectorAll('.clearEntry,.clear');
     clearButtons.forEach(button => {
          button.addEventListener('click',(event) => {
               currentValueElement.value = 0;
               previousValueElement.textContent = '';
               if(event.target.classList.contains('clear')){
                    itemArray = [];
                    equationArray = [];
               }
          });
     });
     const deleteButton = document.querySelector('.delete');
     deleteButton.addEventListener('click',() => {
          currentValueElement.value = currentValueElement.value.slice(0,-1);
          if(!currentValueElement.value.length){
               currentValueElement.value = 0;
          }
     });
     const signChangeButton = document.querySelector('.signChange');
     signChangeButton.addEventListener('click',() => {
          currentValueElement.value = parseFloat(currentValueElement.value) * -1;
     });
}
document.addEventListener('DOMContentLoaded',initApplication);
const dividedByZero = (equation) => {
     return /(\/ 0$)/.test(equation);
}
const calculate = (equation,currentValueElement) => {
     return eval(equation);
}