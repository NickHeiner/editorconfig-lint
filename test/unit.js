'use strict';

var expect = require('chai').expect,
    editorconfigLint = require('../lib/editorconfig-lint');

describe('editorconfig-lint', function () {

    describe('indent_style', function() {

        it('returns an empty object when there is no indentation', function() {
            expect(editorconfigLint('var x = 3;', {indent_style: 'space'})).to.deep.equal({});
        });

        it('returns an empty object when there is compliant indentation', function() {
            expect(editorconfigLint('    var x = 3;', {indent_style: 'space'})).to.deep.equal({});
        });

        it('detects non-compliant indentation', function() {
            expect(editorconfigLint('\tvar x = 3;', {indent_style: 'space'})).to.deep.equal({
                indent_style: [
                    {line: 0, character: 0}
                ]
            });
        });

    });

});