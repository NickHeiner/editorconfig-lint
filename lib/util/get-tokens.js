'use strict';

var _ = require('lodash');

function getTokens(ast, lineNumber) {

    if (!ast.tokens) {
        throw new Error('ast does not have tokens. Use esprima.parse(code, { tokens: true }) to get tokens.');
    }

    return _.filter(ast.tokens, function(token) {

        if (!token.loc) {
            throw new Error('tokens do not have location info. Use esprima.parse(code, { loc: true }) to get location info.');
        }

        return token.loc.start.line === lineNumber;
    });

}

module.exports = getTokens;