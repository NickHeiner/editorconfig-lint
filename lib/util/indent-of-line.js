'use strict';

var _ = require('lodash');

function indentOfLine(line) {
    return _.take(line, function(char) {
        return /\s/.test(char);
    });
}

module.exports = indentOfLine;