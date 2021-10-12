import { spawn } from 'child_process';
import nodemon from 'nodemon';
import { join } from 'path';
import { stdout } from 'process';

const startNodemon = () => {
    console.log('Starting nodemon...');

    nodemon({
        script: 'src/server.ts',
        exec: 'ts-node',
        ext: 'ts',
        ignore: ['*.d.ts'],
    });
    
    nodemon.on('restart', (files) => {
        console.clear();

        if (files?.some((fileName) => {
            return join(fileName.toLowerCase(), '..') === join(__dirname.toLowerCase(), 'src', 'graphql', 'types');
        })) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            generateTypes(false);    
        } else {
            console.log('Restarting due to changes...');
        }
    });
};

const generateTypes = (initialStart: boolean) => {
    console.log('Generating graphQL types...\n');
    
    const genTypeCmd = spawn('npm.cmd', ['run', 'gen-types', '--', '-e']);

    genTypeCmd.stderr.on('data', (data) => {
        stdout.write('\n' + data);
    });

    genTypeCmd.on('exit', () => {
        if (initialStart) {
            startNodemon();
        } else {
            nodemon.emit('restart');
        }
    });
};

generateTypes(true);
