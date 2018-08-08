var NC = (function () {
  'use strict';

  var prune = function prune(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
    return +number.toPrecision(precision);
  };

  var _digitLength = function _digitLength(number) {
    var eSplit = number.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - (eSplit[1] || 0);
    return len > 0 ? len : 0;
  };

  var _floatToInt = function _floatToInt(number) {
    var n = number.toString().toLowerCase();
    if (!n.includes('e')) {
      return +n.replace('.', '');
    }
    return number * Math.pow(10, _digitLength(number));
  };

  var _checkBoundary = function _checkBoundary(number) {
    if (!Number.isSafeInteger(number)) {
      console.warn(number + ' is beyond boundary when transfer to integer, the results may not be accurate');
    }
  };

  var multiply = function multiply(number1, number2) {
    var intedNumber1 = _floatToInt(number1);
    var intedNumber2 = _floatToInt(number2);
    var base = Math.pow(10, _digitLength(number1) + _digitLength(number2));
    _checkBoundary(intedNumber1);
    _checkBoundary(intedNumber2);
    _checkBoundary(base);

    var res = intedNumber1 * intedNumber2;
    _checkBoundary(res);
    return res / base;
  };

  var add = function add(number1, number2) {
    var base = Math.pow(10, Math.max(_digitLength(number1), _digitLength(number2)));
    _checkBoundary(base);
    return (multiply(number1, base) + multiply(number2, base)) / base;
  };

  var subtract = function subtract(number1, number2) {
    return add(number1, -number2);
  };

  var divide = function divide(number1, number2) {
    return multiply(number1, 1 / number2);
  };

  var index = {
    prune: prune,
    multiply: multiply,
    add: add,
    subtract: subtract,
    divide: divide
  };

  return index;

}());
