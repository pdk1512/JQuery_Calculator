let value1 = '';
let value2 = '';
let operator = '';
let clickEqual = false;

const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorArray = ['+', '-', '/', '*'];

$(document).ready(function(){

    $('#clear').click(function(){
        resetCalculator();
    });

    $('.number-btn').each(function(index, numButton){
        $(numButton).click(function(){
            clickNumberButton($(numButton).text());
        });
    });

    $('.operator-btn').each(function(index, opeButton){
        $(opeButton).click(function(){
            clickOperatorButton($(opeButton).text());
        });
    });

    $('#equal').click(function(){
        clickEqualSign();
    });

    $('#sign').click(function(){
        toggleNegativePositive();
    });

    $('#demical').click(function(){
        clickDemicalSign();
    });

    $('#percent').click(function(){
        clickPercentSign();
    });

    $(document).keydown(function(event){
        if(numbersArray.includes(event.key)){
            clickNumberButton(event.key);
        }
        if(operatorArray.includes(event.key)){
            let operatorText = event.key === '*' ? '×' : event.key === '/' ? '÷' : event.key;
            clickOperatorButton(operatorText);
        }
        if(['=', 'Enter'].includes(event.key)){
            clickEqualSign();
        }
        if([',', '.'].includes(event.key)){
            clickDemicalSign();
        }
        if(event.key === '%'){
            clickPercentSign();
        }
        if(event.key === 'Backspace'){
            pressBackspaceButton();
        }
        if(event.key === 'Escape'){
            resetCalculator();
        }
    });

});

function clickNumberButton(numberText){
    if($('#display').text().endsWith('%')) return;
    if(operator){
        value2 += numberText;
        $('#display').html(value2);
        value1 = value1.endsWith('.') ? value1.slice(0, -1) : value1;
        $('#sub-display').html(value1 + operator);
    }else{
        // If users click number button right after they click equal button
        if(clickEqual){
            value1 = '';
            clickEqual = false;
        }
        value1 += numberText;
        $('#display').html(value1);
    }
}

function clickOperatorButton(operatorText){
    if(!value1) return;
    if(operator){
        calculate();
        $('#sub-display').html('');
    }
    clickEqual = false;
    operator = operatorText;
    $('#display').html(value1 + operator);
}

function toggleNegativePositive(){
    if($('#display').text() === '0') return;
    if(value2){
        value2 = Number(value2) < 0 ? value2.slice(1) : '-' + value2;
        $('#display').html(value2);
    }else{
        value1 = Number(value1) < 0 ? value1.slice(1) : '-' + value1;
        $('#display').html(value1 + operator);
    }
}

function clickDemicalSign(){
    if($('#display').text().endsWith('%') || $('#display').text().includes(".")) return;
    if(operator){
        value2 = value2 ? value2 += '.' : '0.';
        $('#display').html(value2);
    }else{
        value1 = value1 ? value1 += '.' : '0.';
        $('#display').html(value1);
    }
}

function clickPercentSign(){
    if($('#display').text().endsWith('%') || $('#display').text().endsWith(".")) return;
    if(operator){
        if(!value2) return;
        value2 += '%';
        $('#display').html(value2);
    }else{
        if(!value1) return;
        value1 += '%';
        $('#display').html(value1);
    }
}

function clickEqualSign(){
    if(!value1) return;
    $('#display').html(calculate());
    $('#sub-display').html('');
    clickEqual = true;
}

function pressBackspaceButton(){
    if(operator){
        if(value2){
            value2 = value2.slice(0, -1);
            $('#display').html(value2 ? value2 : value1 + operator);
            $('#sub-display').html(value2 ? value1 + operator : '');
        }else{
            $('#display').html($('#display').text().slice(0, -1));
            operator = '';
        }
    }else{
        value1 = value1.slice(0, -1);
        $('#display').html(value1 ? value1 : '0');
    }
}

function resetCalculator(){
    value1 = '';
    value2 = '';
    operator = '';
    $('#display').html('0');
    $('#sub-display').html('');
}

function calculate(){
    if(!operator || !value2){
        return value1.endsWith('.') ? value1.slice(0, -1) : value1;
    }
    let result = 0;
    value1 = value1.endsWith('%') ? Number(value1.slice(0, -1))/100 : Number(value1);
    value2 = value2.endsWith('%') ? Number(value2.slice(0, -1))/100 : Number(value2);
    switch(operator){
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case '×':
            result = value1 * value2;
            break;
        case '÷':
            result = value1 / value2;
            break;
    }
    value1 = result.toString();
    value2 = '';
    operator = '';
    return value1;
}