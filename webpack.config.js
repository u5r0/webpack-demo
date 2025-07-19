import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";

export default (env) => ({
    entry: "./src/index.js",
    mode: env.mode || "development",
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { 
                title: "My App", 
            } 
        }),
    ],
});