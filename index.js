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
        return _proceed(command);
    };
    /*
     * @private
     * @var {array}
     */
    let _stence = [];
    /*
     * @private
     * @var {string}
     */
    let _word = '';
    /*
     * @private
     * @var {string}
     */
    let _line = '';
    /*
     * @private
     * @var {array}
     */
    let _commands = [];
    /* expectation modifier
     * 0 nothing 
     * 1 in thhe bracket
     * 2 expection
     * (3 expecion in bracket)
     * var {integer} bitwise
     */
    let _mod = 0;
    /*
     * @private
     * @var {string}
     */
    let _bracetChar = '';
    /*
     * @private
     * @const {array}
     */
    const _bracets = ['"','\'','`'];
    /*
     * @private
     * @const {array}
     */
    const _separators = [';'];
    /*
     * @private
     */
    const _reset = function(){
        _stence = [];
        _word = '';
        _line = '';
        _commands = [];
        _mod = 0;
        _bracetChar = '';
    };
    /*
     * @param {string}
     * @private
     * @return {string}
     */
    const _cleanup = (command)=>{
        return command
            .toString()
            .replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '')
            .replace(/\s+/g, ' ');
    };
    /*
     * @param {string}
     * @private
     * @return {array}
     */
    const _toBracet = function(c){
        if (0 > _bracets.indexOf(c))
            return false;
        _bracetChar = c;
        _mod |= 1; // make the bitwise great again :)
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _endBracet = function(c){
        if (_bracetChar !== c)
            return false;
        _mod = (_mod^1); // make the bitwise great again :)
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _bracet = function(c){
        if (
            (_toExpect(c)) ||
            (_endBracet(c))
        )
            return false;
        _add(c);
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _expect = function(c){
        _mod = (_mod^2); // bitwise :) because I love it !!
        _add(c);
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _toExpect = function(c){
        if (c !== '\\')
            return false; 
        _mod|=2; 
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _nextWord = function(){
        if (1>_word.length)
            return false;
        _stence.push(_word);
        _word = '';
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _toSeparate = function(c){
        if (0 > _separators.indexOf(c))
            return false;
        _separate();
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _separate = function(){
        if ( _word.length > 0)
            _nextWord();
        if (1 > _stence.length)
            return false;
        _commands.push(_stence);
        _stence = [];
        return true;
    };
    /*
     * @param {string}
     * @private
     */
    const _add = function(c){
        _word += c.toString(); // double toString
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _simple = function(c){
        if (
            (_toSeparate(c))||
            (_toExpect(c))||
            (_toBracet(c))
        )
            return false;
        if((c === ' ') || (c === '\t')) 
            return _nextWord();
        _add(c);
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {array}
     */
    const _proceed = function(command){
        _reset();
        _line = _cleanup(command);
        let chars = _line.split('');
        for (let n of chars){
            n.toString(); // double to string ;;
            if ( _mod === 0 )
                _simple(n);
            else if( _mod === 1 )
                _bracet(n);
            else
                _expect(n);
        }
        _separate();
        return _commands;
    };

};

exports.base = separatorBase;
