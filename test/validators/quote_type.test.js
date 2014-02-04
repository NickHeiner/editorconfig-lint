'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var editorconfigLint = require('../../lib/editorconfig-lint');

describe('editorconfig-lint', function() {

    describe('quote_type', function() {

        describe('= single', function() {

            it('returns an empty object when there are compliant quotes', function() {
                expect(editorconfigLint({quote_type: 'single'}, "    var x = 'hello world';")).to.deep.equal({});
            });

            it('returns an empty object when there are no quotes', function() {
                expect(editorconfigLint({quote_type: 'single'}, '    var x = 3;')).to.deep.equal({});
            });

            it('detects non-compliant quotes', function() {
                var codeStr = 'var x = "bad quotes";';
                expect(editorconfigLint({quote_type: 'single'}, codeStr)).to.deep.equal({
                    quote_type: [
                        {
                            lineNumber: 0,
                            col: codeStr.indexOf('"'),
                            line: codeStr
                        },
                        {
                            lineNumber: 0,
                            col: _.lastIndexOf(codeStr, '"'),
                            line: codeStr
                        }
                    ]
                });
            });

        });

        describe('= double', function() {

            it('detects non-compliant quotes', function() {
                var codeStr = "var x = 'bad quotes';";
                expect(editorconfigLint({quote_type: 'double'}, codeStr)).to.deep.equal({
                    quote_type: [
                        {
                            lineNumber: 0,
                            col: codeStr.indexOf("'"),
                            line: codeStr
                        },
                        {
                            lineNumber: 0,
                            col: _.lastIndexOf(codeStr, "'"),
                            line: codeStr
                        }
                    ]
                });
            });
        });

    });

});