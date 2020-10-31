//DOM
const total = document.querySelector('#answer');
const clear = document.querySelector('#clear');
const intChange = document.querySelector('#intchange');
const percent = document.querySelector('#percentage');

const divideNum = document.querySelector('#divide');
const multiplyNum = document.querySelector('#multiply');
const minusNum = document.querySelector('#minus');
const addNum = document.querySelector('#add');
const numTotal = document.querySelector('#equal');
const operatorArray = [addNum, minusNum, multiplyNum, divideNum];

const decimal = document.querySelector('#decimal');
const number0 = document.querySelector('#zero');
const number1 = document.querySelector('#one');
const number2 = document.querySelector('#two');
const number3 = document.querySelector('#three');
const number4 = document.querySelector('#four');
const number5 = document.querySelector('#five');
const number6 = document.querySelector('#six');
const number7 = document.querySelector('#seven');
const number8 = document.querySelector('#eight');
const number9 = document.querySelector('#nine');
const numbersArray = [number0, number1, number2, number3,
                                number4, number5, number6, 
                                number7, number8, number9];

let valueSaved = null;
let operatorSaved = null;
let previousSaved = null;
let lastPressed = null;

const valueToString = function() {
    return total.textContent.split(',').join('');
};

const valueToNumber = function() {
    return parseFloat(valueToString());
};

const stringToValue = function (stringValue) {
    if (stringValue[stringValue.length - 1] === ".") {
        total.textContent += ".";
        return;
    }

    const [integerString, floatString] = stringValue.split(".");
    if (floatString) {
        total.textContent = parseFloat(integerString).toLocaleString() + "." + floatString;
    } else if (isNaN(stringValue)) {
        total.textContent = stringValue;
    } else {
        total.textContent = parseFloat(integerString).toLocaleString();
    }
};

// Do all the math!
const doTheMath = function() {
    const totalValueSaved = parseFloat(valueSaved);
    const curValNum = valueToNumber();
    let newTotal;
    if (operatorSaved === "add") {
        newTotal = totalValueSaved + curValNum;
    } else if (operatorSaved === "minus") {
        newTotal = totalValueSaved - curValNum;
    } else if (operatorSaved === "multiply") {
        newTotal = totalValueSaved * curValNum;
    } else if (operatorSaved === "divide") {
        if (curValNum === 0) {
            newTotal = "You Goofed";
        } else {
        newTotal = totalValueSaved / curValNum;
        }
    }

    return newTotal.toString();
};

const numberClick = function(numberString) {
    const curValStr = valueToString();
    if (valueSaved === "0") {
        stringToValue(numberString);
    } else {
        stringToValue(curValStr + numberString);
    }
};

const operatorClick = function(opChange) {
    const curValStrOp = valueToString();
    previousSaved = lastPressed;
    if (!valueSaved) {
        valueSaved = curValStrOp;
        operatorSaved = opChange;
        total.textContent = previousSaved;
        return;
    }
    valueSaved = doTheMath();
    operatorSaved = opChange;
    total.textContent = previousSaved;
};

// C - Clear on click. Revert to 0
clear.addEventListener('click', () => {
    stringToValue("0");
    valueSaved = null;
    operatorSaved = null;
});

// Toggle positive/negative on display
intChange.addEventListener('click', () => {
    const curValNum = valueToNumber();
    const curValStr = valueToString();

    if (curValStr === '-0') {
        stringToValue('0');
        return;
    }
    if (curValStr === '0') {
        return;
    }
    if (curValNum >= 0) {
        stringToValue("-" + curValStr);
    } else {
        stringToValue(curValStr.substring(1));
    }
});

// Get percentage of # in display
percent.addEventListener('click', () => {
    const curValNum = valueToNumber();
    const newValNum = curValNum / 100;
    stringToValue(newValNum.toString());
    operatorSaved = null;
    valueSaved = null;
});

// Add, subtract, multiply, divide
addNum.addEventListener('click', () => {
        operatorClick('add');
  });

minusNum.addEventListener('click', () => {
    operatorClick('minus');
});

multiplyNum.addEventListener('click', () => {
    operatorClick('multiply');
});

divideNum.addEventListener('click', () => {
    operatorClick('divide');
});

// Equals
numTotal.addEventListener('click', () => {
    if (valueSaved) {
        stringToValue(doTheMath());
        valueSaved = null;
        operatorSaved = null;
    }
});

// Numbers
for (let i = 0; i < numbersArray.length; i++) {
    const numberFor = numbersArray[i];
    numberFor.addEventListener('click', () => {
        numberClick(i.toString());
    });
}

// Decimal
decimal.addEventListener('click', () => {
    const curValStr = valueToString();
    if (!curValStr.includes('.')) {
        stringToValue(curValStr + ".");
    }
});