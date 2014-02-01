'use strict';

var _ = require('lodash');
var validateLine = _.curry(require('./core/validate-line'));

function editorconfigLint(codeToLint, editorconfig) {
    return _(codeToLint.split('\n'))
        .map(validateLine(editorconfig))
        .reduce(_.partial(_.merge, {}));
}

module.exports = editorconfigLint;