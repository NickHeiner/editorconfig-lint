'use strict';

var _ = require('lodash');
var _str = require('underscore.string');
var validateLine = _.curry(require('./core/validate-line'));
var getTokens = require('./util/get-tokens');
var esprima = require('esprima');

function editorconfigLint(codeToLint, editorconfig) {

    var lines = _str.lines(codeToLint);
    var ast = esprima.parse(lines, {
        loc: true,
        raw: true,
        comment: true,
        tokens: true
    });

    return _(lines)
        .map(function(line, lineNumber) {

            return {
                raw: line,
                tokens: getTokens(ast, lineNumber + 1)
            };
        })
        .map(validateLine(editorconfig))
        .reduce(_.partial(_.merge, {}));
}

module.exports = editorconfigLint;