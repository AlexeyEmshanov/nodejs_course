//Babel usage
import fs from 'fs';
import csvToJson from 'csvtojson';
import { pipeline } from 'stream';

//Workaround for ES6 modules without Babel - don't forget package.json changes
// import fs from 'fs';
// import csvToJson from 'csvtojson';
// import { pipeline } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CommonJS modules
// const fs = require('fs');
// const csvToJson = require('csvtojson');
// const { pipeline } = require('stream');

//Common part
const csvFilePath = `${__dirname}../../csv/nodejs-hw1-ex1.csv`;
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(`${__dirname}/output.txt`);
const option = {
        delimiter: ";",
        colParser: {
            "Amount": "omit",
        },
        // checkType: true
    }

// SOLUTION 1 (main)
pipeline(
    readStream,
    csvToJson(option)
        .on('data', (chunk) => {
            console.log('!!! Chunk', chunk.toString());
            // throw new Error('ABC ERROR')
        }),
    writeStream,
    (err) => {
        if (err) {
            console.error('Custom error', err);
        } else {
            console.log('Pipeline succeeded');
        }
    }
)


// SOLUTION 2
// csvToJson()
//     .fromFile('../csv/nodejs-hw1-ex1.csv')
//     .then((jsonObj) => console.log('test', jsonObj));

// readStream
//     // .pipe(csvToJson(option))
//     .map((d) => {
//         console.log('**', d.toString())
//         return d
//     })
//     // .on('data', (chunk) => console.log('chunk', chunk.toString()))
//     // .map((data) => {
//     //     console.log('*', data.toString())
//     //     return `${data}***`
//     // })
//     // .on('end', () => console.log('File is read'))
//     .pipe(writeStream)

//SOLUTION 3
// csvToJson(option)
//     .fromStream(readStream)
//     .on('error', (error) => console.error(error))
//     .pipe(writeStream)
//     .on('error', (error) => console.error(error))

//SOLUTION 4 - with readLine
// const readLine = require('readline');
//
// const lineByLine = readLine.createInterface({
//     input: csvToJson({
//         delimiter: "auto",
//         colParser: {
//             "Amount": "omit",
//         },
//         checkType: true
//     }).fromStream(readStream),
//     output: writeStream
// })
//
// lineByLine.on('line', (line) => {
//     console.log('Line Is ', line);
//     writeStream.write(line);
//     writeStream.write('\n');
//     console.log('after chunk');
// })
