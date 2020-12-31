"use strict";

var globalFields_UI = {
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
}; 

//Main function

var initialize = function initialize() {
  var gridSize = parseInt(
    document.getElementById(globalFields_UI.gridSize).value
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

  alert(globalFields_UI.userError);
  return false;
}; 

//Generate listeners for each grid field, define grid field behaviour

var generateEventListeners = function generateEventListeners() {
  $("." + globalFields_UI.gridField).each(function (i) {
    this.addEventListener(
      "mouseenter",
      function (event) {
        var colorCheckBox = document.getElementById(
          globalFields_UI.colorPickerCheckBox
        ).checked;

        if (
          colorCheckBox &&
          this.style.backgroundColor === globalFields_UI.defaultColor
        ) {
          this.style.backgroundColor = document.getElementById(
            globalFields_UI.colorPicker
          ).value;
        } else if (
          this.style.backgroundColor === globalFields_UI.defaultColor
        ) {
          this.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          this.style.backgroundColor = globalFields_UI.defaultColor;
        }
      }
    );
  });

};

//Creates grid with default rgb color - white

var generateEmptyGrid = function generateEmptyGrid(number) {
  $("." + globalFields_UI.gridFieldContainer).remove();

  for (var index = 0; index < number; index++) {
    $("." + globalFields_UI.mainContainer).append(
      '<div class="' + globalFields_UI.gridFieldContainer + '"></div>'
    );

    for (var _index = 0; _index < number; _index++) {
      $("." + globalFields_UI.gridFieldContainer + ":last-child").append(
        '<div style="background-color: ' +
        globalFields_UI.defaultColor +
        ';" class="' +
        globalFields_UI.gridField +
        '"></div>'
      );
    }
  }
};

document
  .getElementById(globalFields_UI.btnGenerate)
  .addEventListener("click", initialize);
