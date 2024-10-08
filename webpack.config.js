import { merge } from 'webpack-merge';
import compression from './bundler/compression.js';
// import validation from './bundler/validation.js';
import bundling from './bundler/bundling.js';
import unusedCheck from './bundler/unused-check.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(
    {
        mode: process.env.NODE_ENV || 'development',
        entry: ['./src/ts/app.ts', './src/scss/style.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/bundle.js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@ejs': path.resolve(__dirname, 'src/ejs'),
                '@sass': path.resolve(__dirname, 'src/sass'),
                '@ts': path.resolve(__dirname, 'src/ts'),
                '@img': path.resolve(__dirname, 'src/img'),
            }
        },
    },

    bundling,
    // compression,
    // validation,
    // unusedCheck
);