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

    }

    addNumber(number) {
        if (number === '.' && this.displayCurrentOperand.includes('.')) return
        this.displayCurrentOperand = this.displayCurrentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {

    } 

    calculate() {

    }

    updateDisplay() {
        this.displayCurrentOperandText.innerText = this.displayCurrentOperand
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