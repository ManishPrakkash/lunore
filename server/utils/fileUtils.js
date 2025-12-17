import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Read and parse a JSON file
 * @param {string} filepath - Relative path to JSON file from data directory
 * @returns {Promise<any>} Parsed JSON data
 */
export const readJSONFile = async (filepath) => {
    try {
        const fullPath = path.join(__dirname, '..', 'data', filepath);
        const data = await fs.promises.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array or object
            return filepath.includes('cart') ? {} : [];
        }
        throw new Error(`Error reading file ${filepath}: ${error.message}`);
    }
};

/**
 * Write data to a JSON file
 * @param {string} filepath - Relative path to JSON file from data directory
 * @param {any} data - Data to write
 * @returns {Promise<void>}
 */
export const writeJSONFile = async (filepath, data) => {
    try {
        const fullPath = path.join(__dirname, '..', 'data', filepath);
        const dirPath = path.dirname(fullPath);

        // Ensure directory exists
        if (!fs.existsSync(dirPath)) {
            await fs.promises.mkdir(dirPath, { recursive: true });
        }

        await fs.promises.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`Error writing file ${filepath}: ${error.message}`);
    }
};
