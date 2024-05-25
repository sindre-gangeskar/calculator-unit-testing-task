const path = require('path');
const fs = require('fs');

async function save(data, filePath) {
    fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data, null, 2));
}

async function load(file) {
    return JSON.parse(fs.readFileSync(file));
}

module.exports = { save, load };