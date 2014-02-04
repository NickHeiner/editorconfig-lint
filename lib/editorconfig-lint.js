'use strict';

var _ = require('lodash');
var _str = require('underscore.string');
var getValidators = require('./core/get-validators');
var combineValidatorsAndParams = require('./core/combine-validators-and-params');
var verifyValiatorsPresent = require('./core/verify-validators-present');
var validateLine = _.curry(require('./core/validate-line'));
var validateAst = require('./core/validate-ast');
var getTokens = require('./util/get-tokens');
var esprima = require('esprima');
var traverse = require('traverse');

function editorconfigLint(editorconfig, codeToLint) {

    var validators = getValidators();
    var validatorsWithParams = combineValidatorsAndParams(validators, editorconfig);

    verifyValiatorsPresent(validatorsWithParams, editorconfig);

    var lines = _str.lines(codeToLint);
    var ast;

    try {
        ast = esprima.parse(lines, {
            loc: true,
            raw: true,
            comment: true,
            tokens: true
        });

    } catch (err) {
        return {
            esprimaError: {
                lineNumber: err.lineNumber,
                col: err.column,
                err: err,
                line: lines[err.lineNumber]
            }
        };
    }

    var validationsFromLines = _(lines)
        .map(function (line, lineNumber) {

            return {
                raw: line,
                tokens: getTokens(ast, lineNumber + 1)
            };
        })
        .map(validateLine(validatorsWithParams.line));

    var validationsFromAst = [validateAst(validatorsWithParams.ast, ast)];

    var errorsFound = validationsFromLines
        .concat(validationsFromAst)
        .compact();

    if (!errorsFound.value().length) {
        return {};
    }

    return errorsFound
        .map(function (lintResult) {
            return traverse(lintResult).map(function(node) {
                if (_.has(node, 'lineNumber')) {
                    this.update(_.merge(node, {
                        line: lines[node.lineNumber]
                    }));
                }
            });
        })
        .reduce(function (acc, el) {
            return _.merge({}, acc, el);
        });

}

module.exports = editorconfigLint;