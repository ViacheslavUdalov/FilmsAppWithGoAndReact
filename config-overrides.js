const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "path": require.resolve("path-browserify"),
    };
    config.plugins = (config.plugins || []).concat([
        new NodePolyfillPlugin()
    ]);
    return config;
};
