/*
 *  @Soldy\poolrc\2021.01.16\GPL3
 */
'use strict`;

/*
 * @param {integer} command
 * @function
 * @return {array}
 */
const  separatorBase =function (command) {
    command = command.toString().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    let commands = [],
        commandi = 0,
        commandit = 0,
        mod = 0,
        modSelector = '';
    for (let i = 0; command.length > i; i++) {
        if (typeof commands[commandi] === 'undefined')
            commands[commandi] = [];
        if (typeof commands[commandi][commandit] === 'undefined')
            commands[commandi][commandit] = '';
        if (mod === 0) {
            if (command.charAt(i) === ';') {
                commandi++;
                commandit = 0;
            } else if (command.charAt(i) === '\\') {
                mod = 2;
            } else if (command.charAt(i) === '\'') {
                mod = 1;
                modSelector = '\'';
            } else if (command.charAt(i) === '"') {
                mod = 1;
                modSelector = '"';
            } else if (
                (command.charAt(i) === ' ') || (command.charAt(i) === '\t')) {
                if (
                    (i > 0) && (command.charAt(i - 1) !== ' ') && 
                        (command.charAt(i - 1) !== '\t') && 
                        (command.charAt(i - 1) !== ';') && 
                        (command.charAt(i - 1) !== '\'') && 
                        (command.charAt(i - 1) !== '"'))
                    commandit++;
            } else {
                commands[commandi][commandit] += command.charAt(i);
            }
        } else if (mod === 1) {
            if (command.charAt(i) === modSelector) {
                mod = 0;
            } else {
                commands[commandi][commandit] += command.charAt(i);
            }
        } else if (mod === 2) {
            commands[commandi][commandit] += command.charAt(i);
            mod = 0;
        }
    }
    return commands;
};

exports.base = separatorBase;
