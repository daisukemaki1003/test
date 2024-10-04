import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageMinimizerPlugin, { squooshMinify } from 'image-minimizer-webpack-plugin';
import { resolve } from 'path';

export const plugins = [
    // 画像をコピーして public/assets/images に配置
    new CopyWebpackPlugin({
        patterns: [
            {
                from: resolve(__dirname, '../src/assets/images'), // コピー元
                to: resolve(__dirname, '../public/assets/images'), // コピー先
            },
        ],
    }),

    // WebP形式への圧縮
    new ImageMinimizerPlugin({
        test: /\.(png|jpe?g)$/i,
        minimizer: {
            filename: '[path][name][ext].webp', // 圧縮後のファイル名
            implementation: squooshMinify, // Squooshを使用して圧縮
            options: {
                encodeOptions: {
                    webp: {
                        lossless: 1, // ロスレス圧縮
                    },
                },
            },
        },
    }),

    // JPEGとPNGの圧縮
    new ImageMinimizerPlugin({
        test: /\.(png|jpe?g)$/i,
        minimizer: {
            implementation: squooshMinify,
            options: {
                encodeOptions: {
                    mozjpeg: {
                        quality: 85, // JPEGの品質を85に設定
                    },
                    oxipng: {
                        level: 3, // PNGの圧縮レベル3
                        interlace: false,
                    },
                },
            },
        },
    }),
];