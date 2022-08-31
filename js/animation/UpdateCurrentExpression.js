"use strict"

import updateLogSection from "./UpdateLogSection.js";

/** current expression section - shows the current expression's characters one by one */
const currentExpressionSection = document.getElementById("current-expression");

/**
 * Add the given character to the current expression section
 * @param {String} ch The character to add
 */
export default function updateCurrentExpression(ch) {
    /** remove the class that colors the character */
    currentExpressionSection.lastChild.removeAttribute("class");

    /** create a span tag to wrap the character */
    let spanTag = document.createElement("span");
    /** give it a class that will change its background color to blue */
    spanTag.setAttribute("class", "blue-background");
    /** add the character to the span tag */
    spanTag.innerHTML = " " + ch + " ";

    /** add the character to current expression section */
    currentExpressionSection.appendChild(spanTag);

    updateLogSection("Current character is '" + ch + "'", "blue-background"); // add a log to show the current character
}