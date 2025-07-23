import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";

export const page = ({ title }) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: { title },
    }),
  ],
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
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
        sideEffects: true, // This file has side effects and should not be tree-shaken
      },
    ],
  },
  plugins: [
    new ExtractCssChunks({
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
        use: ["style-loader", "css-loader"], // styleLoader(cssLoader(input))
      },
    ],
  },
});

// Rules default order: pre, normal, inline, post
const moduleOfRules = {
  rules: [
    {
      test: /\.css$/,
      // enforce: "post",
      use: ({ resource, resourceQuery, issuer }) => {
        if (env === "production") {
          return [
            (info) => ({
              loader: "style-loader",
            }),
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                presets: ["postcss"],
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              // assert: { type: "json" },
              with: { type: 'json' },
              loader: import.meta.resolve("./loader-json.js"),
            },
          ]; // 4 useEntries
        }
        return []; // 0 useEntries
      },
    },
    {
      test: /\.css$/,
      oneOf: [
        {
          resourceQuery: /url/, // foo.css?url
          type: "asset/url",
        },
        {
          resourceQuery: /query/, // foo.css?query
          type: "asset/resource",
        },
      ],
      sideEffects: true,
    },
    {
      issuer: { not: /\.js$/ },
      use: "style-loader",
    },
    {
      /**
       * If you supply a Rule.test, Rule.include or Rule.exclude,
       * you cannot also supply a Rule.resource
      */
     
      realResource: /inline/, // path/foo.inline.js and path/bar.png?inline
      // resource: /inline/, // path/foo.inline.js and path/bar.png?inline
      resourcePath: /inline/, // path/foo.inline.png
      resourceQuery: /inline/, // path/foo.png?inline

      compiler: "webpack", // can be undefined
      include: [
        // include any paths relative to the current directory starting with `app/styles`
        // e.g. `app/styles.css`, `app/styles/styles.css`, `app/stylesheet.css`
        path.resolve(__dirname, "app/styles"),
        // trailing slash: only include the content of the directory
        path.resolve(__dirname, "app/styles/"),
      ],
      exclude: /node_modules/,

      // https://webpack.js.org/configuration/module/#ruletype
      type: "javascript/auto",
      mimetype: "text/javascript",
    },
  ],
};
