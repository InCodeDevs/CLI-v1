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
            "spalte": "tb",
            "zeilenumbruch": "br",
            "video": "video",
            "ton": "audio",
            "fenster": "iframe"
        },
        settable: {
            "farbe": {
                name: "color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "hinterdrungfarbe": {
                name: "backgroundColor",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "text": {
                name: "innerText",
                type: "attribute",
                useSetAttribute: false,
                append: ""
            },
            "textdekoration": {
                name: "text-decoration",
                type: "style",
                values: {
                    "unterstrichen": "underline",
                    "überstrichen": "overline",
                    "durchgestrichen": "line-through",
                    "blink": "blink",
                    "nichts": "none",
                    "unterstrichen-überstrichen": "underline overline"
                },
                append: ""
            },
            "textausrichtung": {
                name: "text-align",
                type: "style",
                values: {
                    "links": "left",
                    "rechts": "right",
                    "start": "start",
                    "ende": "end",
                    "mitte": "center"
                },
                append: ""
            },
            "schriftstil": {
                name: "text-decoration",
                type: "style",
                values: {
                    "unterstrichen": "underline",
                    "überstrichen": "overline",
                    "durchgestrichen": "line-through",
                    "blink": "blink",
                    "nichts": "none",
                    "unterstrichen-überstrichen": "underline overline"
                },
                append: ""
            },
            "schriftbreite": {
                name: "fontWeight",
                type: "style",
                values: {
                    "fett": "bold",
                    "normal": "normal",
                    "nichts": "normal"
                }
            },
            "schriftart": {
                name: "font-family",
                type: "style",
                useSetAttribute: false,
                append: ""
            },
            "abstand-oben": {
                name: "margin-top",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "abstand-rechts": {
                name: "margin-right",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "abstand-unten": {
                name: "margin-bottom",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "abstand-links": {
                name: "margin-left",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "abstand": {
                name: "margin",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "innerer-abstand-oben": {
                name: "padding-top",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "innerer-abstand-rechts": {
                name: "padding-right",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "innerer-abstand-unten": {
                name: "padding-bottom",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "innerer-abstand-links": {
                name: "padding-left",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "innerer-abstand": {
                name: "padding",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "id": {
                name: "id",
                type: "attribute",
                useSetAttribute: false,
                append: ""
            },
            "schriftgröße": {
                name: "fontSize",
                type: "style",
                append: "px"
            },
            "breite": {
              name: "witdh",
              type: "style",
              useSetAttribute: false,
              append: "px"
            },
            "höhe": {
                name: "height",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "rahmenbreite": {
                name: "witdh",
                type: "attribute",
                useSetAttribute: false,
                append: "px"
            },
            "rahmenhöhe": {
                name: "height",
                type: "attribute",
                useSetAttribute: false,
                append: "px"
            },
            "quelle": {
                name: "src",
                type: "attribute",
                useSetAttribute: false,
                append: ""
            },
            "position": {
                name: "position",
                type: "style",
                values: {
                    "absolut": "absolute",
                    "fest": "fixed",
                    "relativ": "relative"
                },
                append: ""
            },
            "umrandungsbreite-oben": {
                name: "border-top-width",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "umrandungsbreite-rechts": {
                name: "border-right-width",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "umrandungsbreite-unten": {
                name: "border-bottom-width",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "umrandungsbreite-links": {
                name: "border-left-width",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "umrandungsbreite": {
                name: "border-width",
                type: "style",
                useSetAttribute: false,
                append: "px"
            },
            "umrandungsstil-oben": {
                name: "border-top-style",
                type: "style",
                values: {
                    "nichts": "none",
                    "versteckt": "hidden",
                    "gepunktet": "dotted",
                    "gestrichelt": "dashed",
                    "solide": "solid",
                    "doppelt": "double",
                    "gerillt": "groove",
                    "3d": "ridge",
                    "eingesetzt": "inset",
                    "draufgelegt": "outset"
                }
            },
            "umrandungsstil-rechts": {
                name: "border-right-style",
                type: "style",
                values: {
                    "nichts": "none",
                    "versteckt": "hidden",
                    "gepunktet": "dotted",
                    "gestrichelt": "dashed",
                    "solide": "solid",
                    "doppelt": "double",
                    "gerillt": "groove",
                    "3d": "ridge",
                    "eingesetzt": "inset",
                    "draufgelegt": "outset"
                }
            },
            "umrandungsstil-unten": {
                name: "border-bottom-style",
                type: "style",
                values: {
                    "nichts": "none",
                    "versteckt": "hidden",
                    "gepunktet": "dotted",
                    "gestrichelt": "dashed",
                    "solide": "solid",
                    "doppelt": "double",
                    "gerillt": "groove",
                    "3d": "ridge",
                    "eingesetzt": "inset",
                    "draufgelegt": "outset"
                }
            },
            "umrandungsstil-links": {
                name: "border-left-style",
                type: "style",
                values: {
                    "nichts": "none",
                    "versteckt": "hidden",
                    "gepunktet": "dotted",
                    "gestrichelt": "dashed",
                    "solide": "solid",
                    "doppelt": "double",
                    "gerillt": "groove",
                    "3d": "ridge",
                    "eingesetzt": "inset",
                    "draufgelegt": "outset"
                }
            },
            "umrandungsstil": {
                name: "border-style",
                type: "style",
                values: {
                    "nichts": "none",
                    "versteckt": "hidden",
                    "gepunktet": "dotted",
                    "gestrichelt": "dashed",
                    "solide": "solid",
                    "doppelt": "double",
                    "gerillt": "groove",
                    "3d": "ridge",
                    "eingesetzt": "inset",
                    "draufgelegt": "outset"
                }
            },
            "umrandungsfarbe-oben": {
                name: "border-top-color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "umrandungsfarbe-rechts": {
                name: "border-right-color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "umrandungsfarbe-unten": {
                name: "border-bottom-color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "umrandungsfarbe-links": {
                name: "border-left-color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "umrandungsfarbe": {
                name: "border-color",
                type: "style",
                values: {
                    "schwarz": "black",
                    "weiß": "white",
                    "blau": "blue",
                    "grün": "lime",
                    "gelb": "yellow",
                    "rot": "red",
                    "grau": "gray",
                    "hellgrau": "lightgray",
                    "rosa": "pink",
                    "pink": "pink",
                    "lila": "violet",
                    "violet": "violet",
                    "orange": "orange"
                },
                append: ""
            },
            "umrandungsradius": {
                name: "border-radius",
                type: "style",
                useSetAttribute: false,
                append: ""
            }
        },
        operators: {
            "gleich": "==",
            "kleiner": "<",
            "größer": ">",
            "kleiner-gleich": "<=",
            "größer-gleich": ">="
        },
        events: {
            "gedrückt": "onclick",
            "berührt": "onmouseover",
            "nicht-berührt": "onmouseleave"
        }
    }

    protected static c: string;

    static compile(code: string): string {

        this.c = code;

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
        if (statement.startsWith("@"))
            return statement.slice(statement.indexOf("@") + 2, statement.length)
        let r = this.trimStatement(statement);
        let args = r.split(" ");

        r = "";

        switch (args[0].toLowerCase()) {
            case "erstelle":
                if (args.length == 2) {
                    r = "let " + args[1] + ";"
                } else if (args.length == 3) {
                    let found = false;
                    let varName: string;
                    while (!found) {
                        varName = this.randomString(64)
                        if(!this.c.includes(varName)){
                            found = true;
                        }
                    }
                    r = `let ${varName} = document.createElement('${args[2].toLowerCase()}')`
                } else {
                    if (args.length === 4) {
                        if (this.options.creatable[args[3].toLowerCase()]) {
                            r = "let " + args[1] + " = document.createElement('" + this.options.creatable[args[3].toLowerCase()] + "')"
                        } else {
                            if (args[3].toLowerCase() === 'methode:' || args[3].toLowerCase() === 'methode') {
                                r = "function " + args[1] + "()"
                            } else {
                                this.errorCodes.prettyPrint(3, statement)
                            }
                        }
                    } else {
                        this.errorCodes.prettyPrint(2, statement)
                    }
                }
                break;
            case "setze":
                if (args[2].toLowerCase() === "wert") {
                    r = args[4] + " = " + "\"" + this.getArgsInRange(args, 6, args.length) + "\"";
                } else {
                    if (this.options.settable[args[2].toLowerCase()]) {
                        if (this.options.settable[args[2].toLowerCase()].type === 'style') {
                            if (this.options.settable[args[2].toLowerCase()].values) {
                                if (this.options.settable[args[2].toLowerCase()].values[args[6].toLocaleLowerCase()]) {
                                    r = args[4] + ".style." + this.options.settable[args[2].toLowerCase()].name + " = \"" + this.options.settable[args[2].toLowerCase()].values[args[6].toLowerCase()] + this.options.settable[args[2].toLowerCase()].append + "\"";
                                } else {
                                    r = args[4] + ".style." + this.options.settable[args[2].toLowerCase()].name + " = \"" + args[6].toLowerCase() + "\"";
                                }
                            } else {
                                r = args[4] + ".style." + this.options.settable[args[2].toLowerCase()].name + " = \"" + this.getArgsInRange(args, 6, args.length) + this.options.settable[args[2].toLowerCase()].append + "\""
                            }
                        } else if (this.options.settable[args[2].toLowerCase()].type === 'attribute') {
                            if (this.options.settable[args[2].toLowerCase()].useSetAttribute) {
                                r = args[4] + ".setAttribute(\"" + this.options.settable[args[2].toLowerCase()].name + "\", \"" + this.getArgsInRange(args, 6, args.length) + "\");"
                            } else {
                                r = args[4] + "." + this.options.settable[args[2].toLowerCase()].name + " = " + this.getArgsInRange(args, 6, args.length) + this.options.settable[args[2].toLowerCase()].append
                            }
                        }
                    } else {
                        this.errorCodes.prettyPrint(3, statement)
                    }
                }
                break
            case "rufe":
                if (args.length === 5) {
                    r = args[3] + "()"
                } else {
                    this.errorCodes.prettyPrint(2, statement)
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
                    this.errorCodes.prettyPrint(2, statement)
                }
                break;
            case "wiederhole":
                if (args.length === 3) {
                    let found = false;
                    let varName: string;
                    while (!found) {
                        varName = this.randomString(64)
                        if(!this.c.includes(varName)){
                            found = true;
                        }
                    }
                    r = `for(let ${varName} = 0; ${varName} < ${args[1]} ; ${varName}++)`
                } else {
                    if (args.length === 6) {
                        if (this.options.operators[args[3]]) {
                            r = "while(" + args[2] + " " + this.options.operators[args[3].toLowerCase()] + " " + args[4] + ")"
                        } else {
                            this.errorCodes.prettyPrint(5, statement)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2, statement)
                    }
                }
                break;
            case "wenn":
                if (args.length >= 5 && args[3] !== 'wird') {
                    if (this.options.operators[args[2]]) {
                        r = "if(" + args[1] + " " + this.options.operators[args[2].toLowerCase()] + " " + this.getArgsInRange(args, 3, args.length - 1) + ")"
                    } else {
                        this.errorCodes.prettyPrint(5, statement)
                    }
                } else {
                    if (args.length === 7) {
                        // event listeners
                        if (this.options.events[args[2].toLowerCase()]) {
                            r = args[1] + ".setAttribute('" + this.options.events[args[2].toLowerCase()] + "', '" + args[5] + "()')"
                        } else {
                            console.log(args[2])
                            this.errorCodes.prettyPrint(6, statement)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2, statement)
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
                            this.errorCodes.prettyPrint(5, statement)
                        }
                    } else {
                        this.errorCodes.prettyPrint(2, statement)
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
                        this.errorCodes.prettyPrint(3, statement)
                    }
                } else {
                    this.errorCodes.prettyPrint(2, statement)
                }
                break;
            case "frage":
                if (args.length >= 8) {
                    r = args[args.length - 1] + " = prompt(" + this.getArgsInRange(args, 1, args.length - 6) + ")"
                } else {
                    this.errorCodes.prettyPrint(2, statement)
                }
                break;
            default:
                console.log("KeyWord: " + args[0] + ". In statement: " + JSON.stringify(statement));
                this.errorCodes.prettyPrint(2, statement)

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

    protected static randomString(length: number = 32) {
        var result = '__';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

}
