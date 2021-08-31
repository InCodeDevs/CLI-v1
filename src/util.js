let oldConsole;

function disableConsole() {
    oldConsole = console.log;
    console.log = () => {}
}

function enableConsole() {
    console.log = oldConsole;
}

module.exports = {disableConsole, enableConsole}