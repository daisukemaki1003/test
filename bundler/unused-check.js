import UnusedWebpackPlugin from 'unused-webpack-plugin';
import { join } from 'path';

export const plugins = [
    new UnusedWebpackPlugin({
        directories: [join(__dirname, '../src')],
        exclude: ['*.spec.js'],
        root: join(__dirname, '../'),
    }),
];