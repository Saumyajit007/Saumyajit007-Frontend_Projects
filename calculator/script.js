let RunningTotal=0;
let Buffer='0'
let PreviouOperator;

const screen =document.querySelector(".screen")

const buttonClick =(value)=>{
    console.log(value);
    if(isNaN(value)){
        handelSymbol(value)
    }else{
        handleNumber(value)
    }
    screen.innerText= Buffer;
}

function handelSymbol(symbol){
    switch (symbol) {
        case 'C':
            Buffer='0'
            RunningTotal=0
            break;
        case '=':
            if (PreviouOperator===null) {
                return
            }
            flushOperation(parseInt(Buffer))
            PreviouOperator=null
            Buffer=RunningTotal
            RunningTotal=0
            break;
        case '←':
            if (Buffer.length === 1) {
                buffer ='0'
            }else{
                Buffer=Buffer.substring(0,Buffer.length-1)
            }
            break
            case '+':
            case '-':
            case 'x':
            case '÷':
                handleMath(symbol)
                break
    }
}

function handleMath(symbol) {
    if (Buffer==='0') {
        return;
    }
    const intBuffer=parseInt(Buffer)
    if (RunningTotal===0) {
        RunningTotal=intBuffer
    } else {
        flushOperation(intBuffer)
    }
    PreviouOperator=symbol
    Buffer='0'
}

function flushOperation(intBuffer) {
    if(PreviouOperator==='+'){
        RunningTotal+=intBuffer
    }else if(PreviouOperator==='-'){
        RunningTotal -=intBuffer
    }else if(PreviouOperator==='x'){
        RunningTotal*=intBuffer
    }else if(PreviouOperator==='÷'){
        RunningTotal/=intBuffer
    }
}

function handleNumber(numberString) {
    if (Buffer==='0') {
        Buffer=numberString
    }else(
        Buffer+=numberString
    )
}

function init() {
    document.querySelector('.calc-button').addEventListener('click',function(e){
        buttonClick(e.target.innerText)
    })
}
init()
