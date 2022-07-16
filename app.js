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
        clickFloatPointSign();
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
            clickFloatPointSign();
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
    if($('#display').text().length === 14) return;
    if(operator){
        if(value2 === '0'){
            value2 = numberText;
        }else if(value2 === '-0'){
            value2 = '-' + numberText;
        }else{
            value2 += numberText;
        }
        $('#display').html(value2);
        value1 = value1.endsWith('.') ? value1.slice(0, -1) : value1;
        $('#sub-display').html(value1 + operator);
    }else{
        if(clickEqual){
            value1 = '';
            clickEqual = false;
        }
        if(value1 === '0'){
            value1 = numberText;
        }else if(value1 === '-0'){
            value1 = '-' + numberText;
        }else{
            value1 += numberText;
        }
        $('#display').html(value1);
    }
    changeDisplayFontSize();
}

function clickOperatorButton(operatorText){
    if(!value1) return;
    if(operator){
        calculate();
        $('#sub-display').html('');
    }
    clickEqual = false;
    operator = operatorText;
    $('#display').html(formatNumberDisplay(value1) + operator);
    changeDisplayFontSize();
}

function toggleNegativePositive(){
    if(value2){
        value2 = Number(value2) < 0 ? value2.slice(1) : '-' + value2;
        $('#display').html(value2);
    }else{
        value1 = !value1 ? '-0' : value1.includes('-') ? value1.slice(1) : '-' + value1;
        $('#display').html(value1 + operator);
    }
    changeDisplayFontSize();
}

function clickFloatPointSign(){
    if($('#display').text().length === 14) return;
    if(clickEqual){
        value1 = '0.';
        $('#display').html(value1);
        clickEqual = false;
    }
    if($('#display').text().includes(".")) return;
    if(operator){
        value2 = value2 ? value2 += '.' : '0.';
        $('#display').html(value2);
    }else{
        value1 = value1 ? value1 += '.' : '0.';
        clickEqual = false;
        $('#display').html(value1);
    }
    changeDisplayFontSize();
}

function clickPercentSign(){
    if(!value1) return;
    if(!value2){
        value1 = Number(value1) / 100;
        $('#display').html(formatNumberDisplay(value1) + operator);
    }else{
        value2 = value2 === '0' ? value2 : Number(value2) / 100;
        $('#display').html(formatNumberDisplay(value2));
    }
    changeDisplayFontSize();
}

function clickEqualSign(){
    if(!value1) return;
    $('#display').html(formatNumberDisplay(calculate()));
    $('#sub-display').html('');
    clickEqual = true;
    changeDisplayFontSize();
}

function pressBackspaceButton(){
    if(operator){
        if(value2){
            value2 = $('#display').text().slice(0, -1);
            $('#display').html(value2 ? value2 : value1 + operator);
            $('#sub-display').html(value2 ? value1 + operator : '');
        }else{
            $('#display').html($('#display').text().slice(0, -1));
            operator = '';
        }
    }else{
        value1 = $('#display').text().slice(0, -1);
        $('#display').html(value1 ? value1 : '0');
    }
    changeDisplayFontSize();
}

function resetCalculator(){
    value1 = '';
    value2 = '';
    operator = '';
    clickEqual = false;
    $('#display').html('0');
    $('#sub-display').html('');
    changeDisplayFontSize();
}

function calculate(){
    if(!operator || !value2){
        value1 = value1.toString();
        return value1;
    }
    value1 = Number(value1);
    value2 = Number(value2);
    switch(operator){
        case '+':
            value1 += value2;
            break;
        case '-':
            value1 -= value2;
            break;
        case '×':
            value1 *= value2;
            break;
        case '÷':
            if(value2 === 0){
                resetCalculator();
                $('#display').html('ERROR!');
                return;
            }
            value1 /= value2;
            break;
    }
    value1 = value1.toString();
    value2 = '';
    operator = '';
    return value1;
}

function formatNumberDisplay(value){
    return +parseFloat(value).toPrecision(12).toString();
}

function changeDisplayFontSize(){
    if($('#display').text().length > 14){
        $('#display').css('font-size', '2.5rem');
    }else{
        $('#display').css('font-size', '3rem');
    }
}