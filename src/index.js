#! /usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander')
const fs = require('fs');
const path = require('path');
const {WebCompiler} = require('incode-language/dist/compiler/WebCompiler');
const { disableConsole, enableConsole } = require('./util');

program.version("2.0.0");

program
    .requiredOption("-i, --input <file>", "Specifies the File that shoudl be compiled")
    .option("-o, --output <directory>", "Specifies the output directory of the application", "dist")
    .option("-f, --force", "Force overwrite existing files")

program.parse(process.argv);

const options = program.opts();

const input = options.input;
const output = options.output;

if(!fs.existsSync(input)){
    console.log(
        chalk.red.bold("The input file does not exist!")
    )
    return;
}

let shouldReCreateDistFolder = true;

if(fs.existsSync(output)){
    if(!options.force) {
        console.log(
            chalk.red.bold("The output directory does exist!")
        )
        return;
    } else {
        shouldReCreateDistFolder = false;
    }
}

const inCode = fs.readFileSync(input).toString();

disableConsole();

const jsCode = WebCompiler.compile(inCode);

enableConsole();

let html = '<script defer src="' + input  + '.js"></script>';

if(shouldReCreateDistFolder)
    fs.mkdirSync(output);

fs.writeFileSync(path.join(output, "/index.html"), html);
fs.writeFileSync(path.join(output, input + ".js"), jsCode)