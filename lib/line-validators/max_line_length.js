'use strict';

var _str = require('underscore.string');

function maxLineLength(line, maxLength) {

    if (_str.ltrim(line.raw).length > maxLength) {
        return {
            col: maxLength + 1
        };
    }

}

module.exports = maxLineLength;