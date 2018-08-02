import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [{
    format: 'iife',
    name: 'NC',
    file: 'dist/index.iife.js'
  }, {
    format: 'umd',
    name: 'NC',
    file: 'dist/index.umd.js'
  }, {
    format: 'cjs',
    file: 'dist/index.js'
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}