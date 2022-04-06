const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.ts',
        popup: './src/popup.tsx',
        page: './src/page.ts',
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/build`,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js',
        ],
    },
    target: ['web', 'es2020'],
    plugins: [
        new MomentTimezoneDataPlugin({
            startYear: currentYear - 1,
            endYear: currentYear + 2,
        }),
    ]
};