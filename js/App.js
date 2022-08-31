"use strict"

import { isInfix, isPostfix, isPrefix } from "./validate/ValidateExpression.js";
import infixToPostfix from "./convert/Infix/InfixToPostfix.js";
import infixToPrefix from "./convert/Infix/InfixToPrefix.js";
import postfixToInfix from "./convert/Postfix/PostfixToInfix.js";
import postfixToPrefix from "./convert/Postfix/PostfixToPrefix.js";
import prefixToInfix from "./convert/Prefix/PrefixToInfix.js";
import prefixToPostfix from "./convert/Prefix/PrefixToPostfix.js";
import generateStack from "./animation/GenerateStack.js";
import { pushOnStack, popFromStack } from "./animation/StackOperations.js";
import setTdTagColor from "./animation/SetTdTagColor.js";
import { resetOutputSections } from "./animation/ResetOutputSections.js";
import { enableButtons, disableButtons, enableInputs, disableInputs } from "./animation/EnableDisableInputsAndButtons.js";

/** input for expression to convert */
const expressionInput = document.getElementById("expression");
/** display the invalid input message */
const invalidInputSpan = document.getElementById("invalid-input-span");
/** select tag with the current notation options */
const currentNotationInput = document.getElementById("current-notation");
/** select tag with the result notation options */
const resultNotationInput = document.getElementById("result-notation");
/** button to reset the input */
const resetButton = document.getElementById("reset");
/** start visualization button */
const startButton = document.getElementById("start-visualization");

/** current notation of the input expression */
let currentNotation = currentNotationInput.value;
/** index of the current notation in the select tag */
let currentNotationIndex = currentNotationInput.selectedIndex;

/** the expression to convert */
let expression = expressionInput.value;

/** 
 * placeholders for the expression input field based on the different notations
 * 
 * Infix: "A + B"
 * 
 * Postfix: "A B +"
 * 
 * Prefix: "+ A B"
 */
const expressionInputPlaceholderValues = ["A + B", "A B +", "+ A B"];

/** store the functions to validate if the given expression is a valid infix/postfix/prefix expression */
const validationFunctionsArr = [isInfix, isPostfix, isPrefix];

/** store the different functions for the conversions */
const conversionFunctions = {
    "infix-to-postfix": infixToPostfix,
    "infix-to-prefix": infixToPrefix,
    "postfix-to-infix": postfixToInfix,
    "postfix-to-prefix": postfixToPrefix,
    "prefix-to-infix": prefixToInfix,
    "prefix-to-postfix": prefixToPostfix
};

/**
 * Store the animation functions and their respective params
 * 
 * animationsArr = [

        [function1, [parameter1, parameter2,....parameterN]],
        [function2, [parameter1, parameter2,....parameterN]],
                            .
                            .
                            .
                            .
        [functionN, [parameter1, parameter2,....parameterN]]
    ]
 */
let animationsArr = new Array();

/** only allow conversions between different input/output notations and not the same input/output notation */
currentNotationInput.addEventListener("change", () => {
    /** store current notation of the input expression */
    currentNotation = currentNotationInput.value;

    /** store index of the current notation in the select tag */
    currentNotationIndex = currentNotationInput.selectedIndex;

    /** disable the output option tag which has the same index as the input option tag */
    disableOptionTag(currentNotationIndex);
    /** enable the output option tags which do not have the same index as the input option tag */
    enableOtherOptionTags(currentNotationIndex);

    /** change the placeholder according to the current input notation */
    expressionInput.placeholder = expressionInputPlaceholderValues[currentNotationIndex];
});

/** reset the input fields */
resetButton.addEventListener("click", () => {
    /** reset the input expression value */
    expressionInput.value = "";
    /** change the placeholder to an infix expression */
    expressionInput.placeholder = expressionInputPlaceholderValues[0];
    /** update the variable that stores the input expression */
    expression = expressionInput.value;

    /** select the input notation as infix and update the varibles that store the input notation and its index */
    currentNotationInput.selectedIndex = 0;
    currentNotation = currentNotationInput.value;
    currentNotationIndex = currentNotationInput.selectedIndex;

    /** reset the invalid input span */
    invalidInputSpan.innerHTML = "";

    /** disable infix notation in the output options */
    disableOptionTag(0);
    /** enable other output option and not keep infix disabled */
    enableOtherOptionTags(0);

    /** select postfix as the output notation */
    resultNotationInput.selectedIndex = 1;
});

/** start the conversion */
startButton.addEventListener("click", () => {
    /** store the input expression */
    expression = expressionInput.value;

    /** if the expression has some value i.e. it is not null */
    if (expression) {
        /** remove all the spaces in the expression */
        expression = expression.replace(/\s/g, "");
        /** change all '{' and '[' to '(' */
        expression = expression.replace(/[\{\[]/g, "(");
        /** change all '}' and ']' to ')' */
        expression = expression.replace(/[\}\]]/g, ")");

        /** store the appropritate validation function in a variable */
        let validationFunction = validationFunctionsArr[currentNotationIndex];

        /** if the expression is valid according to the input notation then start the conversion */
        if (validationFunction(expression) == true) {
            startConversion();
        }
        /** if the expression is invalid according to the input notation then display "Invalid Input" */
        else {
            invalidInputSpan.innerHTML =
                "Invalid Input. Please use the form: "
                + expressionInputPlaceholderValues[currentNotationIndex];
        }
    }
    /** if the expression does not have a value i.e. it is null then ask the user for an input expression */
    else {
        invalidInputSpan.innerHTML = "Please enter an expression to convert";
    }
});

/**
 * Disable the output option tag at the given index
 * @param {Number} index The index of the output option tag to disable
 */
function disableOptionTag(index) {
    resultNotationInput.options[index].setAttribute("disabled", "disabled");
}

/**
 * Enable all the output option tags other than the given index
 * @param {Number} indexToExclude The index of the output option tag that will stay disabled
 */
function enableOtherOptionTags(indexToExclude) {
    for (let i = 2; i >= 0; i--) {
        if (i != indexToExclude) {
            resultNotationInput.options[i].removeAttribute("disabled");
            resultNotationInput.selectedIndex = i;
        }
    }
}

/**
 * Start the conversion
 */
function startConversion() {
    /** reset the invalid input span */
    invalidInputSpan.innerHTML = "";

    /** store the conversion to execute */
    let conversionToExecute = currentNotation + "-to-" + resultNotationInput.value;

    /** store the appropriate conversion function */
    let conversionFunction = conversionFunctions[conversionToExecute];

    // disable all the input fields and buttons to prevent altering of input values and multiple clicks
    disableInputs();
    disableButtons();

    /** reset the output sections */
    resetOutputSections();

    /** generate the stacks required for the conversion */
    generateStack(conversionToExecute);

    /** reset the animationsArr */
    animationsArr = new Array();

    /** call the conversion function that will return an array of animation functions with their respective args */
    animationsArr = conversionFunction(expression);

    animateCurrentSortingAlgorithm(); // function to visualize the sorting algorithm
}

/**
 * Create a delay using promise
 * @param {Number} time The delay time in milliseconds
 * @returns {Promise} A promise that will resolve after the given time in milliseconds
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time)); // the promise is resolved after the given time
}

/**
 * Visualize the sorting algorithm
 */
async function animateCurrentSortingAlgorithm() {
    /** The delay time in milliseconds */
    const delayTime = 500;

    /** access each animation function in the animationsArr and call them with their respective args */
    for (const functionArr of animationsArr) {
        /** The animation function to call */
        let animationFunction = functionArr[0];
        /** array of arguments to pass to the animatin function */
        let args = functionArr[1];

        await delay(delayTime); // create a delay to show the animation step-by-step
        animationFunction(...args); // call the function with its respective parameters
    }

    await delay(200);

    // enable all the input fields and the buttons
    enableInputs();
    enableButtons();
}