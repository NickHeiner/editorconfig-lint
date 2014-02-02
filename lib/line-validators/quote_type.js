'use strict';

var _ = require('lodash');
var _str = require('underscore.string');

var expectation = {
    double: '"',
    single: "'"
};

function quoteType(line, style) {

    return _(line.tokens)
        .filter({type: 'String'})
        .map(function(token) {
            var errors = [];

            if (!_str.startsWith(token.value, expectation[style])) {
                errors.push({
                   col: token.loc.start.column
                });
            }

            if (!_str.endsWith(token.value, expectation[style])) {
                errors.push({
                   col: token.loc.end.column - 1
                });
            }

            return errors;
        })
        .flatten()
        .value();

}

module.exports = quoteType;