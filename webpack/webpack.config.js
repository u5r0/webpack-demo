import { merge } from "webpack-merge";
import * as parts from "./webpack.parts.js";

/**
 * If you don’t prefer to maintain references to (styling) through (JavaScript) imports,
 * an alternative is to handle them through an entry. 
 * You have to be careful with style ordering in this case, though.
 */
const commonConfig = merge([
    {
        entry: {
            main: [
                "./src/index.js",
                "./src/style/index.css",
            ]
        },
    },
    parts.page({ title: "My App" }),
    parts.extractCSS(),
]);

const productionConfig = merge([
    { mode: "production" },
]);

const devConfig = merge([
    { mode: "development" },
]);

const getConfig = (mode) => {
    switch (mode) {
        case "production":
            return merge([commonConfig, productionConfig]);
        default:
            return merge([commonConfig, devConfig]);
    }
};

export default (env) => getConfig(env.mode);