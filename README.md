# number-calc [![npm version](https://badge.fury.io/js/number-calc.svg)](http://badge.fury.io/js/number-calc) [![Build Status](https://travis-ci.org/otfngo/number-calc.svg)](https://travis-ci.org/otfngo/number-calc) [![codecov](https://codecov.io/gh/otfngo/number-calc/branch/master/graph/badge.svg)](https://codecov.io/gh/otfngo/number-calc)

Calculate addition, subtraction, multiplication, and division precisely using JS

### Why

```js
0.1 + 0.2 = 0.30000000000000004
1.0 - 0.9 = 0.09999999999999998
1.1 * 1.1 = 1.2100000000000002
1.21 / 1.1 = 1.0999999999999999
```

### Install

```
npm install --save number-calc
```

### Methods

```js
NC.add(number1, number2) // addition, number1 + number2
NC.subtract(number1, number2) // subtraction, number1 - number2
NC.multiply(number1, number2) // multiplication, number1 * number2
NC.divide(number1, number2) // division, number1 / number2
NC.prune(number, precision) // prune, precision defaults to 12
```

### Usage

```js
import NC from 'number-calc'

NC.add(0.1, 0.2) // 0.3, not 0.30000000000000004
NC.subtract(1.0, 0.9) // 0.1, not 0.09999999999999998
NC.multiply(1.1, 1.1) // 1.21, not 1.2100000000000002
NC.divide(1.21, 1.1) // 1.1, not 1.0999999999999999
NC.prune(0.30000000000000004) // 0.3
```

### License

MIT
