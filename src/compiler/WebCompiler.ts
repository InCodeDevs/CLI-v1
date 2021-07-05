/**
 * @author Ben Siebert
 * @copyright 2021
 * @licence GPLv3
 */

import {Logger} from "../util/Logger"
import {Compiler} from "./Compiler";
import {ErrorCodes} from "../util/ErrorCodes";

export class WebCompiler {

    public static logger: Logger
    private static errorCodes: ErrorCodes = new ErrorCodes();

    private static options = {
        creatable: {
            "knopf": "button",
            "absatz": "p",
            "text": "span",
            "bild": "img",
            "überschrift": "h1",
            "eingabefeld": "input",
            "tabelle": "table",
            "zeile": "tr",
            "spalte": "tb"
        },
        settable: {
            "farbe": {
                name: "color",
                type: "style",
                values: {
                    "schwarz": "\"black\"",
                    "weiß": "\"white\"",
                    "blau": "\"blue\"",
                    "grün": "\"lime\"",
                    "gelb": "\"yellow\"",
                    "grau": "\"#333\""
                },
                append: ""
            },
            "text": {
                name: "innerText",
                type: "attribute",
                useSetAttribute: false,
                append: ""
            }
        },
        operators: {
            "gleich": "==",
            "kleiner": "<",
            "größer": ">",
            "kleiner-gleich": "<=",
            "gößer-gleich": ">="
        },
        events: {
            "gedrückt": "onclick",
            "berüht": "onmouseover"
        }
    }

    static compile(code: string): string {

        // create var for result
        let result: string = ""

        // compile each codeBlock
        Compiler.extractCodeBlocks(code).forEach(codeBlock => {
            result += this.compileCodeBlock(codeBlock)
        })

        console.log(result)

        // return the final javascript code
        return result
    }

    protected static compileCodeBlock(codeBlock: any): string {
        let r = ""

        r += this.compileStatement(codeBlock.statement);

        if (codeBlock.innerStatements.length > 0) {
            r += "{\n"

            codeBlock.innerStatements.forEach(_block => {
                r += this.compileCodeBlock(_block)
            })

            r += "}\n"
        }

        return r
    }

    protected static compileStatement(statement: string): string {
        let r = this.trimStatement(statement);
        let args = r.split(" ");

        r = "";

        switch (args[0].toLowerCase()) {
            case "erstelle":
                if (args.length == 2) {
                    r = "let " + args[1] + ";"
                } else {
                    if (args.length === 4) {
                        if (this.options.creatable[args[3].toLowerCase()]) {
                            r = "let " + args[1] + " = document.createElement('" + this.options.creatable[args[3].toLowerCase()] + "')"
                        } else {
                            if (args[3].toLowerCase() === 'methode:' || args[3].toLowerCase() === 'methode') {
                                r = "function " + args[1] + "()"
                            } else {
                                this.errorCodes.prettyPrint(3)
                            }
                        }
                    } else {
                        this.errorCodes.prettyPrint(2)
                    }
                }
                break;
            case "setze":
                if (args[2].toLowerCase() === "wert") {
                    r = args[4] + " = " + this.getArgsInRange(args, 6, args.length);
                } else {
                    if (this.options.settable[args[2].toLowerCase()]) {
                        if (this.options.settable[args[2].toLowerCase()].type === 'style') {
                            if (this.options.settable[args[2].toLowerCase()].values) {
                                if (this.options.settable[args[2].toLowerCase()].values[args[6].toLocaleLowerCase()]) {
                                    r = args[4] + ".style." + this.options.settable[args[2].toLowerCase()].name + " = " + this.options.settable[args[2].toLowerCase()].values[args[6].toLowerCase()];
                                } else {
                                    this.errorCodes.prettyPrint(4)
                                }
                            } else {
                                r = args[4] + ".style." + this.options.settable[args[2].toLowerCase()].name + " = " + ""
                            }
                        } else if (this.options.settable[args[2].toLowerCase()].type === 'attribute') {
                            if (this.options.settable[args[2].toLowerCase()].useSetAttribute) {
                                r = args[4] + ".setAttribute(\"" + this.options.settable[args[2].toLowerCase()].name + "\", \"" + this.getArgsInRange(args, 6, args.length) + "\");"
                            } else {
                                r = args[4] + "." + this.options.settable[args[2].toLowerCase()].name + " = " + this.getArgsInRange(args, 6, args.length) + ""
                            }
                        }
                    } else {
                        this.errorCodes.prettyPrint(3)
                    }
                }
                break
            case "rufe":
                if (args.length === 5) {
                    r = args[3] + "()"
                } else {
                    this.errorCodes.prettyPrint(2)
                    console.log("Missing KeyWord: als. In statement: " + JSON.stringify(statement))
                }
                break;
            case "füge":
                if (args.length === 5) {
                    let parentElement = args[3];
                    if (args[3].toLowerCase() === "bildschirm")
                        parentElement = "document.body";
                    r = parentElement + ".appendChild(" + args[1] + ")"
                } else {
                    this.errorCodes.prettyPrint(2)
                }
                break;
            case "wiederhole":
                if (args.length === 3) {
                    r = "for(let i = 0; i < " + args[1] + "; i++)"
                } else {
                    if (args.length === 6) {
                        if (this.options.operators[args[3]]) {
                            r = "while(" + args[2] + " " + this.options.operators[args[3].toLowerCase()] + " " + args[4] + ")"
                        } else {
                            this.errorCodes.prettyPrint(5)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2)
                    }
                }
                break;
            case "wenn":
                if (args.length === 5) {
                    if (this.options.operators[args[2]]) {
                        r = "if(" + args[1] + " " + this.options.operators[args[2].toLowerCase()] + " " + args[4] + ")"
                    } else {
                        this.errorCodes.prettyPrint(5)
                    }
                } else {
                    if (args.length === 7) {
                        // event listeners
                        if (this.options.events[args[2].toLowerCase()]) {
                            r = args[1] + ".setAttribute('" + this.options.events[args[2].toLowerCase()] + "', '" + args[5] + "()')"
                        } else {
                            console.log(args[2])
                            this.errorCodes.prettyPrint(6)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2)
                    }
                }
                break;
            case "sonst":
                if (args.length === 1) {
                    r = "else"
                } else {
                    if (args.length === 6) {
                        if (this.options.operators[args[3]]) {
                            r = "else if(" + args[2] + " " + this.options.operators[args[3].toLowerCase()] + " " + args[4] + ")";
                        } else {
                            this.errorCodes.prettyPrint(5)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2)
                    }
                }
                break;
            case "gib":
                if (args.length >= 6) {
                    if (args[args.length - 2].toLowerCase() === "konsole") {
                        r = "console.log(" + this.getArgsInRange(args, 1, args.length - 4) + ")"
                    } else if (args[args.length - 2].toLowerCase() === "dialogbox") {
                        r = "alert(" + this.getArgsInRange(args, 1, args.length - 4) + ")"
                    } else {
                        this.errorCodes.prettyPrint(3)
                    }
                } else {
                    this.errorCodes.prettyPrint(2)
                }
                break;
            default:
                console.log("KeyWord: " + args[0] + ". In statement: " + JSON.stringify(statement));
                this.errorCodes.prettyPrint(1)

        }

        return r + "\n"
    }


    protected static trimStatement(statement: string): string {
        statement = statement.replace(/\t/g, '');
        statement = statement.trim()
        return statement
    }

    protected static getArgsInRange(s: string[], min: number, max: number): string {
        let x = [];
        for (let i = min; i < max; i++) {
            x.push(s[i]);
        }
        return x.join(" ");
    }

}
