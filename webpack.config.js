const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // Set to 'development' for development mode
  entry: './static/js/index.js',
  resolve: {
    alias: {
      'static': path.resolve(__dirname, 'static') // Maps '/static/foo.js' to '<project-root>/static/foo.js'
    }
  },
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
