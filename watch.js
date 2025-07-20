import { spawn } from 'child_process';
import { watch } from 'fs/promises';

let devProcess = null;

function startDevServer() {
    if (devProcess) {
        devProcess.kill();
    }
    devProcess = spawn('pnpm', ['dev'], { 
        stdio: 'inherit',
        shell: true 
    });
}

try {
    const watcher = watch('./webpack', { recursive: true });
    startDevServer();
    
    for await (const event of watcher) {
        console.log('Config changed, restarting...');
        startDevServer();
    }
} catch (err) {
    console.error('Error:', err);
}

process.on('SIGINT', () => {
    if (devProcess) devProcess.kill();
    process.exit(0);
});