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
 * Convert the given postfix expression to its infix form
 * @param {String} expression The expression to convert
 * @returns {Array} An array of animation functions with their respective args used to animate the postfix to infix conversion
 */
export default function postfixToInfix(expression) {
    /** reset the animation array */
    animationsArr = new Array();

    /** the infix stack (rear-end is the top of the stack) */
    let infix = new Array();

    /** add a log to indicate the postfix expression that is being converted to infix */
    animationsArr.push([updateLogSection, ["Convert Postfix: '" + expression + "' to Infix", "blue-background"]]);

    /** Run a for-loop to process each character of the expression */
    for (let i = 0; i < expression.length; i++) {
        /** the current character of the expression */
        let ch = expression[i];

        /** display the current character */
        animationsArr.push([updateCurrentExpression, [ch]]);

        /** If the character is any operator (+, -, *, /, %, ^) we simultaneously pop out two elements of the infix stack and store them in variables.
         * The first element that pops out will be value1 and the second element that pops out will be value2.
         * Since, in the infix expression the order of arrangement is: value1 + operator + value2 . So, we do the same and concatenate all three popped out elements in the same order and push it in the infix stack.
         */
        if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%' || ch == '^') {
            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["infix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["infix-stack"]]);
            let value1 = infix.pop();

            /** animation for the stack pop */
            animationsArr.push([setTdTagColor, ["infix-stack", "green-background"]]);
            animationsArr.push([popFromStack, ["infix-stack"]]);
            let value2 = infix.pop();

            let resultValue = "(" + value2 + ch + value1 + ")";

            infix.push(resultValue);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["infix-stack", resultValue]]);
            animationsArr.push([setTdTagColor, ["infix-stack", "red-background"]]);
        }
        /** If the character is a letter/number then we push this character into the infix stack. */
        else {
            infix.push(ch);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["infix-stack", ch]]);
            animationsArr.push([setTdTagColor, ["infix-stack", "red-background"]]);
        }
    }

    /** Pop the conversion result from the infix stack and store it a variable*/
    animationsArr.push([setTdTagColor, ["infix-stack", "green-background"]]);
    animationsArr.push([popFromStack, ["infix-stack"]]);
    let infixAnswer = infix.pop();

    /** display the result */
    animationsArr.push([setResultExpression, ["Postfix: <b>" + expression + "</b><br>Infix: <b>" + infixAnswer + "</b>"]]);

    /** add a log displaying the result of the conversion */
    animationsArr.push([updateLogSection, ["Converted Postfix: '" + expression + "' to Infix: '" + infixAnswer + "'", "blue-background"]]);

    return animationsArr; // return the array with the animation functions and their respective args
}