const process = require('process');
const os = require('os');
const path = require('path');
const fs = require('fs');

function documentsDir() {
    if (['darwin', 'win32'].includes(process.platform)) {
        return path.join(os.homedir(), 'Documents');
    } else if (process.platform === 'linux') {
        try {
            const configFile = fs.readFileSync(
                path.join(os.homedir(), '.config/user-dirs.dirs'),
                'utf-8'
            );
            const p = configFile.match(/XDG_DOCUMENTS_DIR=(.*)\r?\n/)[1].trim();
            return path.join(
                os.homedir(),
                p.replace(/^(?:"|')(.*)(?:"|')$/, '$1').replace(/\$HOME/, '')
            );
        } catch (err) {
            return path.join(os.homedir(), 'Documents');
        }
    } else {
        throw new Error('Unknown platform!');
    }
}

module.exports = documentsDir();
