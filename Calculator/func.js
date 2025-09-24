let display = document.getElementById('display');
let currentInput = '';
let expression = '';

function updateDisplay() {
    display.textContent = expression || '0';
}

function inputNumber(num) {
    if (expression.length > 0 && expression.slice(-1) === ')') {
        return; // Don't append numbers after a closing parenthesis
    }
    expression += num;
    updateDisplay();
}

function inputDecimal() {
    // Check if the last part of the expression is a number and doesn't already have a decimal
    const lastPart = expression.split(/[-+*/]/).pop();
    if (!lastPart.includes('.')) {
        if (expression === '' || expression.slice(-1).match(/[-+*/]/)) {
            expression += '0.';
        } else {
            expression += '.';
        }
        updateDisplay();
    }
}

function inputOperator(op) {
    // Prevent multiple operators in a row (e.g., 1++2)
    const lastChar = expression.slice(-1);
    if (lastChar.match(/[-+*/]/)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function calculate() {
    try {
        if (expression === '') {
            return;
        }
        // Use a safe evaluation function to calculate the expression
        // eval() is generally unsafe, but for a simple calculator, it can be used with caution
        // A more robust solution would be to write a custom expression parser
        const result = new Function('return ' + expression)();
        expression = String(result);
        updateDisplay();
    } catch (e) {
        display.textContent = 'Error';
    }
}

function clearAll() {
    expression = '';
    updateDisplay();
}

function clearEntry() {
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
        updateDisplay();
    }
}

function backspace() {
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
});

// Initialize display
updateDisplay();