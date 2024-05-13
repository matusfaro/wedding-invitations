const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
            {
                host: '0.0.0.0',
                hot: false,
                inline: false,
                contentBase: './dist',
                open: false
            }
    }
)
