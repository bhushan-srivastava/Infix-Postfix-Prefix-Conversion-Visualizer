"use strict"

import updateCurrentExpression from "../../animation/UpdateCurrentExpression.js";
import { pushOnStack, popFromStack } from "../../animation/StackOperations.js";
import setResultExpression from "../../animation/SetResultExpression.js";
import updateLogSection from "../../animation/UpdateLogSection.js";
import setTdTagColor from "../../animation/SetTdTagColor.js";

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

/**
 * Convert the given postfix expression to its prefix form
 * @param {String} expression The expression to convert
 * @returns {Array} An array of animation functions with their respective args used to animate the postfix to prefix conversion
 */
export default function postfixToPrefix(expression) {
    /** reset the animation array */
    animationsArr = new Array();

    /** the prefix stack (rear-end is the top of the stack) */
    let prefix = new Array();

    /** add a log to indicate the postfix expression that is being converted to prefix */
    animationsArr.push([updateLogSection, ["Convert Postfix: '" + expression + "' to Prefix", "blue-background"]]);

    /** Run a for-loop to process each character of the expression */
    for (let i = 0; i < expression.length; i++) {
        /** the current character of the expression */
        let ch = expression[i];

        /** display the current character */
        animationsArr.push([updateCurrentExpression, [ch]]);

        /** If the character is any operator (+, -, *, /, %, ^) we simultaneously pop out two elements of the prefix stack and store them in variables.
         * The first element that pops out will be value2 and the second element that pops out will be value1.
         * Since, in the prefix expression the order of arrangement is: operator + value1 + value2 . So, we do the same and concatenate all three popped out elements in the same order and push it in the prefix stack.
         */
        if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%' || ch == '^') {
            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["prefix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["prefix-stack"]]);
            let value2 = prefix.pop();

            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["prefix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["prefix-stack"]]);
            let value1 = prefix.pop();

            let resultValue = ch + value1 + value2;

            prefix.push(resultValue);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["prefix-stack", resultValue]]);
            animationsArr.push([setTdTagColor, ["prefix-stack", "red-background"]]);
        }
        /** If the character is a letter/number then we push this character into the prefix stack. */
        else {
            prefix.push(ch);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["prefix-stack", ch]]);
            animationsArr.push([setTdTagColor, ["prefix-stack", "red-background"]]);
        }
    }

    /** Pop the conversion result from the prefix stack and store it a variable*/
    animationsArr.push([setTdTagColor, ["prefix-stack", "green-background"]]);
    animationsArr.push([popFromStack, ["prefix-stack"]]);
    let prefixAnswer = prefix.pop();

    /** display the result */
    animationsArr.push([setResultExpression, ["Postfix: <b>" + expression + "</b><br>Prefix: <b>" + prefixAnswer + "</b>"]]);

    /** add a log displaying the result of the conversion */
    animationsArr.push([updateLogSection, ["Converted Postfix: '" + expression + "' to Prefix: '" + prefixAnswer + "'", "blue-background"]]);

    return animationsArr; // return the array with the animation functions and their respective args
}
