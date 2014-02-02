'use strict';

var _ = require('lodash');

function validateLine(validators, line, lineNumber) {

    return _(validators)
        .map(function(validationConfig, configName) {

            var validator = validationConfig.validator;
            var configParam = validationConfig.param;

            if (!validator) {
                throw new Error('editorconfig option "' + configName + '" is not supported.');
            }

            var validationResults = _([].concat(validator(line, configParam)))
                .compact()
                .map(function(validationResult) {
                    return _.merge({line: lineNumber}, validationResult);
                })
                .value();

            return validationResults.length ? _.zipObject([[configName, validationResults]]) : {};
        })
        .reduce(_.partial(_.merge, {}));
}

module.exports = validateLine;