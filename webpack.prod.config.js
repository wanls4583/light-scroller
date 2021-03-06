var path = require('path');
var uglify = require('uglifyjs-webpack-plugin');

// 拼接我们的工作区路径为一个绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devtool: '#source-map',
    entry: {
        'scroll': './index.js',
    },
    output: {
        // 编译输出的根路径
        path: resolve('dist'),
        // 编译输出的文件名
        filename: '[name].min.js',
    },
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015'] //兼容ie8
            },
            include: [resolve('src'), resolve('test')]
        },{
            test:/\.css$/,
            use:['style-loader','css-loader']
        }]
    },
    plugins: [
        new uglify({
             sourceMap: true
        })
    ]
}