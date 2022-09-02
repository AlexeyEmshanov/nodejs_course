const fs = require('fs');
const csvFilePath = `${__dirname}../../csv/nodejs-hw1-ex1.csv`;
const csvToJson = require('csvtojson');
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('output.txt');
const { pipeline } = require('stream');


//SOLUTION 1
// csvToJson({
//     delimiter: "auto",
// })
//     .fromStream(readStream)
//     .on('error', (error) => console.error(error))
//     .pipe(writeStream)
//     .on('error', (error) => console.error(error))

//SOLUTION 2
// pipeline(
//     readStream,
//     csvToJson({
//         delimiter: "auto",
//         colParser: {
//             "Amount": "omit",
//         },
//         checkType: true
//     }),
//     writeStream,
//     (err) => {
//         if (err) {
//             console.error(err)
//         } else {
//             console.log('Pipeline succeeded')
//         }
//     }
// )

//SOLUTION 3 - with readLine
const readLine = require('readline');

const lineByLine = readLine.createInterface({
    input: csvToJson({
        delimiter: "auto",
        colParser: {
            "Amount": "omit",
        },
        checkType: true
    }).fromStream(readStream),
    output: writeStream
})

lineByLine.on('line', (line) => {
    console.log('Line Is ', line);
    writeStream.write(line);
    writeStream.write('\n');
})




const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);