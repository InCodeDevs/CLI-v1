/**
 * @author Ben Siebert
 * @copyright 2021
 * @licence GPLv3
 */

import {Logger} from "../util/Logger"

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
        console.log(code)
        // prepare the code
        // trim the code
        code = code.trim()
        // remove comments
        code = code.replace(/\/\/(.|\s)*\/\//, "");
        // parse the code
        // create var for result
        let result: string = ""

        // return the final javascript code
        return result
    }

    static compileStatement(statement: string): string {
        return ""
    }

}
