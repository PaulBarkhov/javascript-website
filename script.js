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
