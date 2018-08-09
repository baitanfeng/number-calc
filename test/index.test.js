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

test('add', t => {
  t.true(NC.add(0.1, 0.2) === 0.3)
  t.true(NC.add(2.3, 2.4) === 4.7)
  t.true(NC.add(1.001, -0.001) === 1)
  t.true(NC.add(1.001e+12, 0.00001) === 1001000000000.00001)
})