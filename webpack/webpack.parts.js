import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";

export const page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { title }
        }),
    ],
});

export const loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            }
        ]
    }
});