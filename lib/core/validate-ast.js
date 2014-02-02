'use strict';

var _ = require('lodash');

function validateAst(validators, ast) {

    return _(validators)
        .map(function(validationConfig, configName) {

            var validator = validationConfig.validator;
            var configParam = validationConfig.param;

            var validationResults = _.compact([].concat(validator(ast, configParam)));

            return validationResults.length ? _.zipObject([[configName, validationResults]]) : {};
        })
        .reduce(_.partial(_.merge, {}));
}

module.exports = validateAst;