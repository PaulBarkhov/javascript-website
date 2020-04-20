function dropdownToggle(i) {
    let dropdown = document.getElementById(i);
    if (dropdown.style.visibility == "visible") {
        dropdown.style.visibility = "hidden";
        dropdown.style.maxHeight = "0";
    }
    else {
        dropdown.style.visibility = "visible";
        dropdown.style.height = "1000px";
        dropdown.style.maxHeight = "160px";
    }
}

function hideDropdown(i) {
    let dropdown = document.getElementById(i);
    dropdown.focus();
    dropdown.style.visibility = "hidden";
    dropdown.style.maxHeight = "0";
}

// =============================================================================================================================================== //
// BASICS

function helloWorld() {
    alert('Hello World!');
}

function changeContent() {
    let toChange = document.getElementById("changeMe");

    toChange.innerHTML = "Wow! It's changed!"
}

function changeAttribute() {
    let btn1 = document.getElementById('btn1');
    btn1.className = "btn2";
}

function changeFontSize() {
    let target = document.getElementById('changeMyFontSize');
    target.style.fontSize = "12px";
}

function demoHide() {
    let target = document.getElementById('hideAndSeek');
    target.style.visibility = "hidden";
}

function demoShow() {
    let target = document.getElementById('hideAndSeek');
    target.style.visibility = "visible";
}

// =============================================================================================================================================== //
// BASIC ARITHMETICS

function addition() {
    let number1 = document.getElementById('number1');
    let x = Number(number1.value);
    let number2 = document.getElementById('number2');
    let y = Number(number2.value);
    let result = document.getElementById('result');

    result.value = x + y;

    if (result.value == "NaN") {
        result.value = "Not a number";

        if (isNaN(x)) {
            number1.style.border = "1px solid red";
        }

        if (isNaN(y)) {
            number2.style.border = "1px solid red";
        }
    }
}

function clearInputs() {
    let number1 = document.getElementById('number1');
    let number2 = document.getElementById('number2');
    let result = document.getElementById('result');

    number1.value = "";
    number2.value = "";
    result.value = "";

    number1.style.border = "1px solid black";
    number2.style.border = "1px solid black";
}
