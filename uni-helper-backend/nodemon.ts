import { spawn } from 'child_process';
import nodemon from 'nodemon';
import { join } from 'path';
import { stdout } from 'process';

nodemon({
    script: 'src/server.ts',
    exec: 'ts-node',
    ext: 'ts',
    ignore: ['*.d.ts'],
    verbose: true,
});

const generateTypes = () => {
    const genTypeCmd = spawn('npm.cmd', ['run', 'gen-types']);

    genTypeCmd.stdout.on('data', (data) => {
        stdout.write(data);
    });
      
    genTypeCmd.stderr.on('data', (data) => {
        stdout.write('\n' + data);
    });

    genTypeCmd.on('exit', () => {
        console.log();
    });
};

generateTypes();

nodemon.on('restart', (files) => {
    if (files?.some((fileName) => {
        return join(fileName.toLowerCase(), '..') === join(__dirname.toLowerCase(), 'src', 'graphql', 'types');
    })) {
        generateTypes();

        nodemon.emit('restart');
    }
});
