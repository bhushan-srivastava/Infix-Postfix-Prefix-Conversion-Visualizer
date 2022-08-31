"use strict"

/** stores the different operators */
const operatorsArr = ['+', '-', '*', '/', '%', '^'];

/**
 * Check if the given expression is a valid infix expression 
 * @param {String} expression The expression to check
 * @returns {Boolean} true if the given expression is a valid infix expression
 */
function isInfix(expression) {
    /** if the expression is a single character then it must be a letter/number to be a valid infix expression */
    if (expression.length == 1) {
        let ch = expression;
        if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            return true;
        }
    }

    /** store the last character of the expresion */
    let lastChar = expression[expression.length - 1];
    /** store the second last character of the expression */
    let secondLastChar = expression[expression.length - 2];

    /** if the last character is a letter/number and the second last character is an operator then it is a valid infix expression */
    if (
        ((lastChar >= '0' && lastChar <= '9')
            || (lastChar >= 'a' && lastChar <= 'z')
            || (lastChar >= 'A' && lastChar <= 'Z'))
        &&
        operatorsArr.includes(secondLastChar)) {
        return true;
    }
    /** if both the last and the second last character are closing brackets then it is a valid infix expression */
    else if (lastChar == ')' && secondLastChar == ')') {
        return true;
    }
    /** if the last character is a closing bracket and the second last character is a letter/number then it is a valid infix expression */
    else if (
        lastChar == ')'
        &&
        ((secondLastChar >= '0' && secondLastChar <= '9')
            || (secondLastChar >= 'a' && secondLastChar <= 'z')
            || (secondLastChar >= 'A' && secondLastChar <= 'Z'))) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Check if the given expression is a valid postfix expression 
 * @param {String} expression The expression to check
 * @returns {Boolean} true if the given expression is a valid postfix expression
 */
function isPostfix(expression) {
    /** if the expression is a single character then it must be a letter/number to be a valid postfix expression */
    if (expression.length == 1) {
        let ch = expression;
        if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            return true;
        }
    }

    /** store the first character of the expression */
    let firstChar = expression[0];
    /** store the last character of the expression */
    let lastChar = expression[expression.length - 1];

    /** if the first character is a letter/number and the last character is an operator then it is a valid postfix expression */
    if (
        ((firstChar >= '0' && firstChar <= '9')
            || (firstChar >= 'a' && firstChar <= 'z')
            || (firstChar >= 'A' && firstChar <= 'Z'))
        &&
        operatorsArr.includes(lastChar)) {
        return true;
    }
    return false;
}

/**
 * Check if the given expression is a valid prefix expression 
 * @param {String} expression The expression to check
 * @returns {Boolean} true if the given expression is a valid prefix expression
 */
function isPrefix(expression) {
    /** if the expression is a single character then it must be a letter/number to be a valid prefix expression */
    if (expression.length == 1) {
        let ch = expression;
        if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            return true;
        }
    }

    /** store the first character of the expression */
    let firstChar = expression[0];
    /** store the last character of the expresion */
    let lastChar = expression[expression.length - 1];
    /** store the second last character of the expression */
    let secondLastChar = expression[expression.length - 2];

    /** if the first character is an expression and the both the last and the second last characters are letters/numbers then it is a valid prefix expression */
    if (operatorsArr.includes(firstChar)
        &&
        ((lastChar >= '0' && lastChar <= '9')
            || (lastChar >= 'a' && lastChar <= 'z')
            || (lastChar >= 'A' && lastChar <= 'Z'))
        &&
        ((secondLastChar >= '0' && secondLastChar <= '9')
            || (secondLastChar >= 'a' && secondLastChar <= 'z')
            || (secondLastChar >= 'A' && secondLastChar <= 'Z'))) {
        return true;
    }
    return false;
}

export { isInfix, isPostfix, isPrefix };