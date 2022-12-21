import * as readline from 'readline';

const input = process.stdin;
const output = process.stdout;

const rl = readline.createInterface( { input } );

rl.on( 'line', (data) => {
    output.write(reverseInput(data.toString()));
    output.write("\n\n");
})

function reverseInput(inputString) {
    return inputString.split('').reverse().join('').trim();
}