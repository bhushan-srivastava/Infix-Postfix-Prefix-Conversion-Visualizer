"use strict"

import updateLogSection from "./UpdateLogSection.js";

/** conversion visualizer section */
const conversionVisualizerSection = document.getElementById("conversion-visualizer-section");

/** names of the stacks for each conversion */
const tableCaptions = {
    "infix-to-postfix": ["Postfix Stack", "Operators Stack"],
    "infix-to-prefix": ["Prefix Stack", "Operators Stack"],
    "postfix-to-infix": "Infix Stack",
    "postfix-to-prefix": "Prefix Stack",
    "prefix-to-infix": "Infix Stack",
    "prefix-to-postfix": "Postfix Stack"
};

/** names of the ids for each conversion */
const tableIds = {
    "infix-to-postfix": ["postfix-stack", "operators-stack"],
    "infix-to-prefix": ["prefix-stack", "operators-stack"],
    "postfix-to-infix": "infix-stack",
    "postfix-to-prefix": "prefix-stack",
    "prefix-to-infix": "infix-stack",
    "prefix-to-postfix": "postfix-stack"
};

/**
 * Generate stacks for the conversionToExecute
 * @param {String} conversionToExecute The conversion to execute
 */
export default function generateStack(conversionToExecute) {
    /** infix conversions use two stacks */
    if (conversionToExecute == "infix-to-postfix" || conversionToExecute == "infix-to-prefix") {
        updateLogSection("Start " + conversionToExecute + " conversion ", "blue-background"); // add a log to indicate which conversion has started

        /** store the stacks' names and ids in variables */
        let caption1 = tableCaptions[conversionToExecute][0];
        let id1 = tableIds[conversionToExecute][0];
        generateTable(id1, caption1); // generate the stack using a table tag

        let caption2 = tableCaptions[conversionToExecute][1];
        let id2 = tableIds[conversionToExecute][1];
        generateTable(id2, caption2); // generate the stack using a table tag
    }
    /** postfix and prefix conversions use one stack */
    else {
        updateLogSection("Start " + conversionToExecute + " conversion ", "blue-background"); // add a log to indicate which conversion has started

        /** store the stack's name and id in variables */
        let caption = tableCaptions[conversionToExecute];
        let id = tableIds[conversionToExecute];
        generateTable(id, caption); // generate the stack using a table tag
    }
}

/**
 * Generate a stack using a table tag and display it in the conversion visualizer section
 * @param {String} tableId The stack's id which will be assigned as the table tag's id
 * @param {String} caption The stack's name which will be assigned as the table tag's caption
 */
function generateTable(tableId, caption) {
    // create a table element
    const tbl = document.createElement("table");

    // create a new caption element
    const tblCaption = document.createElement("caption");

    // add the contents of the new caption tag
    tblCaption.innerHTML = caption;

    // add the caption tag to the table tag
    tbl.appendChild(tblCaption);

    // create a tbody element
    const tblBody = document.createElement("tbody");

    // create a table row
    const row = document.createElement("tr");
    // assign an id to it
    row.setAttribute("id", tableId);

    // add the row to the end of the table body
    tblBody.appendChild(row);

    // add the tbody to the table
    tbl.appendChild(tblBody);

    // add the table to the Conversion Visualizer Section
    conversionVisualizerSection.appendChild(tbl);

    updateLogSection("Add " + caption, "blue-background"); // add a log to indicate which stack is added
}