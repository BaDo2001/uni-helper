import { spawn } from 'child_process';
import nodemon from 'nodemon';
import ora from 'ora';
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
    const spinner = ora('Generating graphQL types...');
    spinner.color = 'green';
    spinner.start();
    
    const genTypeCmd = spawn('npm.cmd', ['run', 'gen-types', '--', '-e']);

    genTypeCmd.stderr.on('data', (data) => {
        spinner.stop();

        stdout.write('\n' + data);
    });

    genTypeCmd.on('exit', () => {
        spinner.stop();

        if (initialStart) {
            startNodemon();
        } else {
            nodemon.emit('restart');
        }
    });
};

generateTypes(true);
