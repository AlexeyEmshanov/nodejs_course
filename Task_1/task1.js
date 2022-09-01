const input = process.stdin;
const output = process.stdout;

input.on('data', (data) => {
    output.write(reverseInput(data.toString()));
    output.write("\n\n");
})

function reverseInput(input) {
    return input.split('').reverse().join('').trim();
}