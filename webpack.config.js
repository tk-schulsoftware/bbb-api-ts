const path = require('path')

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    library: 'bigbluebutton',
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser.js',
  },
}
