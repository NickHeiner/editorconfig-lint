'use strict';

var expect = require('chai').expect,
    editorconfigLint = require('../../lib/editorconfig-lint');

describe('editorconfig-lint', function () {

    describe('indent_style', function() {

        it('returns an empty object when there is no indentation', function() {
            var actual = editorconfigLint({indent_style: 'space'}, 'var x = 3;');
            expect(actual).to.deep.equal({});
        });

        describe('= space', function() {
            it('returns an empty object when there is compliant indentation', function() {
                expect(editorconfigLint({indent_style: 'space'}, '    var x = 3;')).to.deep.equal({});
            });

            it('detects non-compliant indentation', function() {
                expect(editorconfigLint({indent_style: 'space'}, '\tvar x = 3;')).to.deep.equal({
                    indent_style: [
                        {line: 0, col: 0}
                    ]
                });
            });
        });

        describe('= tab', function() {
            it('returns an empty object when there is compliant indentation', function() {
                expect(editorconfigLint({indent_style: 'tab'}, '\tvar x = 3;')).to.deep.equal({});
            });

            it('detects non-compliant indentation', function() {
                expect(editorconfigLint({indent_style: 'tab'}, '    var x = 3;')).to.deep.equal({
                    indent_style: [
                        {line: 0, col: 0},
                        {line: 0, col: 1},
                        {line: 0, col: 2},
                        {line: 0, col: 3},
                    ]
                });
            });
        });

    });

});