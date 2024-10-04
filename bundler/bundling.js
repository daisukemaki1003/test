import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';

export const module = {
    rules: [
        {
            test: /\.scss$/,
            use: [loader, 'css-loader', 'sass-loader'],
        },
    ],
};
export const plugins = [
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
    // CSSバンドル
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
    }),
];