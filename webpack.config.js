import { merge } from 'webpack-merge';
import compression from './bundler/compression.js';
import validation from './bundler/validation.js';
import bundling from './bundler/bundling.js';
import unusedCheck from './bundler/unused-check.js';

export default merge(
    {
        entry: './src/ts/index.ts',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }],
        },
    },
    compression,
    validation,
    bundling,
    unusedCheck
);