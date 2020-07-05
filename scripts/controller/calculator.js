class Calculator {
    constructor() {

        this.mathExpression = [];
        this.initialize();
    }

    initialize() {

        this.buttonEvents();
        this.keyboardEvents();
    }

    isOperator(value) {
        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }

    porcentCalc(){
        
        let newValue;
            newValue = eval(`${this.lastItem()}/100 * ${this.mathExpression[0]}`);        
            

        this.setLastItem(newValue);
        this.execCalc();
    }
    
    lastItem(){
        return this.mathExpression[this.mathExpression.length - 1];
    }
    
    setLastItem(value){
        this.mathExpression[this.mathExpression.length - 1] = value;
        this.displayActualization(this.mathExpression);
    }

    expressionBuild(value) {

     if(this.mathExpression.length <= 3){

        if (this.isOperator(value)) {
            if(value === '%' && this.mathExpression.length === 3){
                this.porcentCalc();
                return;
            }
            if(this.mathExpression.length !== 3){
                if(this.isOperator(this.lastItem())){
                    this.setLastItem(value)
                }else{
                    this.mathExpression.push(value);
                }
            }else{                
                this.execCalc();
                this.mathExpression.push(value);                           
            }

            if(this.isOperator(this.mathExpression[0])){
                this.mathExpression.shift();
            }
            
        } else {
            if(this.mathExpression.length === 0){
                this.mathExpression = [''];
            }
            
            if(this.isOperator(this.lastItem())){                                                                 
                this.mathExpression.push(value);                 
            }else{
                this.mathExpression[this.mathExpression.length - 1] += value;                  
            }
        }
    }

        this.displayActualization(this.mathExpression);
    }

    execCalc(){

        let result = eval(this.mathExpression.join(''));        
        result = result.toString();
        this.mathExpression = [result];
        this.displayActualization(this.mathExpression);
    }

    cleanEntry(){
        this.mathExpression.pop();
        this.displayActualization(this.mathExpression);
    }

    cleanAll(){
        this.mathExpression = [];
        this.displayActualization(this.mathExpression);
    }

    execBtn(value) {
        switch (value) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.expressionBuild(value);
                break;
            case 'CE':
                this.cleanEntry();
                break
            case 'C':
                this.cleanAll();
                break;
            case '+':
                this.expressionBuild(value);
                break;
            case '-':
                this.expressionBuild(value);
                break;
            case 'X':
                this.expressionBuild('*');
                break;
            case '÷':
                this.expressionBuild('/');
                break;
            case '%':
                this.expressionBuild('%');
                break;
            case '=':
                this.execCalc();
                break;
            case 'Backspace':
                this.cleanEntry();
                break;
        }
    }

    buttonEvents() {
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', e => {
                this.execBtn(btn.innerHTML);
            });
        });
    }

    keyboardEvents(){
        document.addEventListener('keyup', e =>{
                let key = e.key === '/'? '÷' : e.key;
                key = key === '*'? 'X' : key;
                key = key === 'Enter'? '=' : key;
                
                this.execBtn(key);
            });        
    }

    displayActualization(value) {
        if(value.join('').length > 11){
            value = 'Error';            
        }else{
            value = value.length === 0 ? 0 : value.join('');
        }

        document.querySelector('#display').innerHTML = value;
    }
}
