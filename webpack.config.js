var path= require('path');
console.log(path.join(__dirname, 'public'));
module.exports={
    entry:'./front.js',
    output:{
        path: path.join(__dirname, 'public'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            loader:'babel-loader',
            test: /\.js$/,
            exclude:/node_modules/
        }]
    },
    mode: 'development',
    devServer:{
        contentBase:path.join(__dirname, 'public')
    }
}