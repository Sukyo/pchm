// reference: https://github.com/vuejs/vue-test-utils-next/issues/208
module.exports = {
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: true
                    }
                }]
            ],
            plugins: [
                ['@babel/plugin-transform-typescript', {
                    isTSX: true,
                }],
                // issues: https://github.com/vitejs/vite/issues/1149
                'babel-plugin-transform-import-meta',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime',
                [
                    "import",
                    {
                        libraryName: 'element-plus',
                        customStyleName: (name) => {
                            name = name.slice(3)
                            return `element-plus/packages/theme-chalk/src/${name}.scss`;
                        },
                    },
                ],
            ],
        },
    },
};