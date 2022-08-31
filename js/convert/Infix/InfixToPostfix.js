"use strict"

import precedence from "./OperatorPrecedence.js";
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
 * Convert the given infix expression to its postfix form
 * @param {String} expression The expression to convert
 * @returns {Array} An array of animation functions with their respective args used to animate the infix to postfix conversion
 */
export default function infixToPostfix(expression) {
    /**
     * We will take two stacks one for operator and the other for the postfix expression.
     * Now while scanning the expression, as soon as we get an operand we push that in the postfix stack.
     * If we get an opening bracket while scanning the expression, we push that in the operator stack.
     * If we get a closing bracket while scanning the expression, we pop out the items of the operator stack until we get an opening bracket. And as soon as we get an opening bracket we pop that out too.
     * If an operator comes then all the operators in the operator stack with greater or equal precedence get popped out until we get an opening bracket or the operator stack empties out. And then we push our current operator in our stack.
     * And whenever an operator is popped out then at the same time two elements are also popped out from the postfix stack. 
     * The element that is popped first out of postfix stack will be considered value 2 and element which is popped out second will be considered as value 1.
     * Using the three elements i.e. value1, value2 and operator in above step, we push a newer string in the postfix stack
     * In the postfix stack, newer strings will be arranged as: value1 + value2 + operator.
     */

    /** reset the animation array */
    animationsArr = new Array();

    /** the postfix stack (rear-end is the top of the stack) */
    let postfix = new Array();
    /** the operators stack (rear-end is the top of the stack) */
    let operators = new Array();

    /** add a log to indicate the infix expression that is being converted to postfix */
    animationsArr.push([updateLogSection, ["Convert Infix: '" + expression + "' to Postfix", "blue-background"]]);

    /** Run a for-loop to process each character of the expression */
    for (let i = 0; i < expression.length; i++) {
        /** the current character of the expression */
        let ch = expression[i];

        /** display the current character */
        animationsArr.push([updateCurrentExpression, [ch]]);

        /** If the character is "(" then we push this character into the operator stack. */
        if (ch == '(') {
            operators.push(ch);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["operators-stack", ch]]);
            animationsArr.push([setTdTagColor, ["operators-stack", "red-background"]]);
        }
        /** if the character is letter/number then we push the character onto the postfix stack */
        else if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            postfix.push(ch);
            /** animation for the stack push */
            animationsArr.push([pushOnStack, ["postfix-stack", ch]]);
            animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);

        }
        /**
         * If the character is any operator (+, -, *, /, %, ^) then we run a while loop and pop out the elements of operator stack until we get "("or an operator with smaller precedence at the top of operator stack, making sure that at any time the stack is not empty.
         * While popping the elements out of the operator stack, we simultaneously pop out two elements of the postfix stack and store them in variables.
         * The first element that pops out will be value2 and the second element that pops out will be value1.
         * Since, in the postfix expression the order of arrangement is: value1 + value2 + operator. So, we do the same and concatenate all three popped out elements in the same order and push it in the postfix stack.
         */
        else if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%' || ch == '^') {
            while (operators.length > 0
                && operators[operators.length - 1] != '('
                && precedence(ch) <= precedence(operators[operators.length - 1])) {

                /** animation for the stack pop */
                animationsArr.push([setTdTagColor, ["operators-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["operators-stack"]]);
                let op = operators.pop();

                /** animation for the stack pop */
                animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["postfix-stack"]]);
                let value2 = postfix.pop();


                animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["postfix-stack"]]);
                let value1 = postfix.pop();

                let resultValue = value1 + value2 + op;

                postfix.push(resultValue);
                animationsArr.push([pushOnStack, ["postfix-stack", resultValue]]);
                animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);
            }

            /** When we move out of the above while-loop we push the ch into the operator stack. */
            operators.push(ch);
            animationsArr.push([pushOnStack, ["operators-stack", ch]]);
            animationsArr.push([setTdTagColor, ["operators-stack", "red-background"]]);
        }
        /**
         * If the character is ")" then we run a while loop and pop out the elements of operator stack until we get "(" at the top of operator stack.
         * While popping the elements out of the operator stack, we simultaneously pop out two elements of the postfix stack and store them in variables.
         * The first element that pops out will be value2 and the second element that pops out will be value1.
         * Since, in the postfix expression the order of arrangement is: value1 + value2 + operator. So, we do the same and concatenate all three popped out elements in the same order and push it in the postfix stack.
         */
        else if (ch == ')') {
            while (operators.length > 0 && operators[operators.length - 1] != '(') {

                animationsArr.push([setTdTagColor, ["operators-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["operators-stack"]]);
                let op = operators.pop();


                animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["postfix-stack"]]);
                let value2 = postfix.pop();


                animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["postfix-stack"]]);
                let value1 = postfix.pop();

                let resultValue = value1 + value2 + op;

                postfix.push(resultValue);
                animationsArr.push([pushOnStack, ["postfix-stack", resultValue]]);
                animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);
            }

            /** When we move out of the above while-loop, the top element is "(" so we perform pop operation once more on operator stack. */
            if (operators.length > 0) {
                animationsArr.push([setTdTagColor, ["operators-stack", "green-background"]]);
                animationsArr.push([popFromStack, ["operators-stack"]]);
                operators.pop();
            }
        }
    }

    /** 
     * Empty out the operator stack in case it's not.
     * We pop out the operator out of the operator stack, making sure that at any time the stack is not empty.
     * After popping out the operator we store it in a character op and simultaneously pop out 2 elements of the postfix stack and store these in value2 and value1 respectively.
     * In the postfix expression, the order of arrangement is: value1 + value2 + operator. So, we do the same and concatenate all three popped out elements in the same order and push it in the postfix stack.
     * The loop runs until the operator stack is not empty. 
     */
    while (operators.length > 0) {

        animationsArr.push([setTdTagColor, ["operators-stack", "green-background"]]);
        animationsArr.push([popFromStack, ["operators-stack"]]);
        let op = operators.pop();


        animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
        animationsArr.push([popFromStack, ["postfix-stack"]]);
        let value2 = postfix.pop();


        animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
        animationsArr.push([popFromStack, ["postfix-stack"]]);
        let value1 = postfix.pop();

        let resultValue = value1 + value2 + op;

        postfix.push(resultValue);
        animationsArr.push([pushOnStack, ["postfix-stack", resultValue]]);
        animationsArr.push([setTdTagColor, ["postfix-stack", "red-background"]]);
    }

    /** Pop the conversion result from the postfix stack and store it a variable*/
    animationsArr.push([setTdTagColor, ["postfix-stack", "green-background"]]);
    animationsArr.push([popFromStack, ["postfix-stack"]]);
    let postfixAnswer = postfix.pop();

    /** display the result */
    animationsArr.push([setResultExpression, ["Infix: <b>" + expression + "</b><br>Postfix: <b>" + postfixAnswer + "</b>"]]);

    /** add a log displaying the result of the conversion */
    animationsArr.push([updateLogSection, ["Converted Infix: '" + expression + "' to Postfix: '" + postfixAnswer + "'", "blue-background"]]);

    return animationsArr; // return the array with the animation functions and their respective args
}