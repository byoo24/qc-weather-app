const path = require('path');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'bundle.js'
    }
};