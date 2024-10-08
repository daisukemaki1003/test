import UnusedWebpackPlugin from 'unused-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

// ESモジュールでの__dirname再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    plugins: [
        new UnusedWebpackPlugin({
            directories: [path.join(__dirname, '../src')],
            exclude: ['*.spec.js'],
            root: path.join(__dirname, '../'),
        }),
    ],
}