const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');

// CSS is built separately by PostCSS/Tailwind (see "build:css" in package.json).
// It is not injected from JS: that touched `document` at import time (breaking SSR).

module.exports = [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Automatically externalize peerDependencies
      peerDepsExternal(),
      
      // Handle JSON files
      json(),
      
      // Resolve node_modules
      resolve({
        extensions: ['.js', '.jsx']
      }),
      
      // Convert CommonJS modules to ES6
      commonjs(),
      
      // Transpile with Babel for JS/JSX files
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        extensions: ['.js', '.jsx'],
      }),
      
      // Minify bundle
      terser(),
    ],
    // Indicate which modules should be treated as external
    external: [
      'react',
      'react-dom',
    ],
  },
];