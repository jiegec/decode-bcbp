const decode = require('bcbp').decode;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    console.log('%o', decode(line));
});