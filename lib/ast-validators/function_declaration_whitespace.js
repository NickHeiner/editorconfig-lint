'use strict';

var _ = require('lodash');

function findFunctionDef(tokens) {
    var index = _.findIndex(tokens, {type: 'Keyword', value: 'function'});

    if (index === -1) {
        return;
    }

    var hasIdentifier = tokens[index + 1].type === 'Identifier';
    var offset = (hasIdentifier ? 1 : 0);

    return {
        index: index,
        tokenBeforeParen: tokens[index + offset],
        paren: tokens[index + offset + 1]
    };
}

function functionDeclarationWhitespace(ast, style) {

    function verifyFunctionDefs(tokens) {
        var functionDef = findFunctionDef(tokens);

        if (!functionDef) {
            return [];
        }

        // TODO what if the columns are the same but they are on different lines?
        var spacing = functionDef.paren.loc.start.column - functionDef.tokenBeforeParen.loc.end.column;
        var err = void 0;

        console.log('spacing', spacing, 'style', style, 'start', functionDef.paren.loc.start.column, 'end', functionDef.tokenBeforeParen.loc.end.column);
        if ((spacing === 1 && style === 'none') || (spacing === 0 && style === 'single')) {
            return {
                col: functionDef.paren.loc.start.column - (style === 'none' ? 1 : 0),
                line: functionDef.paren.loc.start.line - 1
            };
        }

        return [err].concat(verifyFunctionDefs(_.tail(tokens, functionDef.index + 1)));
    }


    return verifyFunctionDefs(ast.tokens);
}

module.exports = functionDeclarationWhitespace;