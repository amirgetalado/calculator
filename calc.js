const upperDisplay = document.querySelector(".display-upper");
const lowerDisplay = document.querySelector(".display-lower");
const equalBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const clearEntryBtn = document.querySelector(".clear-entry");
const decimalBtn = document.querySelector(".decimal");
const squareBtn = document.querySelector('.exponent');


const numBtn = document.querySelectorAll('.num');
const operateBtn = document.querySelectorAll('.operate-btn');
const allBtn = document.querySelectorAll('.btn-all');

const MAX_DIGIT_DISPLAY = 18; //total number of digits to display
let firstValue;
let secondValue;
let operation;
let result = '';

// let currentDisplay=lowerDisplay.innerText;

//Add event listeners to btn 0-9, '.' button
for(const btn of numBtn){
    btn.addEventListener('click', (e) => {
        
        

        if(btn.innerText==='.'){
            btn.disabled = true;
            btn.style.opacity='1';
        }

        if(lowerDisplay.innerText===''){

            if(btn.innerText==='.'){
                lowerDisplay.innerText = '0.'
            // }else if(btn.innerText==='0'){
            //     lowerDisplay.innerText = '';
            }else{
                lowerDisplay.innerText += btn.innerText;
            }

        }else if (lowerDisplay.innerText === '0'){
            if(btn.innerText==='.'){
                lowerDisplay.innerText = '0.'
            }else{
                lowerDisplay.innerText = ''; 
                lowerDisplay.innerText += btn.innerText;
            }
        }else if(lowerDisplay.innerText===`Can't divide by 0!`){
            lowerDisplay.innerText = '';
            lowerDisplay.innerText += btn.innerText;

        }else{
            lowerDisplay.innerText += btn.innerText;
        }
        

        //disable num buttons if max digits is reached
        if(lowerDisplay.innerText.length >= MAX_DIGIT_DISPLAY ){
            for(const nBtn of numBtn){
                nBtn.disabled=true;     
            }
        }

        //enables operation buttons after pressing num btns
        for(const opBtn of operateBtn){
            opBtn.disabled = false;
        }
    })
}


//add event listeners to operation buttons, disable them if there are no current display
for(const opBtn of operateBtn){
    opBtn.addEventListener('click', (e) => {
        //Once the operation buttons are clicked, user can enter decimal again
        decimalBtn.disabled = false;

        //enable num buttons in case it was all disabled from the previous loop
        for (const btn of numBtn) {
            btn.disabled = false;
          }

        
        if(lowerDisplay.innerText===''){
            opBtn.disabled = true;
        }else{
            opBtn.disabled = false;

            if(firstValue===undefined && secondValue===undefined){
                firstValue = lowerDisplay.innerText;
                operation = opBtn.innerText;
                upperDisplay.innerText = `${firstValue} ${opBtn.innerText}`;
                lowerDisplay.innerText = '0';
            }else if(firstValue!=undefined && secondValue===undefined){
                secondValue = lowerDisplay.innerText;
                operate();
                firstValue = result;
                operation = opBtn.innerText;
                upperDisplay.innerText = `${firstValue} ${opBtn.innerText}`
                lowerDisplay.innerText = '0';
                secondValue=undefined;
            }

        }
    });
}



//add event listener to equals button and set values of operation, firstVal secondVal after
equalBtn.addEventListener('click', (e) => {
    // if there is no operation
    if(operation===undefined){
        equalBtn.disabled=true;
    }else{
        
        equalBtn.disabled=false;
        secondValue = lowerDisplay.innerText;
        operate();

        //change display to result
        lowerDisplay.innerText = result; 
        upperDisplay.innerText=`${firstValue} ${operation} ${secondValue} `; 

        //if result is num divided by zero
        if(lowerDisplay.innerText===`Can't divide by 0!`){

            //disable all button except clearAll
            for(const btn of allBtn){
                btn.disabled=true;
                btn.style.opacity='.1'
            }   
            clearBtn.disabled=false;  
            clearBtn.style.opacity='1';   
            clearBtn.style.background = 'red';
            

        }
        
        firstValue = result;
        operation = undefined;
        secondValue = undefined;
        
    }
    
});


squareBtn.addEventListener('click', (e) => {
    if(lowerDisplay.innerText ===''){
        squareBtn.disabled=true;
    }else{
        squareBtn.disabled=false;
        let num = lowerDisplay.innerText;
        square = num * num;
        lowerDisplay.innerText = square;
    }
    
})


//eventlistener for clear all button
clearBtn.addEventListener('click', (e) => {
    firstValue = undefined;
    secondValue = undefined;
    operation = undefined;
    result = undefined;
    upperDisplay.innerText = '';
    lowerDisplay.innerText = '';


    for(const btn of allBtn){
        btn.disabled=false;
        btn.style.opacity='1'
    }   
    clearBtn.disabled=false;  
    clearBtn.style.opacity='1';   
            
    clearBtn.style.background = '#a3a3a3';
});


//eventlistener for clear entry button
clearEntryBtn.addEventListener('click', (e) => {
    text = lowerDisplay.innerText;
    lowerDisplay.innerText = text.slice(0,text.length-1);
 
});



//for operate() which whill be called when +,-,*,/, and = are pressed
const operate = function (){
    switch(operation){
        case '+':
            result = parseFloat(firstValue) + parseFloat(secondValue);
            roundDecimal();
            return result;

        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            roundDecimal();
            return result;

        case 'x':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            roundDecimal();
            return result;

        case '÷':
            if(secondValue === '0'){
                result = `Can't divide by 0!`
                return result;
            }else{
                result = parseFloat(firstValue) / (secondValue);
                roundDecimal();
                return result;
            }
    }  
    
}

//will call this function in the result of switch to check if result is decimal, if it is round it of to 6 decimal places
function roundDecimal(){
    if(result%1 !== 0){
        //check num of decimal places
        const decimalIndex = result.toString().indexOf('.');
        const numDecimalPlaces = result.toString().length - decimalIndex-1;

        if(numDecimalPlaces>6){
            // round to 6 decimal places
            result = parseFloat(result.toString().slice(0, decimalIndex + 7));
            return result;
        }
    }
    return result;
}


// Current problem is when you enter firstValue then second value
// then you press equals,then press operator  it will display
// undefined to firstValue in upper display
//
//
//
//