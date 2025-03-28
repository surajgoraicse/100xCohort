const { Command } = require('commander');
const fs = require("fs")
const program = new Command();

program
    .name('count')
    .description('count number of lines in a file')
    .version('1.0.0');

program
    .command('count <path>')
    .description('count number of lines')
    .action((path) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const count = data.trim().split("\n").length
            console.log(count);
        })
    });

program.parse(process.argv);
