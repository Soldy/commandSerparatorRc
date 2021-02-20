/*
 *  @Soldy\commandseparatorrc\2021.02.20\GPL3
 */
'use strict';

/*
 * @prototype
 */
const  separatorBase =function () {
    /*
     * @param {string} command
     * @public
     * @return {array}
     */
    this.check = function(command){
        return proceed(command);
    }
    /*
     * @private
     * @var {array}
     */
    let stence = [];
    /*
     * @private
     * @var {string}
     */
    let word = '';
    /*
     * @private
     * @var {string}
     */
    let line = '';
    /*
     * @private
     * @var {array}
     */
    let commands = [];
    /* expectation modifier
     * 0 nothing 
     * 1 in thhe bracket
     * 2 expection
     * (3 expecion in bracket)
     * var {integer} bitwise
     */
    let mod = 0;
    /*
     * @private
     * @var {string}
     */
    let bracetChar = '';
    /*
     * @private
     * @const {array}
     */
    const bracets = ['"',"'","`"];
    /*
     * @private
     * @const {array}
     */
    const separators = [';'];
    /*
     * @private
     */
    const reset = function(){
        stence = [];
        word = '';
        line = '';
        commands = [];
        mod = 0;
        bracetChar = '';
    }
    /*
     * @param {string}
     * @private
     * @return {string}
     */
    const cleanup = (command)=>{
        return command
            .toString()
            .replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '')
            .replace(/\s+/g, ' ');
    }
    /*
     * @param {string}
     * @private
     * @return {array}
     */
    const proceed = function(command){
        reset();
        line = cleanup(command);
        let chars = line.split('');
        for (let n of chars){
            n.toString(); // double to string ;;
            if ( mod === 0 )
                simple(n);
            else if(mod === 1)
                bracet(n);
            else
                expect(n);
        }
        separate();
        return commands;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const simple = function(c){
        if (
            (toBracet(c))||
            (toSeparate(c))||
            (toExpect(c))
        )
            return false;
        if((c === ' ') || (c === '\t')) 
            return nextWord();
        add(c);
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {array}
     */
    const toBracet = function(c){
        if (0>bracets.indexOf(c))
            return false;
        bracetChar = c;
        mod|=1; // make the bitwise great again :)
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const endBracet = function(c){
        if (bracetChar !== c)
            return false;
        mod=(mod^1); // make the bitwise great again :)
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const bracet = function(c){
        if (
            (toExpect(c)) ||
            (endBracet(c))
        )
            return false;
        add(c);
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const expectation = function(c){
        mod = (mod^2); // bitwise :) because I love it !!
        add(c);
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const toExpect = function(c){
        if (c !== '\\')
            return false; 
         mod|=2; 
         return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const nextWord = function(){
        if (1>word.length)
            return false;
        stence.push(word);
        word = '';
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const toSeparate = function(c){
        if (0 >separators.indexOf(c))
            return false;
        separate();
        return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const separate = function(){
        if (word.length > 0)
            nextWord();
        if (1>stence.length)
            return false;
        commands.push(stence);
        stence = [];
        return true;
    }
    /*
     * @param {string}
     * @private
     */
    const add = function(c){
        word += c.toString(); // double toString
    }

};

exports.base = separatorBase;
