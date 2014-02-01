'use strict';

var expect = require('chai').expect;
var getTokens = require('../../lib/util/get-tokens');
var esprima = require('esprima');

describe('get-asts', function () {

    function parseWithTokens(codeStr) {
        return esprima.parse(codeStr, {tokens: true, loc: true});
    }

    it('returns an empty list when there are no applicable asts', function() {
        var input = 'var x = 4;\nvar y = 0;'
        expect(getTokens(parseWithTokens(input), 9001)).to.deep.equal([]);
    });

    it('returns the list of tokens that are relevant to a line', function() {
        var secondLine = 'foo()';
        var input = 'var x = 4;\n' + secondLine;
        var expectedTokens = parseWithTokens('\n' + secondLine, {tokens: true}).tokens;

        expect(getTokens(parseWithTokens(input), 2)).to.deep.equal(expectedTokens);
    });

});