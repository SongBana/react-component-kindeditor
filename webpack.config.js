var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'myReactComponent', 'src', 'MyReactComponent.jsx'),
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            include: [
                path.join(__dirname, 'myReactComponent')
            ]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'myReactComponent')
    }
}
