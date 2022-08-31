"use strict"

/** shows the result of the conversion */
const resultExpressionSection = document.getElementById("result-expression");

/**
 * Set the contents of the result expression section to the given value
 * @param {String} value The value to set
 */
export default function setResultExpression(value) {
    /** set the innerHTML of the result section to the given value */
    resultExpressionSection.innerHTML = value;
}