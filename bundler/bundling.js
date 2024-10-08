import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { fileURLToPath } from 'url';
import path from 'path';

// パスの設定
const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), '../');

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
                use: [{ loader: 'html-loader' }, { loader: 'template-ejs-loader' }],
            },

            // 画像ローダー
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file',
                // type: 'asset/resource',
                // generator: {
                //     filename: 'img/[name][ext]',  // 画像のみをimgフォルダに出力
                // },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        // CSSバンドル
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),

        // // 画像コピー
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(projectRoot, "src", "img"),
        //             to: path.resolve(projectRoot, "assets", "img"),
        //             globOptions: { ignore: ['**/.gitkeep'] },
        //         }
        //     ]
        // }),

        // EJSバンドル
        new HtmlWebpackPlugin({
            template: path.resolve(projectRoot, "src", "ejs", "index.ejs"),
            filename: "index.html",
            inject: false

        }),
    ],
}