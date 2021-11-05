//webpack will help transpile our code
const path = require('path');
const webpack = require('webpack');

//we define our only export which is a js object
//that contains our configuration for webpack
//ES5 syntax
module.exports = {
    //entry point for webpack which will be index.js
    // because it will import all the others
    entry: './src/index.js',
    //we will have webpack in dev mode
    mode: 'development',
    //now we specify the rules for how
    //webpack will transform our code
    //webpack uses loaders to transform code in some way
    //we need to have it in a moudule
    module: {
        rules: [
            {
                //role to transform our ES6 code to browser readable js
                //regex
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                //babel/env knows about our react
                options: { presets: ["@babel/env"]}
            },
            {
                //style and css loader would help us
                //to help us import css file as we have in our app.js
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', 'jsx']},
    output: {
        //the folder dist would not be visible
        //because webpack would create it,
        //store it and serve it directly from memory
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    //def for our dev server which allow us to view things in the browser
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true
    },
     plugins: [new webpack.HotModuleReplacementPlugin()]
};
//now we can serve our app by
//$ npx webpack-dev-server --mode development