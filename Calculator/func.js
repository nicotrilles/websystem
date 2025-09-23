let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';
let waitingForOperand = false;

function updateDisplay() {
    if (waitingForOperand && operator && !currentInput) {
        // Show the operator only when waiting and no new input yet
        display.textContent = (previousInput || '0') + ' ' + getOperatorSymbol(operator);
    } else if (operator && currentInput && previousInput) {
        // Show full expression when typing second number
        display.textContent = previousInput + ' ' + getOperatorSymbol(operator) + ' ' + currentInput;
    } else {
        display.textContent = currentInput || '0';
    }
}

function getOperatorSymbol(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        default: return op;
    }
}

function inputNumber(num) {
    if (waitingForOperand) {
        currentInput = num;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator && !waitingForOperand) {
        // Calculate previous operation before setting new operator
        const result = performCalculation();
        
        if (result === null) return;
        
        currentInput = String(result);
        previousInput = result;
        updateDisplay(); // Show the intermediate result briefly
    }

    waitingForOperand = true;
    operator = nextOperator;
    currentInput = ''; // Clear current input after setting operator
    updateDisplay();
}

function performCalculation() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return null;

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero');
                return null;
            }
            result = prev / current;
            break;
        default:
            return null;
    }

    // Round to prevent floating point errors
    return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
}

function calculate() {
    if (operator && !waitingForOperand) {
        const result = performCalculation();
        
        if (result !== null) {
            currentInput = String(result);
            previousInput = '';
            operator = '';
            waitingForOperand = true;
            updateDisplay();
        }
    }
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '';
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '';
    }
    updateDisplay();
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