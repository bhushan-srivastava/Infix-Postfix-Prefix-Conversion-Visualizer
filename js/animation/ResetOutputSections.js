"use strict"

/** conversion visualizer section */
const conversionVisualizerSection = document.getElementById("conversion-visualizer-section");
/** current expression section - shows the current expression's characters one by one */
const currentExpressionSection = document.getElementById("current-expression");
/** shows the result of the conversion */
const resultExpressionSection = document.getElementById("result-expression");
/** Log Section */
const logSection = document.getElementById("log-section");

/**
 * Reset the output sections
 */
function resetOutputSections() {
    /** delete all the innerHTML of the conversion visualizer section by making its innerHTML = "" */
    conversionVisualizerSection.innerHTML = "";

    /** reset the current expression section */
    currentExpressionSection.innerHTML = "";
    let spanTag = document.createElement("span");
    currentExpressionSection.appendChild(spanTag);

    /** delete all the innerHTML of the result section by making its innerHTML = "" */
    resultExpressionSection.innerHTML = "";

    /** Reset the Log Section to show only the title "Logs" */
    logSection.innerHTML = ""; // delete all the innerHTML of the Log Section by making its innerHTML = ""

    const pTag = document.createElement("p"); // create a new <p> tag
    pTag.innerHTML = "Logs"; // <p>Logs</p>

    const hrTag = document.createElement("hr"); // create a new <hr> tag

    pTag.appendChild(hrTag); // <p>Logs <hr></p>

    logSection.appendChild(pTag); // add the <p>Logs <hr></p> to the Log Section
}

export { resetOutputSections };