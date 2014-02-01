'use strict';

var _ = require('lodash');

function validateLine(editorconfig, line, lineNumber) {

    return _(editorconfig)
        .map(function(configParam, configName) {
            var validator = require('../validators/' + configName);
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