'use strict';

var indentOfLine = require('../util/indent-of-line');
var _ = require('lodash');

var expectation = {
    tab: '\t',
    space: ' '
};

function indentStyle(line, style) {
    var indent = indentOfLine(line);

    return _.map(indent, function(index, idx) {
        if (index !== expectation[style]) {
            return {
                col: idx
            };
        }
    });
}

module.exports = indentStyle;