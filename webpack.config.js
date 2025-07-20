import { merge } from "webpack-merge";
import * as parts from "./webpack.parts.js";

const commonConfig = merge([
    { entry: ["./src/index.js"] },
    parts.page({ title: "My App" })
]);

const devConfig = merge([
    { mode: "development" },
]);
const productionConfig = merge([
    { mode: "production" },
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