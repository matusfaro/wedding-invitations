const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
            {
                hot: false,
                inline: false,
                contentBase: './dist',
                open: false
            }
    }
)
