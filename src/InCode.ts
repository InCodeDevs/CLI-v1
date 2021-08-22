/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

const {program} = require('commander');
const fs = require('fs');
import {WebCompiler} from "incode-language/dist/compiler/WebCompiler";

program.version('1.0.0')

program
    .requiredOption("-o, --output <file>", 'The output file')
    .option('-s, --small', 'Minify the output file', false)
    .requiredOption('-i, --input <file>', 'The input file');

program.parse(process.argv);

const options = program.opts();

if (fs.existsSync(options.input)) {
    let code = fs.readFileSync(options.input).toString();

    let e = WebCompiler.compile(code);

    if (options.small) {
        let t = '';
        e.split("\n").forEach(x => {
            t+=x+";";
        });
        e = t;
    }

    fs.writeFileSync(options.output, e);
} else {
    console.log('error: the file does not exist!')
}