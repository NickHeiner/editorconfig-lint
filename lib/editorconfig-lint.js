'use strict';

var _ = require('lodash');
var _str = require('underscore.string');
var validateLine = _.curry(require('./core/validate-line'));
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
        .map(validateLine(editorconfig))
        .reduce(_.partial(_.merge, {}));
}

module.exports = editorconfigLint;