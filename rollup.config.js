// rollup.config.js
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

import reactTable from 'react-table'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    // pass custom options to the resolve plugin
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    typescript({ module: 'CommonJS' }),
    commonjs({
      extensions: ['.js', '.ts'],
      namedExports: {
        'react-table': Object.keys(reactTable)
      }
    }),
    postcss({
      extract: `dist/${pkg.name}.css`
    })
  ],
  // indicate which modules should be treated as external
  external: ['react', 'react-dom', 'formik', 'reactstrap', 'bootstrap']
};