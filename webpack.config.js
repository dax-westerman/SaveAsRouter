const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    return {
      mode: isDev ? 'development' : 'production',
      entry: {
        background: './src/background.js',
        content: './src/content.js',
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
      },
      devtool: isDev ? 'inline-source-map' : 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: 'src/manifest.json', to: '.' },
            { from: 'src/config.json', to: '.' },
            { from: 'resources/icons', to: 'icons' },
            { from: 'src/action', to: 'action' },
          ],
        }),
      ],
      experiments: {
        outputModule: true,
      },
      resolve: {
        extensions: ['.js'],
      },
    };
};
