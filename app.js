class Calculator{
    constructor(currentOperandTextElement,previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    operator(operation){
        if(this.currentOperand === '') return

        if(this.previousOperand !== ''){
            this.compute()
        }

        this.operation = operation
        this.previousOperand =this.currentOperand
        this.currentOperand = ''
    }

    getNumber(number){
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]

        let intergeDisplay

        if(isNaN(integerNumber)){
            intergeDisplay = ''
        }else{
            intergeDisplay = integerNumber.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }

        if(decimalNumber != null){
            return `${intergeDisplay}.${decimalNumber}`
        }
        else {
            return intergeDisplay
        }
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current =parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current))return

        switch(this.operation){
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandTextElement.innerText =
            `${this.getNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const output = document.querySelector('[data-output]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const numberBtn = document.querySelectorAll('[data-number]')
const equalBtn = document.querySelector('[data-equal]')

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)

allClearBtn.addEventListener('click',() => {
    calculator.allClear()
    calculator.updateDisplay()
})

numberBtn.forEach((button)=>{
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorBtn.forEach((button)=>{
    button.addEventListener('click',() => {
        console.log(button.innerText)
        calculator.operator(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click',() => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click',() => {
    calculator.delete()
    calculator.updateDisplay()
})
