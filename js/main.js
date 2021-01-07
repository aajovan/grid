"use strict";

  var globalUI = {
    mainContainer: ".gridMain",
    gridSize: "#gridSize",
    btnGenerate: "#btn-initialize",
    gridField: ".gridField",
    gridFieldClass: "gridField",
    gridFieldContainer: ".gridField__container",
    gridFieldContainerClass: "gridField__container",
    colorPicker: "#colorPick",
    colorPickerCheckBox: "#usePicker",
    defaultColor: "rgb(255, 255, 255)",
    popupBtn: ".popup__btn-close",
    popup: "#popup"
  };

  //setup button event handlers

  $(globalUI.btnGenerate).on("click", initialize);

  $(globalUI.popupBtn).on("click", function () {
    $(globalUI.popup).fadeOut(300);
  });

  //Main function

  function initialize() {
    var gridSize = parseInt($(globalUI.gridSize).val());
    var inputIsValid = checkUserInput(gridSize);

    if (inputIsValid) {
      generateEmptyGrid(gridSize);
      generateEventListeners();
    }
  }

  //Check if valid input

  function checkUserInput(number) {
    if (number && number > 15 && number < 65) {
      return true;
    }

    $(globalUI.popup).fadeIn(300);
    return false;
  }

  //Generate listeners for each grid field, define grid field behaviour

  function generateEventListeners() {
    $(globalUI.gridField).off();
    $(globalUI.gridField).each(function (i) {
      this.addEventListener("mouseenter", function (event) {
        var colorCheckBox = $(globalUI.colorPickerCheckBox).prop("checked");

        if (
          colorCheckBox &&
          this.style.backgroundColor === globalUI.defaultColor
        ) {
          this.style.backgroundColor = $(globalUI.colorPicker).val();
        } else if (this.style.backgroundColor === globalUI.defaultColor) {
          this.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          this.style.backgroundColor = globalUI.defaultColor;
        }
      });
    });
  }

  //Creates grid with default rgb color - white

  function generateEmptyGrid(number) {
    $(globalUI.gridFieldContainer).remove();

    for (var index = 0; index < number; index++) {
      $(globalUI.mainContainer).append(
        '<div class="' + globalUI.gridFieldContainerClass + '"></div>'
      );

      for (var _index = 0; _index < number; _index++) {
        $(globalUI.gridFieldContainer + ":last-child").append(
          '<div style="background-color: ' +
          globalUI.defaultColor +
          ';" class="' +
          globalUI.gridFieldClass +
          '"></div>'
        );
      }
    }
  }

