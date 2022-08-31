"use strict"

/**
 * Set the color of the top element of the stack
 * @param {String} stackId The stack's id
 * @param {String} className The class name of the color to set
 */
export default function setTdTagColor(stackId, className) {
    /** store the stack i.e. tr tag */
    let stackRow = document.getElementById(stackId);

    /** store the top element of the stack */
    let lastChild = stackRow.lastChild;

    /** 
     * set the class attribute to the given class name
     * all the css rules of the given class will apply to the top element of the stack
     */
    lastChild.setAttribute("class", className);
}