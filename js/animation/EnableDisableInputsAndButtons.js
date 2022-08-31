"use strict"

/** input for expression to convert */
const expressionInput = document.getElementById("expression");
/** select tag with the current notation options */
const currentNotationInput = document.getElementById("current-notation");
/** select tag with the result notation options */
const resultNotationInput = document.getElementById("result-notation");
/** button to reset the input */
const resetButton = document.getElementById("reset");
/** start visualization button */
const startButton = document.getElementById("start-visualization");

/**
 * Enable all the buttons on the page
 */
function enableButtons() {
    resetButton.removeAttribute("disabled"); // enable the button to reset the input

    startButton.removeAttribute("disabled"); // enable the Start Visualization Button
}

/**
 * Disable all the buttons on the page
 */
function disableButtons() {
    resetButton.setAttribute("disabled", "disabled"); // disable the button that resets the input to prevent multiple clicks

    startButton.setAttribute("disabled", "disabled"); // disable the Start Visualization Button to prevent multiple clicks
}

/**
 * Enable all the input fields on the page
 */
function enableInputs() {
    currentNotationInput.removeAttribute("disabled"); // enable the select tag with the current notation options

    resultNotationInput.removeAttribute("disabled"); // enable the select tag with the result notation options

    expressionInput.removeAttribute("disabled"); // enable the expression input field
}

/**
 * Disable all the input fields on the page
 */
function disableInputs() {
    currentNotationInput.setAttribute("disabled", "disabled"); // disable the select tag with the current notation options

    resultNotationInput.setAttribute("disabled", "disabled"); // disable the select tag with the result notation options

    expressionInput.setAttribute("disabled", "disabled"); // disable the the expression input field
}

export { enableButtons, disableButtons, enableInputs, disableInputs };