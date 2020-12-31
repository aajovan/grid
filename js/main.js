"use strict";

var globalUI = {
  mainContainer: "gridMain",
  gridSize: "gridSize",
  btnGenerate: "btn-initialize",
  btnReset: "btn-reset",
  gridField: "gridField",
  gridFieldContainer: "gridField__container",
  colorPicker: "colorPick",
  colorPickerCheckBox: "usePicker",
  defaultColor: "rgb(255, 255, 255)",
}; 

//Main function

var initialize = function initialize() {
  var gridSize = parseInt(
    document.getElementById(globalUI.gridSize).value
  );
  var inputIsValid = checkUserInput(gridSize);

  if (inputIsValid) {
    generateEmptyGrid(gridSize);
    generateEventListeners();
  }
}; 

//Check if valid input

var checkUserInput = function checkUserInput(number) {
  if (number && number > 15 && number < 65) {
    return true;
  }
  $('#popup').fadeIn(300);
  return false;
}; 

//Generate listeners for each grid field, define grid field behaviour

var generateEventListeners = function generateEventListeners() {
  $("." + globalUI.gridField).each(function (i) {
    this.addEventListener(
      "mouseenter",
      function (event) {
        var colorCheckBox = document.getElementById(
          globalUI.colorPickerCheckBox
        ).checked;

        if (
          colorCheckBox &&
          this.style.backgroundColor === globalUI.defaultColor
        ) {
          this.style.backgroundColor = document.getElementById(
            globalUI.colorPicker
          ).value;
        } else if (
          this.style.backgroundColor === globalUI.defaultColor
        ) {
          this.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          this.style.backgroundColor = globalUI.defaultColor;
        }
      }
    );
  });

};

//Creates grid with default rgb color - white

var generateEmptyGrid = function generateEmptyGrid(number) {
  $("." + globalUI.gridFieldContainer).remove();

  for (var index = 0; index < number; index++) {
    $("." + globalUI.mainContainer).append(
      '<div class="' + globalUI.gridFieldContainer + '"></div>'
    );

    for (var _index = 0; _index < number; _index++) {
      $("." + globalUI.gridFieldContainer + ":last-child").append(
        '<div style="background-color: ' +
        globalUI.defaultColor +
        ';" class="' +
        globalUI.gridField +
        '"></div>'
      );
    }
  }
};

$('.popup__btn-close').on('click', function () {
  $('#popup').fadeOut(300);
});

document
  .getElementById(globalUI.btnGenerate)
  .addEventListener("click", initialize);
