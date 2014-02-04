'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var editorconfigLint = require('../../lib/editorconfig-lint');

describe('editorconfig-lint', function() {

    describe('function_declaration_whitespace', function() {

        describe('= none', function() {

            it('returns an empty object when there is a compliant function definition', function() {
                expect(editorconfigLint({function_declaration_whitespace: 'none'}, "function foo() {}")).to.deep.equal({});
            });

            it('returns an empty object when there are no function definitions', function() {
                expect(editorconfigLint({function_declaration_whitespace: 'none'}, '    var x = 3;')).to.deep.equal({});
            });

            it('detects a non-compliant function definition', function() {
                var codeStr = 'function declaredWithASpace () { }';
                expect(editorconfigLint({function_declaration_whitespace: 'none'}, codeStr)).to.deep.equal({
                    function_declaration_whitespace: [
                        {
                            lineNumber: 0,
                            col: codeStr.indexOf('(') - 1
                        }
                    ]
                });
            });

            it('detects a non-compliant function definition with an anonymous function', function() {
                var codeStr = 'var f = function () { }';
                expect(editorconfigLint({function_declaration_whitespace: 'none'}, codeStr)).to.deep.equal({
                    function_declaration_whitespace: [
                        {
                            lineNumber: 0,
                            col: codeStr.indexOf('(') - 1
                        }
                    ]
                });
            });

        });

        describe('= single', function() {

            it('detects a non-compliant function definition', function() {
                var codeStr = 'function declaredWithASpace() { }';
                expect(editorconfigLint({function_declaration_whitespace: 'single'}, codeStr)).to.deep.equal({
                    function_declaration_whitespace: [
                        {
                            lineNumber: 0,
                            col: codeStr.indexOf('(')
                        }
                    ]
                });
            });

            it('returns an empty object when there are no function definitions', function() {
                expect(editorconfigLint({function_declaration_whitespace: 'single'}, '    var x = 3;')).to.deep.equal({});
            });

            it('detects an error when there is more than one space', function() {
                expect(editorconfigLint({function_declaration_whitespace: 'single'}, 'function foo            () {}'))
                    .to.deep.equal({});
            });

        });

    });

});