"use strict"

/**
 * Return the precedence of the given operator
 * @param {String} op The operator whose precedence is to be returned
 * @returns {Number} A number from ranging 1 to 3 denonting the precendece of the given operator
 */
export default function precedence(op) {
    if (op == '+') {
        return 1;
    }
    else if (op == '-') {
        return 1;
    }
    else if (op == '*') {
        return 2;
    }
    else if (op == '/') {
        return 2;
    }
    else if (op == '%') {
        return 2;
    }
    else if (op == '^') {
        return 3;
    }
}