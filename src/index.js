const prune = (number, precision = 12) => +number.toPrecision(precision)

const _fractionLength = number => {
  const eSplit = number.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - (eSplit[1] || 0)
  return len > 0 ? len : 0
}

const _floatToInt = number => {
  let n = number.toString().toLowerCase()
  if (!n.includes('e')) {
    return +(n.replace('.', ''))
  }
  return number * (10 ** _fractionLength(number))
}

const _checkBoundary = number => {
  if (!Number.isSafeInteger(number)) {
    console.warn(`${number} is beyond boundary when transfer to integer, the results may not be accurate`)
  }
}

const multiply = (number1, number2) => {
  const intedNumber1 = _floatToInt(number1)
  const intedNumber2 = _floatToInt(number2)
  const base = 10 ** (_fractionLength(number1) + _fractionLength(number2))
  _checkBoundary(intedNumber1)
  _checkBoundary(intedNumber2)
  _checkBoundary(base)

  const res = intedNumber1 * intedNumber2
  _checkBoundary(res)
  return res / base
}

const add = (number1, number2) => {
  const base = 10 ** (Math.max(_fractionLength(number1), _fractionLength(number2)))
  _checkBoundary(base)
  return (multiply(number1, base) + multiply(number2, base)) / base
}

const subtract = (number1, number2) => {
  return add(number1, -number2)
}

const divide = (number1, number2) => {
  return multiply(number1, 1 / number2)
}

export default {
  prune,
  multiply,
  add,
  subtract,
  divide
}