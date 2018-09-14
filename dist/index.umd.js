(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.NC = factory());
}(this, (function () { 'use strict';

  /**
   * 计算数值小数位的长度
   *
   * * fractionLength(1.001) => 3
   * * fractionLength(1.001e-7) => 10
   */
  var fractionLength = function fractionLength(number) {
    var eSplit = number.toString().split(/[eE]/);
    return (eSplit[0].split('.')[1] || '').length - (eSplit[1] || 0);
  };

  /**
   * 替换数值的点号，放大数值
   *
   * * replaceDotToSpace(1.001) => 1001
   * * replaceDotToSpace(1.001e-7) => 1001
   */
  var replaceDotToSpace = function replaceDotToSpace(number) {
    var eSplit = number.toString().split(/[eE]/);
    return +eSplit[0].replace('.', '');
  };

  var checkBoundary = function checkBoundary(number) {
    if (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
      console.warn(number + ' is beyond boundary, the final result may not be accurate');
      return false;
    }
    return true;
  };

  /**
   * 加法函数，用来得到精确的加法结果
   *
   * 说明：js 的加法运算会有误差，在两个浮点数相加的时候会比较明显。
   * 这个函数返回较为精确的加法结果
   *
   * * 0.1 + 0.2 = 0.30000000000000004
   * * add(0.1, 0.2) = 0.3
   */
  var add = function add(number1, number2) {
    var len1 = fractionLength(number1);
    var len2 = fractionLength(number2);

    var base = Math.pow(10, Math.max(len1, len2));
    var diff = Math.pow(10, Math.abs(len1 - len2));

    number1 = replaceDotToSpace(number1);
    number2 = replaceDotToSpace(number2);

    len1 > len2 ? number2 *= diff : number1 *= diff;
    var res = number1 + number2;

    checkBoundary(number1);
    checkBoundary(number2);
    checkBoundary(res);

    return res / base;
  };

  /**
   * 减法函数，用来得到精确的减法结果
   *
   * 说明：js 的减法运算会有误差，在两个浮点数相减的时候会比较明显。
   * 这个函数返回较为精确的减法结果
   *
   * * 0.3 - 0.2 = 0.09999999999999998
   * * subtract(0.3, 0.2) = 0.1
   */
  var subtract = function subtract(number1, number2) {
    return add(number1, -number2);
  };

  /**
   * 乘法函数，用来得到精确的乘法结果
   *
   * 说明：js 的乘法运算会有误差，在两个浮点数相乘的时候会比较明显。
   * 这个函数返回较为精确的乘法结果
   *
   * * 0.097 * 100 = 9.700000000000001
   * * multiply(0.097, 100) = 9.7
   */
  var multiply = function multiply(number1, number2) {
    var len1 = fractionLength(number1);
    var len2 = fractionLength(number2);

    var base = Math.pow(10, len1 + len2);

    number1 = replaceDotToSpace(number1);
    number2 = replaceDotToSpace(number2);

    var res = number1 * number2;

    checkBoundary(number1);
    checkBoundary(number2);
    checkBoundary(res);

    return res / base;
  };

  /**
   * 除法函数，用来得到精确的除法结果
   *
   * 说明：js 的除法运算会有误差，在两个浮点数相除的时候会比较明显。
   * 这个函数返回较为精确的除法结果
   *
   * * 1.21 / 1.1 = 1.0999999999999999
   * * divide(1.21, 1.1) = 1.1
   */
  var divide = function divide(number1, number2) {
    var len1 = fractionLength(number1);
    var len2 = fractionLength(number2);

    var base = Math.pow(10, len1 - len2);

    number1 = replaceDotToSpace(number1);
    number2 = replaceDotToSpace(number2);

    var res = number1 / number2;

    checkBoundary(number1);
    checkBoundary(number2);
    checkBoundary(res);

    return res / base;
  };

  /**
   * 修正函数，用来得到精确的修正结果
   *
   * 说明：修正到 12 位精度，若需要更高/低精度，可传精度值
   *
   * * 0.3 - 0.2 = 0.09999999999999998
   * * prune(0.3 - 0.2) = 0.1
   */
  var prune = function prune(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
    return +number.toPrecision(precision);
  };

  var index = {
    fractionLength: fractionLength,
    replaceDotToSpace: replaceDotToSpace,
    checkBoundary: checkBoundary,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    prune: prune
  };

  return index;

})));
