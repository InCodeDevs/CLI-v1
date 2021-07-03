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
        // prepare the code
        // trim the code
        code = code.trim()
        // remove comments

        // code = code.replace(/\/\/(.|\s)*\/\//, "");

        // parse the code
        // create var for result
        let result: string = ""

        // split by line breaks
        let expressions = code.split("\n");

        // create an empty array for all code blocks
        let codeBlocks = []

        // create an empty array for ignored lines
        let ignoredLines = []

        // loop through all expressions
        for (let i = 0; i < Object.keys(expressions).length; i++) {

            // get the current expression
            let expression = expressions[i]

            if (!expression.startsWith("//")) {

                // check if the expression is not \r
                if (expression != "\r" && !ignoredLines.includes(i)) {

                    // get the position of this expression
                    let rootCodeBlockPosition = this.getCodeBlockPosition(expression)

                    if (rootCodeBlockPosition === 0) {

                        let exs: string[] = this.getEXS(rootCodeBlockPosition, expressions, i)

                        if (exs.length == 0) {
                            codeBlocks.push({
                                line: i,
                                position: rootCodeBlockPosition,
                                statement: expression,
                                innerStatements: []
                            })
                        } else {

                            let block = {
                                line: i,
                                position: rootCodeBlockPosition,
                                statement: expression,
                                innerStatements: []
                            };

                            for (let j = 0; j < exs.length; j++) {
                                if (this.getCodeBlockPosition(exs[j]) > rootCodeBlockPosition) {
                                    if (this.getCodeBlockPosition(exs[j]) - 1 === rootCodeBlockPosition) {
                                        block.innerStatements.push({
                                            line: i,
                                            position: this.getCodeBlockPosition(exs[j]),
                                            statement: exs[j],
                                            innerStatements: []
                                        })
                                    } else {
                                        if (block.innerStatements.length > 0) {
                                            console.log(block.innerStatements.length)
                                            block.innerStatements[block.innerStatements.length - 1].innerStatements.push({
                                                line: i,
                                                position: this.getCodeBlockPosition(exs[j]),
                                                statement: exs[j],
                                                innerStatements: []
                                            })
                                        }
                                    }
                                } else {
                                    break;
                                }
                            }
                            codeBlocks.push(block)
                        }
                    }
                }
            }
        }

        // compile each codeBlock
        codeBlocks.forEach(codeBlock => {
            console.log(JSON.stringify(codeBlock))
        })

        // return the final javascript code
        return result
    }

    public static getEXS(rootCodeBlockPosition: number, expressions: string[], i: number): string[] {
        let exs: string[] = []
        for (let j = i + 1; j < expressions.length; j++) {
            if (expressions[j]) {
                if (this.getCodeBlockPosition(expressions[j]) > rootCodeBlockPosition) {
                    exs.push(expressions[j])
                } else {
                    break
                }
            } else {
                break
            }
        }
        return exs
    }

    public static compileStatement(statement: string): string {
        return ""
    }

    protected static getCodeBlockPosition(expression: string): number {
        const re = /\t/g
        return ((expression || '').match(re) || []).length
    }
}
