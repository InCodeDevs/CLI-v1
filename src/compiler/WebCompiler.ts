/**
 * @author Ben Siebert
 * @copyright 2021
 * @licence GPLv3
 */

import {Logger} from "../util/Logger"
import {Compiler} from "./Compiler";

export class WebCompiler {

    public static logger: Logger

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
            farbe: {
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
            text: {
                name: "innerText",
                type: "attribute",
                useSetAttribute: false,
                append: ""
            }
        },
        operators: {
            "gleich": "==",
            "keliner": "<",
            "größer": ">",
            "kleiner-gleich": "<=",
            "gößer-gleich": ">="
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
        return r + "\n"
    }


    protected static trimStatement(statement: string): string {
        statement = statement.trim()
        return statement
    }

}
