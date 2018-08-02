var NC = (function () {
  'use strict';

  var strip = function strip(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
    return +number.toPrecision(precision);
  };

  var index = {
    strip: strip
  };

  return index;

}());
