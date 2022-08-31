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
 * Convert the given prefix expression to its postfix form
 * @param {String} expression The expression to convert
 * @returns {Array} An array of animation functions with their respective args used to animate the prefix to postfix conversion
 */
export default function prefixToPostfix(expression) {
    /** reset the animation array */
    animationsArr = new Array();

    /** the postfix stack (rear-end is the top of the stack) */
    let postfix = new Array();

    /** add a log to indicate the prefix expression that is being converted to postfix */
    animationsArr.push([updateLogSection, ["Convert Prefix: '" + expression + "' to Postfix", "blue-background"]]);

    /** Run a for-loop to process each character of the expression */
    for (let i = expression.length - 1; i >= 0; i--) {
        /** the current character of the expression */
        let ch = expression[i];

        /** display the current character */
        animationsArr.push([updateCurrentExpression, [ch]]);

        /** If the character is any operator (+, -, *, /, %, ^) we simultaneously pop out two elements of the postfix stack and store them in variables.
         * The first element that pops out will be value1 and the second element that pops out will be value2.
         * Since, in the postfix expression the order of arrangement is: value1 + value2 + operator. So, we do the same and concatenate all three popped out elements in the same order and push it in the postfix stack.
         */
        if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%' || ch == '^') {
            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["postfix-stack"]]);
            let value1 = postfix.pop();

            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["postfix-stack"]]);
            let value2 = postfix.pop();

            let resultValue = value1 + value2 + ch;

            postfix.push(resultValue);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["postfix-stack", resultValue]]);
            animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);

        }
        /** If the character is a letter/number then we push this character into the postfix stack. */
        else {
            postfix.push(ch);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["postfix-stack", ch]]);
            animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);

        }
    }

    /** Pop the conversion result from the postfix stack and store it a variable*/
    animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
    animationsArr.push([popFromStack, ["postfix-stack"]]);
    let postfixAnswer = postfix.pop();

    /** display the result */
    animationsArr.push([setResultExpression, ["Prefix: <b>" + expression + "</b><br>Postfix: <b>" + postfixAnswer + "</b>"]]);

    /** add a log displaying the result of the conversion */
    animationsArr.push([updateLogSection, ["Converted Prefix: '" + expression + "' to Postfix: '" + postfixAnswer + "'", "blue-background"]]);

    return animationsArr; // return the array with the animation functions and their respective args
}