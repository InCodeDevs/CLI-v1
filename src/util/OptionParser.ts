/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

export class OptionParser {

    private argv: string;

    optionStart = "--"

    constructor(argv) {
        this.argv = argv
    }

    setOptionStart(value: string){
        this.optionStart = value;
    }

    hasOption(name: string): boolean {
        return this.argv.includes(this.optionStart + name.toLowerCase())
    }
}
