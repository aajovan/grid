globalFields_UI = {
    mainContainer: "gridMain",
    gridSize: "gridSize",
    btnGenerate: "btn-initialize",
    btnReset: "btn-reset",
    gridField: "gridField",
    gridFieldContainer: "gridField__container",
    colorPicker: "colorPick",
    colorPickerCheckBox: "usePicker",
    defaultColor: "rgb(255, 255, 255)",
    userError: "Unesite broj između 16 i 64!"
}

//Main function
const initialize = function () {

    let gridSize = parseInt(document.getElementById(globalFields_UI.gridSize).value);
    let inputIsValid = checkUserInput(gridSize);

    if (inputIsValid) {
        generateEmptyGrid(gridSize);
        generateEventListeners();
    }
}
//Check if valid input
const checkUserInput = function (number) {
    if (number && number > 15 && number < 65) { return true }
    alert(globalFields_UI.userError);
    return false;
}

//Generate listeners for each grid field, define grid field behaviour
//TO DO - replace for each - IE11?
const generateEventListeners = function () {
    const elements = document.querySelectorAll('.gridField');

    elements.forEach(elem => {
        elem.addEventListener("mouseenter", function (event) {
            var colorCheckBox = document.getElementById(globalFields_UI.colorPickerCheckBox).checked;
            if (colorCheckBox && elem.style.backgroundColor === globalFields_UI.defaultColor) {
                elem.style.backgroundColor = document.getElementById(globalFields_UI.colorPicker).value;
            } else if (elem.style.backgroundColor === globalFields_UI.defaultColor) {
                elem.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            } else {
                elem.style.backgroundColor = globalFields_UI.defaultColor;
            }

        }, false)
    })
}

//Creates grid with default rgb color - white
const generateEmptyGrid = function (number) {
    $('.' + globalFields_UI.gridFieldContainer).remove();


    for (let index = 0; index < number; index++) {
        $('.' + globalFields_UI.mainContainer).append('<div class="' + globalFields_UI.gridFieldContainer + '"></div>');
        for (let index = 0; index < number; index++) {
            $('.' + globalFields_UI.gridFieldContainer + ':last-child').append('<div style="background-color: ' + globalFields_UI.defaultColor + ';" class="' + globalFields_UI.gridField + '"></div>');
        }
    }
}

document.getElementById(globalFields_UI.btnGenerate).addEventListener("click", initialize);