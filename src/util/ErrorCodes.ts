/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as fs from 'fs';
import * as path from 'path';
import {Logger} from "./Logger";

export class ErrorCodes {

    private codes = {
        "ic-0": {
            description: "No file was provided",
            helpLink: "//incode.senos.xyz/help/e/ic-0"
        }
    }

    getDescription(code: string){
        return this.codes[code].description || "Description was not found"
    }

    getHelpLink(code: string){
        return this.codes[code].helpLink || "Help link was not found"
    }

    prettyPrint(code: number){
        console.log("error: ic-" + code + ": " + this.getDescription("ic-" + code) + ". please visit " + this.getHelpLink("ic-" + code) + " for help")
    }
}
