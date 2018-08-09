import test from 'ava'
import NC from '../dist/index'

test('fractionLength', t => {
  t.true(NC.fractionLength(1.23e-1) === 3)
  t.true(NC.fractionLength(1.23e-7) === 9)
  t.true(NC.fractionLength(1.23) === 2)
  t.true(NC.fractionLength(1.23e+3) === 0)
  t.true(NC.fractionLength(1.23e+13) === 0)
  t.true(NC.fractionLength(1.23e+21) === -19)
})

test('replaceDotToSpace', t => {
  t.true(NC.replaceDotToSpace(1.001) === 1001)
  t.true(NC.replaceDotToSpace(1.001e-1) === 1001)
  t.true(NC.replaceDotToSpace(1.001e-7) === 1001)
  t.true(NC.replaceDotToSpace(1.001e+1) === 1001)
  t.true(NC.replaceDotToSpace(1.001e+5) === 100100)
  t.true(NC.replaceDotToSpace(1.001e+21) === 1001)
})

test('checkBoundary', t => {
  t.truthy(NC.checkBoundary(Number.MAX_SAFE_INTEGER))
  t.falsy(NC.checkBoundary(Number.MAX_SAFE_INTEGER + 1))
})

test('add', t => {
  t.true(NC.add(0.1, 0.2) === 0.3)
  t.true(NC.add(2.3, 2.4) === 4.7)
  t.true(NC.add(1.001, -0.001) === 1)
  t.true(NC.add(1.001e-28, 1.001e-28) === 2.002e-28)

  t.true(NC.add(1.0001, 100) === 101.0001)
})

test('subtract', t => {
  t.true(NC.subtract(0.3, 0.2) === 0.1)
  t.true(NC.subtract(0.300001, 0.2000001) === 0.1000009)
  t.true(NC.subtract(123456789.9876543, 1234.1234567) === 123455555.8641976)
})

test('multiply', t => {
  t.true(NC.multiply(0.097, 100) === 9.7)
  t.true(NC.multiply(0.1, 0.2) === 0.02)
  t.true(NC.multiply(1.1, 1.1) === 1.21)
})

test('divide', t => {
  t.true(NC.divide(1.21, 1.1) === 1.1)
})

test('prune', t => {
  t.true(NC.prune(0.09999999999999998) === 0.1)
  t.true(NC.prune(1.0000000000000001) === 1)
  t.true(NC.prune(0.09999999999999998, 8) === 0.1)
})