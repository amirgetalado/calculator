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

let firstValue;
let secondValue;
let operation;
let result;

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
       

    })
}


//add event listeners to operation buttons, disable them if there are no current display
for(const opBtn of operateBtn){
    opBtn.addEventListener('click', (e) => {
        decimalBtn.disabled = false;

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
                operation = opBtn.innerText;
                firstValue = result;
                upperDisplay.innerText = `${firstValue} ${opBtn.innerText}`
                lowerDisplay.innerText = '0';
                secondValue=undefined;
            }

        }
        

    });
}

//add event listener to equals button and set values of operation, firstVal secondVal after
equalBtn.addEventListener('click', (e) => {
    //if there is no operation
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
        result = undefined;
    }



    // //if you have firstValue, and no secondValue yet
    // if(firstValue!=undefined && secondValue===undefined){
    //     //secondValue will be the text currently displayed then operate afterwards
       
    //     secondValue = lowerDisplay.innerText;
    //     operate();

    //     //change display to result
    //     lowerDisplay.innerText = result; 
    //     upperDisplay.innerText=`${firstValue} ${operation} ${secondValue} `; 

    //     //if result is num divided by zero
    //     if(lowerDisplay.innerText===`Can't divide by 0!`){

    //         //disable all button except clearAll
    //         for(const btn of allBtn){
    //             btn.disabled=true;
    //             btn.style.opacity='.1'
    //         }   
    //         clearBtn.disabled=false;  
    //         clearBtn.style.opacity='1';   
    //         clearBtn.style.background = 'red';
            

    //     }
        
    //     firstValue = result;
    //     operation = undefined;
    //     secondValue = undefined;
    //     result = undefined;

    // }
    
});





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
            //check if result is decimal, it it is, round to 6 decimal places
            if((result%1) !==0){
                result = result.toFixed(6);
            }else{
                return result;
            }

        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            if((result%1) !==0){
                result = result.toFixed(6);
            }else{
                return result;
            }

        case 'x':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            if((result%1) !==0){
                result = result.toFixed(6);
            }else{
                return result;
            }

        case '÷':
            if(secondValue === '0'){
                result = `Can't divide by 0!`
                return result;
            }else{
                result = parseFloat(firstValue) / (secondValue);
                
            }
            if((result%1) !==0){
                result = result.toFixed(6);
            }else{
                return result;
            }

    }  
}

