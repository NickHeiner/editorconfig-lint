'use strict';

var traverse = require('traverse'),
    _ = require('lodash');

function combineValidatorsAndParams(validators, editorconfig) {

    return traverse(validators).map(function(node) {
        if (this.notLeaf) {
            return;
        }

        if (!_.has(editorconfig, this.key)) {
            this.remove();
            return;
        }

        this.update({
            param: editorconfig[this.key],
            validator: node
        }, true);
    });

}

module.exports = combineValidatorsAndParams;