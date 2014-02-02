'use strict';

var _ = require('lodash');
var traverse = require('traverse');

function verifyValidatorsPresent(validatorsWithParams, editorconfig) {

    _.forEach(editorconfig, function(configParam, configName) {
        var supported = _.any(validatorsWithParams, function(validators) {
            return _.has(validators, configName);
        });

        if (!supported) {
            throw new Error('editorconfig validator type "' + configName + '" is not supported');
        }
    });
}

module.exports = verifyValidatorsPresent;