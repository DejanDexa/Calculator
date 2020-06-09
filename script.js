class Calculator {
    constructor(displayPreviousOperandText, displayCurrentOperandText) {
        this.displayPreviousOperandText = displayPreviousOperandText
        this.displayCurrentOperandText = displayCurrentOperandText
        this.clearAll()
    }

    clearAll() {
        this.displayCurrentOperand = ''
        this.displayPreviousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.displayCurrentOperand = this.displayCurrentOperand.toString().slice(0,-1)
    }

    addNumber(number) {
        if (number === '.' && this.displayCurrentOperand.includes('.')) return
        this.displayCurrentOperand = this.displayCurrentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.displayCurrentOperand === '') return
        if (this.displayPreviousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.displayPreviousOperand = this.displayCurrentOperand
        this.displayCurrentOperand = ''
    } 

    calculate() {
        let calculation 
        const previous = parseFloat(this.displayPreviousOperand)
        const current = parseFloat(this.displayCurrentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+' :
                calculation = previous + current
                break
            case '-' :
                calculation = previous - current
                break
            case '*' :
                calculation = previous * current
                break    
            case '➗' :
                calculation = previous / current
                break
            default:
                return
        }
        this.displayCurrentOperand = calculation
        this.operation = undefined
        this.displayPreviousOperand = ''
    }

    displayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.displayCurrentOperandText.innerText = this.displayNumber(this.displayCurrentOperand)
        if (this.operation != null) {
            this.displayPreviousOperandText.innerText = `${this.displayNumber(this.displayPreviousOperand)} ${this.operation}`
        } else {
            this.displayPreviousOperandText.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[btn-number]')
const operationButtons = document.querySelectorAll('[btn-operation]')
const equalsButton = document.querySelector('[btn-equals]')
const deleteButton = document.querySelector('[btn-delete]')
const allClearButton = document.querySelector('[btn-all-clear]')
const displayPreviousOperandText = document.querySelector('[display-previous-operand]')
const displayCurrentOperandText = document.querySelector('[display-current-operand]')

const calculator = new Calculator(displayPreviousOperandText, displayCurrentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})