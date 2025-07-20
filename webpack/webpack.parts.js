import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";

export const page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { title }
        }),
    ],
});

// CSS inlined in the javascript bundle
export const loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ] // styleLoader(cssLoader(input))
            }
        ]
    }
});

// CSS extracted to a separate file
// Useful for production builds to reduce the size of the JS bundle
// Avoids the FOUC problem. The browser doesn’t wait for JavaScript to get styling information
// Separating CSS from JavaScript also improves caching behavior and removes a potential attack vector
export const extractCSS = ({ options = {} } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options,
                    },
                    "css-loader",
                    // {
                    //     loader: "css-loader",
                    //     options: {
                    //         modules: true, // CSS Modules
                    //     },
                    // }
                ],
                sideEffects: true, // This file has side effects and should not be tree-shaken
            }
        ]
    },
    plugins: [
        new ExtractCssChunks({
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css",
        }),
    ],
});