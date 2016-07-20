module.exports = {
    extends: ['./rules/best-practices', './rules/errors', './rules/node', './rules/style', './rules/variables'].map(
        require.resolve),
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        amd: false,
        mocha: false,
        jasmine: false
    },
    ecmaFeatures: {},
    globals: {
        angular: true,
        __APP_NAME__: true,
        isProduct: true,
        isMock: true
    },
    rules: {}
};
