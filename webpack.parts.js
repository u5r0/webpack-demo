import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";

export const page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ 
            context: { title }
        }),
    ],
});