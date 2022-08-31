"use strict"

/** Log Section */
const logSection = document.getElementById("log-section");

/**
 * Add the given message with given color to the Log Section
 * @param {String} message The message to add
 * @param {String} className The class name of the color
 */
export default function updateLogSection(message, className) {
    const pTag = document.createElement("p"); // create a new <p> tag
    pTag.setAttribute("class", className); // give a background color to the <p> tag
    pTag.innerHTML = message; // <p>message</p>
    logSection.appendChild(pTag); // add the <p> tag to the Log Section

    scrollToBottom(logSection); // scroll to the bottom of the Log Section to see the log
}

/**
 * Scroll to the bottom of the given node
 * @param {HTMLElement} node 
 */
function scrollToBottom(node) {
    node.scrollTop = node.scrollHeight;
}