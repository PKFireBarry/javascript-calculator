import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("0");
  const [decimal, setDecimal] = useState(false);
  const [operator, setOperator] = useState("");

  const handleNumberClick = (num) => {
    if (num === "0" && input === "") {
      // Do not allow multiple zeros at beginning
      return;
    }
    setInput(input + num);
    setOutput(parseFloat(input + num).toString());
  };

  const handleDecimalClick = () => {
    if (!decimal && input !== "") {
      setInput(input + ".");
      setOutput(parseFloat(input + ".").toString());
      setDecimal(true);
    }
  };

  const handleOperatorClick = (op) => {
    if (operator !== "") {
      // If two operators are entered consecutively, perform last operation
      handleEqualsClick();
    }
    setOperator(op);
    setInput("");
    setDecimal(false);
  };

  const handleEqualsClick = () => {
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(output) + parseFloat(input);
        break;
      case "-":
        result = parseFloat(output) - parseFloat(input);
        break;
      case "*":
        result = parseFloat(output) * parseFloat(input);
        break;
      case "/":
        result = parseFloat(output) / parseFloat(input);
        break;
      default:
        return;
    }
    setInput("");
    setDecimal(false);
    setOutput(result.toString());
  };

  const handleClearClick = () => {
    setInput("");
    setOutput("0");
    setDecimal(false);
    setOperator("");
  };

  return (
    <div id="calculator">
      <div id="display">{output}</div>
      <button id="clear" onClick={handleClearClick}>
        AC
      </button>
      <button id="divide" onClick={() => handleOperatorClick("/")}>
        /
      </button>
      <button id="multiply" onClick={() => handleOperatorClick("*")}>
        *
      </button>
      <button id="seven" onClick={() => handleNumberClick("7")}>
        7
      </button>
      <button id="eight" onClick={() => handleNumberClick("8")}>
        8
      </button>
      <button id="nine" onClick={() => handleNumberClick("9")}>
        9
      </button>
      <button id="subtract" onClick={() => handleOperatorClick("-")}>
        -
      </button>
      <button id="four" onClick={() => handleNumberClick("4")}>
        4
      </button>
      <button id="five" onClick={() => handleNumberClick("5")}>
        5
      </button>
      <button id="six" onClick={() => handleNumberClick("6")}>
        6
      </button>
      <button id="add" onClick={() => handleOperatorClick("+")}>
        +
      </button>
      <button id="one" onClick={() => handleNumberClick("1")}>
        1
      </button>
      <button id="two" onClick={() => handleNumberClick("2")}>
        2
      </button>
      <button id="three" onClick={() => handleNumberClick("3")}>
        3
      </button>
      <button id="equals" onClick={handleEqualsClick}>
        =
      </button>
      <button id="zero" onClick={() => handleNumberClick("0")}>
        0
      </button>
      <button id="decimal" onClick={handleDecimalClick}>
        .
      </button>
    </div>
  );
};

export default Calculator;
