import { merge } from 'webpack-merge';
import compression from './bundler/compression.js';
// import validation from './bundler/validation.js';
import bundling from './bundler/bundling.js';
import unusedCheck from './bundler/unused-check.js';
import WebpackWatchedGlobEntries from 'webpack-watched-glob-entries-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entries = WebpackWatchedGlobEntries.getEntries(
    // [path.resolve(__dirname, "./src/ejs/pages/**/*.ejs")],
    // [path.resolve(__dirname, "./src/scss/pages/**/*.scss")],
    [path.resolve(__dirname, "./src/ts/pages/**/*.ts")],
    {}
)();

export default merge(
    {
        mode: process.env.NODE_ENV || 'development',
        // entry: ['./src/ts/app.ts', './src/scss/style.scss'],
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'dist'),
            // filename: 'assets/js/bundle.js',
            filename: 'assets/js/[name].bundle.js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@ejs': path.resolve(__dirname, 'src/ejs'),
                '@scss': path.resolve(__dirname, 'src/scss'),
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