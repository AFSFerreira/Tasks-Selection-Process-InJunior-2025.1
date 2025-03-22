let resultButtonPressed = false;

const maxNumberLenght = 10;

const syntaxErrorMessage = "syntax error";
const zeroDivisionErrorMessage = "zero div";
const numberTooSmallErrorMessage = "0";
const numberTooBigErrorMessage = "too big";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operandSymbols = ["+", "-", "×", "÷", "."];

const calculatorDisplay = document.querySelector('.calculator-display');

const calculatorButtons = document.querySelectorAll('.calc-btn');

function checkErrorMessage() {
    let calculatorDisplayContent = calculatorDisplay.textContent;

    calculatorDisplayContent = calculatorDisplayContent.replace("×", "*");
    calculatorDisplayContent = calculatorDisplayContent.replace("÷", "/");

    let lastChar = calculatorDisplayContent.at(-1);

    if (lastChar != "" && !numbers.includes(lastChar) && !operandSymbols.includes(lastChar)) calculatorDisplay.textContent = "0";

    console.log("finished");

    return;
}

function checkResultButtonPressed() {
    if (resultButtonPressed) calculatorDisplay.textContent = "";
    resultButtonPressed = false;

    return;
}

function checkValidExpression() {
    let currentCalculatorValue;

    try { currentCalculatorValue = eval(calculatorDisplay.textContent); }
    catch (error) {
        calculatorDisplay.textContent = syntaxErrorMessage;
        return false;
    }

    // Checking if its a valid number:
    if (isNaN(currentCalculatorValue)) {
        calculatorDisplay.textContent = syntaxErrorMessage;
        return false;
    }

    return true;
}

function addNumberEmptyDisplay(newNumber) {
    if (calculatorDisplay.textContent === "0") {
        calculatorDisplay.textContent = newNumber;
        return true;
    }

    return false;
}


// "AC" Button:
calculatorButtons[0].addEventListener('click', () => {
    calculatorDisplay.textContent = '0';
    return;
})

// "+/-" Button:
calculatorButtons[1].addEventListener('click', () => {
    checkErrorMessage();

    if (!checkValidExpression()) return;

    let currentCalculatorValue = eval(calculatorDisplay.textContent);

    calculatorDisplay.textContent = (-1) * currentCalculatorValue;

    return;
})

// "%" Button:
calculatorButtons[2].addEventListener('click', (event) => {
    checkErrorMessage();

    if (!checkValidExpression()) return;

    let currentCalculatorValue = eval(calculatorDisplay.textContent);

    let newResult = new String(currentCalculatorValue / 100);
    let floatPointIndex = newResult.indexOf('.');

    if (floatPointIndex === (-1)) {
        calculatorDisplay.textContent = newResult;
        return;
    }

    // trying to convert automatically the number to exponential notation:
    if (Number(newResult).toExponential().length <= maxNumberLenght) {
        calculatorDisplay.textContent = Number(newResult).toExponential();
        return;
    }

    // Extract the first five decimal digits from the number:
    let firstDecimalDigits = newResult.substring(floatPointIndex + 1).length < 5 ? 
                             newResult.substring(floatPointIndex + 1) : 
                             newResult.substring(floatPointIndex + 1, floatPointIndex + 6);
    
    console.error(`${newResult.substring(0, floatPointIndex)}.${firstDecimalDigits}`);

    let truncatedNumber = parseFloat(newResult.substring(0, floatPointIndex).concat('.').concat(firstDecimalDigits));
    truncatedNumber = new String(truncatedNumber);

    console.error(`${truncatedNumber}`);

    // Checks if the number is too big or small:
    if (newResult.includes('e')) {
        let orderOfMagnitude = Number(newResult.substring(newResult.indexOf('e') + 1));

        if (new String(Math.abs(orderOfMagnitude)).length >= 3) {
            calculatorDisplay.textContent = orderOfMagnitude >= 0 ? numberTooBigErrorMessage : numberTooSmallErrorMessage;
            return;
        }

        truncatedNumber = truncatedNumber.concat(newResult.substring(newResult.indexOf('e')));
    }

    resultButtonPressed = true;

    calculatorDisplay.textContent = truncatedNumber;

    return;
})

// "÷" Button:
calculatorButtons[3].addEventListener('click', () => {
    checkErrorMessage();
    resultButtonPressed = false;

    if (operandSymbols.includes(calculatorDisplay.textContent.at(-1))) calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("÷");

    return;
})

// "7" Button:
calculatorButtons[4].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(7)) return;
    
    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("7");

    return;
})

// "8" Button:
calculatorButtons[5].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(8)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("8");

    return;
})

// "9" Button:
calculatorButtons[6].addEventListener('click', () => {
    checkResultButtonPressed();
    
    if (addNumberEmptyDisplay(9)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("9");

    return;
})

// "X" Button:
calculatorButtons[7].addEventListener('click', () => {
    checkErrorMessage();
    resultButtonPressed = false;

    if (operandSymbols.includes(calculatorDisplay.textContent.at(-1))) calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("×");

    return;
})

// "4" Button:
calculatorButtons[8].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(4)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("4");

    return;
})

// "5" Button:
calculatorButtons[9].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(5)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("5");

    return;
})

// "6" Button:
calculatorButtons[10].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(6)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("6");

    return;
})

// "-" Button:
calculatorButtons[11].addEventListener('click', () => {
    checkErrorMessage();

    resultButtonPressed = false;

    if (operandSymbols.includes(calculatorDisplay.textContent.at(-1))) calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("-");

    return;
})

// "1" Button:
calculatorButtons[12].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(1)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("1");

    return;
})

// "2" Button:
calculatorButtons[13].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(2)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("2");

    return;
})

// "3" Button:
calculatorButtons[14].addEventListener('click', () => {
    checkResultButtonPressed();

    if (addNumberEmptyDisplay(3)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("3");

    return;
})

// "+" Button:
calculatorButtons[15].addEventListener('click', () => {
    checkErrorMessage();

    resultButtonPressed = false;

    if (operandSymbols.includes(calculatorDisplay.textContent.at(-1))) calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("+");

    return;
})

// "0" Button:
calculatorButtons[16].addEventListener('click', () => {
    if (addNumberEmptyDisplay(0)) return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat("0");

    return;
})

// "." Button:
calculatorButtons[17].addEventListener('click', () => {
    checkErrorMessage();

    let calculatorDisplayContent = calculatorDisplay.textContent;
    
    // changing all "×" symbols to "*" and "÷" to "/":
    calculatorDisplayContent = calculatorDisplayContent.replace("×", "*");
    calculatorDisplayContent = calculatorDisplayContent.replace("÷", "/");
    
    let lastNumber = calculatorDisplayContent.split(/[+\-*/]/).at(-1);

    if (lastNumber.includes('.') || lastNumber === "") return;

    calculatorDisplay.textContent = calculatorDisplay.textContent.concat(".");
    resultButtonPressed = false;

    return;
})

// "=" Button:
calculatorButtons[18].addEventListener('click', () => {
    if (resultButtonPressed) return;

    let calculatorDisplayContent = calculatorDisplay.textContent;

    resultButtonPressed = true;

    // changing all "×" symbols to "*" and "÷" to "/":
    calculatorDisplayContent = calculatorDisplayContent.replace("×", "*");
    calculatorDisplayContent = calculatorDisplayContent.replace("÷", "/");

    if (calculatorDisplayContent.includes("/0")) {
        calculatorDisplay.textContent = zeroDivisionErrorMessage;
        return;
    }

    let currentCalculatorValue;
    
    try { currentCalculatorValue = eval(calculatorDisplayContent); }
    catch (error) {
        calculatorDisplay.textContent = syntaxErrorMessage;
        return false;
    }

    // Checking if its a valid number:
    if (isNaN(currentCalculatorValue)) {
        calculatorDisplay.textContent = syntaxErrorMessage;
        return false;
    }

    let currentCalculatorValueString = String(currentCalculatorValue);

    if (currentCalculatorValueString.length > maxNumberLenght) {
        if (currentCalculatorValue.toExponential().length <= maxNumberLenght) {
            calculatorDisplay.textContent = currentCalculatorValue.toExponential();
            return;
        }

        // rounding decimal place to fit the number:
        for (let i = maxNumberLenght; i >= 1 && currentCalculatorValueString.length > maxNumberLenght; i--) {
            currentCalculatorValueString = String(parseFloat(Number(currentCalculatorValueString).toFixed(i)));
        }

        // number too big to fit in display:
        if (currentCalculatorValueString.length > maxNumberLenght) {
            calculatorDisplay.textContent = numberTooBigErrorMessage;
            return;
        }
    }

    calculatorDisplay.textContent = currentCalculatorValueString;

    return;
})