import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { title }
        }),
    ],
});

export const loadImages = ({ limit = 8 * 1024 } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: limit
                    }
                }
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../", // <-- This is required!
                            ...options,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    }
                ],
                sideEffects: true, // This file has side effects and should not be tree-shaken
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css",
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
