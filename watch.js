import { spawn } from 'child_process';
import { watch } from 'fs/promises';

let devProcess = null;
let restartTimeout = null;

function startDevServer() {
    if (devProcess) {
        devProcess.kill();
        return devProcess.once('exit', () => {
            devProcess = spawn('pnpm', ['dev'], { 
                stdio: 'inherit',
                shell: true 
            });
        });
    }
    devProcess = spawn('pnpm', ['dev'], { 
        stdio: 'inherit',
        shell: true 
    });
}

async function onConfigChange() {
    if (restartTimeout) clearTimeout(restartTimeout);
    restartTimeout = setTimeout(() => {
        console.log('Config changed, restarting...');
        startDevServer();
    }, 300); // 300ms debounce
}

try {
    const watcher = watch('./webpack', { recursive: true });
    startDevServer();
    
    for await (const event of watcher) {
        onConfigChange();
    }
} catch (err) {
    console.error('Error:', err);
}

process.on('SIGINT', () => {
    if (devProcess) {
        devProcess.kill();
        devProcess.once('exit', () => process.exit(0));
    } else {
        process.exit(0);
    }
});