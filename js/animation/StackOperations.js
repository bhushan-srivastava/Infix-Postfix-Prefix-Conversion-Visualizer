"use strict"

import updateLogSection from "./UpdateLogSection.js";

/**
 * Push the given value onto the stack of a given id
 * @param {String} stackId The id of the stack
 * @param {String} value The value to push
 */
function pushOnStack(stackId, value) {
    /** store the stack */
    let stackRow = document.getElementById(stackId);

    /** create a new td tag to store the value to push */
    let tdTag = document.createElement("td");

    /** set the innerHTML of the td tag to the given value */
    tdTag.innerHTML = value;

    /** push the value onto the stack */
    stackRow.appendChild(tdTag);

    updateLogSection("Push '" + value + "' onto the " + stackId, "red-background"); // add a log to indicate that a value has been pushed onto the stack
}

/**
 * Pop the value at the top of a stack with the given id
 * @param {String} stackId The id of the stack to pop from
 */
function popFromStack(stackId) {
    /** store the stack */
    let stackRow = document.getElementById(stackId);

    /** get the last element i.e. the element at the top of the stack */
    let lastChild = stackRow.lastChild;

    /** store the value of the value at the top of the stack */
    let value = lastChild.innerText;

    updateLogSection("Pop '" + value + "' from the " + stackId, "green-background"); // add a log to indicate that which value has been popped from the stack

    /** pop the element at the top of the stack */
    stackRow.removeChild(lastChild);
}

export { pushOnStack, popFromStack };