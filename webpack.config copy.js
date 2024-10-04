const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const fs = require('fs');

const filePath = {
    ts: "./src/ts/",
    ejs: "./src/ejs/",
    sass: "./src/sass/",
};

// エントリーポイントの設定
module.exports = {
    entry: {
        app: resolve(__dirname, filePath.ts + 'index.ts'),
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            // TypeScriptローダー
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // SCSSローダー
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            // EJSローダー
            {
                test: /\.ejs$/,
                use: 'ejs-loader',
            },
            // HTML構文チェック（htmlhint）
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'htmlhint-loader',
                        options: {
                            configFile: resolve(__dirname, '.htmlhintrc'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // TODO HTMLの構文チェック
        // EJSバンドル
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src", "index.ejs"),
            filename: "index.html",
            // TODO これ何？
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true,
            },
        }),

        // CSS分割 & SCSSバンドル
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        // 画像圧縮 & サイズチェック
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                ],
            },
        }),

        // 未使用CSS検出
        new PurgeCSSPlugin({
            paths: glob.sync(`${filePath.ejs}/**/*`, { nodir: true }),
        }),

        // 未使用ファイル検出（画像など）
        new UnusedWebpackPlugin({
            directories: [join(__dirname, 'src')],
            exclude: ['*.spec.js'],
            root: __dirname,
        }),

        // タイトルタグとOGPタグチェック (htmlhint)
        new HtmlHintWebpackPlugin({
            failOnError: true,
            config: {
                'alt-require': true,
                'title-require': true,
            },
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};

// 規定サイズ以上の画像の警告を表示するカスタムプラグイン
class ImageSizeWarningPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('ImageSizeWarningPlugin', (compilation) => {
            const maxSize = 1024 * 500; // 500KB
            const dir = resolve(__dirname, 'dist/images');
            fs.readdir(dir, (err, files) => {
                if (err) throw err;
                files.forEach(file => {
                    const filePath = join(dir, file);
                    fs.stat(filePath, (err, stats) => {
                        if (err) throw err;
                        if (stats.size > maxSize) {
                            console.warn(`Warning: ${file} exceeds the maximum size of 500KB`);
                        }
                    });
                });
            });
        });
    }
}

// 画像サイズ警告プラグインを追加
module.exports.plugins.push(new ImageSizeWarningPlugin());