import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { fileURLToPath } from 'url';
import path from 'path';

import { metaPreprocessor } from './validation.js';
import fs from 'fs';

// パスの設定
const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), '../');

console.log(projectRoot);


// EJSファイルを動的に取得
const ejsPages = fs.readdirSync(path.resolve(projectRoot, 'src', 'ejs', 'pages'));

console.log(ejsPages);

export default {
    module: {
        rules: [
            // SCSSローダー
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },

            // TypeScriptローダー
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            // EJSローダー
            {
                test: /\.ejs$/,
                use: [
                    { loader: 'html-loader', options: { preprocessor: metaPreprocessor } },
                    { loader: 'template-ejs-loader' },
                ],
            },

            // 画像ローダー
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(),

        // // CSSバンドル
        // new MiniCssExtractPlugin({
        //     filename: 'assets/css/[name].style.css',
        // }),

        // EJSバンドル
        ...ejsPages.map(page => new HtmlWebpackPlugin({
            // template: path.resolve(projectRoot, 'src', 'ejs', 'pages', page),
            template: path.resolve(projectRoot, 'src', 'ejs', 'pages', 'index.ejs'),
            // filename: page.replace('.ejs', '.html'),
            filename: 'index.html',
        })),
    ],
}
