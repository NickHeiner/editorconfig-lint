'use strict';

var globule = require('globule');
var path = require('path');
var _ = require('lodash');

function getValidatorsInDir(dir) {
    var validatorFilePaths = globule.find(path.join(__dirname, '..', dir, '*.js'));

    return _(validatorFilePaths)
        .map(function (validatorFilePath) {
            return [path.basename(validatorFilePath, '.js'), require(path.resolve(validatorFilePath))];
        })
        .zipObject()
        .value();
}

function getValidators() {

    return {
        ast: getValidatorsInDir('ast-validators'),
        line: getValidatorsInDir('line-validators')
    };

}

module.exports = getValidators;