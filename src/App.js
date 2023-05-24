import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
const [display, setDisplay] = useState('0');
const [storedValue, setStoredValue] = useState(null);
const [operator, setOperator] = useState(null);


const handleDisplayUpdate = (event) => {
  const clickedValue = event.target.value;
  if (clickedValue === '.') {
    if (!display.includes('.')) {
      setDisplay(prevDisplay => prevDisplay + clickedValue);
    }
  } else {
    setDisplay(prevDisplay => {
      if (prevDisplay === '0') {
        return clickedValue;
      } else {
        return prevDisplay + clickedValue;
      }
    });
  }
};

const handleClear = () => {
  setDisplay('0');
  setStoredValue(null);
  setOperator(null);
};

const handleOperator = (event) => {
  const clickedOperator = event.target.value;
  if (clickedOperator === '-' && display === '0') {
    setDisplay('-');
  } else if (operator && storedValue) {
    if (isOperator(operator) && isOperator(clickedOperator)) {
      // handle consecutive operators
      if (clickedOperator === '-') {
        setDisplay('-');
      } else {
        setOperator(clickedOperator);
      }
    } else {
      let expression = storedValue + operator + display;
      if (storedValue === '-' && isOperator(clickedOperator)) {
        expression = storedValue + clickedOperator;
        setStoredValue(expression);
      } else {
        // handle consecutive operators
        if (isOperator(display) && isOperator(clickedOperator)) {
          setOperator(clickedOperator);
        } else {
          const result = eval(expression);
          setStoredValue(result);
          if (clickedOperator === '=') {
            let formattedResult = result % 1 !== 0 ? result.toFixed(4) : result.toFixed(0);
            formattedResult = parseFloat(formattedResult).toString(); // convert to string to remove trailing zeros
            setDisplay(formattedResult);
            setOperator(null);
            setStoredValue(null);
          } else {
            setOperator(clickedOperator);
            setDisplay('0');
          }
        }
      }
    }
  } else {
    setStoredValue(display);
    setOperator(clickedOperator);
    setDisplay('0');
  }
};
// 5 * - + 5
const isOperator = (value) => {
  return value === '+' || value === '-' || value === '*' || value === '/';
};
const handleEquals = () => {
  if (operator && storedValue) {
    const expression = storedValue + operator + display;
    const result = eval(expression);
    console.log(result);
    let formattedResult = result % 1 !== 0 ? result.toFixed(4) : result.toFixed(0);
    formattedResult = parseFloat(formattedResult).toString(); // convert to string to remove trailing zeros
    setDisplay(formattedResult);
    setStoredValue(null);
    setOperator(null);
  }
};


  return (
<div id="calculator">
  <div>
    <h1>Javascript Calculator</h1>
  </div>
  <div id="display">{!display ? '0' : display}</div>
  <div id="button-container">
    <button id='seven' value={'7'} onClick={handleDisplayUpdate}>7</button>
    <button id='eight' value={'8'} onClick={handleDisplayUpdate}>8</button>
    <button id='nine' value={'9'} onClick={handleDisplayUpdate}>9</button>
    <button id='divide' value={'/'} onClick={handleOperator}>/</button>
    <button id='four' value={'4'} onClick={handleDisplayUpdate}>4</button>
    <button id='five' value={'5'} onClick={handleDisplayUpdate}>5</button>
    <button id='six' value={'6'} onClick={handleDisplayUpdate}>6</button>
    <button id='multiply' value={'*'} onClick={handleOperator}>*</button>
    <button id='one' value={'1'} onClick={handleDisplayUpdate}>1</button>
    <button id='two' value={'2'} onClick={handleDisplayUpdate}>2</button>
    <button id='three' value={'3'} onClick={handleDisplayUpdate}>3</button>
    <button id='subtract' value={'-'} onClick={handleOperator}>-</button>
    <button id='zero' value={'0'} onClick={handleDisplayUpdate}>0</button>
    <button id='decimal' value={'.'} onClick={handleDisplayUpdate}>.</button>
    <button id='equals' value={'='} onClick={handleEquals}>=</button>
    <button id='add' value={'+'} onClick={handleOperator}>+</button>
    <button id='clear' value={'C'} onClick={handleClear}>C</button>
  </div>
</div>
  )
}
export default Calculator;
