const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        background: './background.js',
        content: './content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    experiments: {
        outputModule: true
    },
    resolve: {
        extensions: ['.js']
    }
};
