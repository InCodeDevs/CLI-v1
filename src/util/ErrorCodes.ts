/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as fs from 'fs';
import * as path from 'path';
import {Logger} from "./Logger";

export class ErrorCodes {

    private baseHelpURL = "http://incode.senos.xyz/help/e/"

    private codes = {
        "ic-0": {
            description: "No file was provided",
            helpLink: `${this.baseHelpURL}ic-0`
        },
        "ic-1": {
            description: "Keyword not found",
            helpLink: `${this.baseHelpURL}ic-1`
        },
        "ic-2": {
            description: "Word expected",
            helpLink: `${this.baseHelpURL}ic-2`
        },
        "ic-3": {
            description: "Type not found",
            helpLink: `${this.baseHelpURL}ic-3`
        },
        "ic-4": {
            description: "Value not found",
            helpLink: `${this.baseHelpURL}ic-4`
        },
        "ic-5": {
            description: "Operator not valid",
            helpLink: `${this.baseHelpURL}ic-5`
        },
        "ic-6": {
            description: "Event not valid",
            helpLink: `${this.baseHelpURL}ic-6`
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
        process.exit(1)
    }
}
