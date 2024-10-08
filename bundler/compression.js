import { fileURLToPath } from 'url';
import path from 'path';

// ESモジュールでの__dirname再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default {
    plugins: [

    ],
}