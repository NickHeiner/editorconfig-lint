'use strict';

var _ = require('lodash');
var _str = require('underscore.string');
var validateLine = _.curry(require('./core/validate-line'));

function editorconfigLint(codeToLint, editorconfig) {
    return _(_str.lines(codeToLint))
        .map(validateLine(editorconfig))
        .reduce(_.partial(_.merge, {}));
}

module.exports = editorconfigLint;