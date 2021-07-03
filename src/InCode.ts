/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import {Logger} from './util/Logger';
import {OptionParser} from "./util/OptionParser";
import {ErrorCodes} from "./util/ErrorCodes";

let logger: Logger = new Logger();
let optionParser: OptionParser = new OptionParser(process.argv);
let errorCodes: ErrorCodes = new ErrorCodes();

optionParser.setOptionStart("--");

logger.setLogStatus(
    !optionParser.hasOption("disableLogDebug"),
    !optionParser.hasOption("disableLogWarnings"),
    !optionParser.hasOption("disableLogErrors")
)

if (optionParser.hasOption("help")) {
    console.log("\n" +
        "\n" +
        " ___  ________   ________  ________  ________  _______      \n" +
        "|\\  \\|\\   ___  \\|\\   ____\\|\\   __  \\|\\   ___ \\|\\  ___ \\     \n" +
        "\\ \\  \\ \\  \\\\ \\  \\ \\  \\___|\\ \\  \\|\\  \\ \\  \\_|\\ \\ \\   __/|    \n" +
        " \\ \\  \\ \\  \\\\ \\  \\ \\  \\    \\ \\  \\\\\\  \\ \\  \\ \\\\ \\ \\  \\_|/__  \n" +
        "  \\ \\  \\ \\  \\\\ \\  \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\_\\\\ \\ \\  \\_|\\ \\ \n" +
        "   \\ \\__\\ \\__\\\\ \\__\\ \\_______\\ \\_______\\ \\_______\\ \\_______\\\n" +
        "    \\|__|\\|__| \\|__|\\|_______|\\|_______|\\|_______|\\|_______|\n" +
        "v1.0.0\n" +
        "\n" +
        "Made by Ben Siebert and Lukas Birke\n" +
        "\n")
    console.log("incode [options] <file>")
    process.exit(0)
} else if (optionParser.hasOption("version")) {
    console.log("v1.0.0")
    process.exit(0)
}

if(process.argv[process.argv.length - 1].startsWith(optionParser.optionStart) || process.argv.length == 2){
    errorCodes.prettyPrint(0);
    process.exit(1)
}