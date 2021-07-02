/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

export class Logger {
    private allowDebugs: boolean;
    private allowWarnings: boolean;
    private allowErrors: boolean;

    private logHistory: string = "";

    private logLevelsDisplays = {
        "default": "INFO",
        "warning": "WARN",
        "error": "ERROR"
    };

    setLogStatus(allowLog: boolean = true, allowWarnings: boolean = true, allowErrors: boolean = true) {
        this.allowDebugs = allowLog;
        this.allowWarnings = allowWarnings;
        this.allowErrors = allowErrors
    }

    log(message: string, level: string = "default") {
        this.addToHistory(message, level)
        switch (level) {
            case "default":
                if (this.allowDebugs)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message)
                break
            case "warning":
                if (this.allowWarnings)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message)
                break
            case "error":
                if (this.allowErrors)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message)
        }
    }

    private addToHistory(message: string, level: string) {
        this.logHistory += "[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message + "\n"
    }

    private static getFormattedDate(): string {
        return new Date().getDate() +
            "." +
            new Date().getMonth() +
            "." +
            new Date().getFullYear() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds();
    }
}
