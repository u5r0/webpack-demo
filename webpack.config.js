import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";
// import { WebpackPluginServe } from "webpack-plugin-serve";

export default (env) => ({
    entry: "./src/index.js",
    mode: env.mode || "development",
    // watch: true,
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { 
                title: "My App", 
            } 
        }),
        // new WebpackPluginServe({
        //     port: parseInt(process.env.PORT, 10) || 8080,
        //     static: "./dist",
        //     liveReload: true,
        //     waitForBuild: true,
        //     hmr: true,
        // }),
    ],
});