'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var editorconfigLint = require('../../lib/editorconfig-lint');

describe('editorconfig-lint', function() {

    describe('quote_type', function() {

        describe('= single', function() {

            it('returns an empty object when there are compliant quotes', function() {
                expect(editorconfigLint("    var x = 'hello world';", {quote_type: 'single'})).to.deep.equal({});
            });

            it('returns an empty object when there are no quotes', function() {
                expect(editorconfigLint('    var x = 3;', {quote_type: 'single'})).to.deep.equal({});
            });

            it('detects non-compliant quotes', function() {
                var codeStr = 'var x = "bad quotes";';
                expect(editorconfigLint(codeStr, {quote_type: 'single'})).to.deep.equal({
                    quote_type: [
                        {
                            line: 0,
                            col: codeStr.indexOf('"')
                        },
                        {
                            line: 0,
                            col: _.lastIndexOf(codeStr, '"')
                        }
                    ]
                });
            });

        });

        describe('= double', function() {

            it('detects non-compliant quotes', function() {
                var codeStr = "var x = 'bad quotes';";
                expect(editorconfigLint(codeStr, {quote_type: 'double'})).to.deep.equal({
                    quote_type: [
                        {
                            line: 0,
                            col: codeStr.indexOf("'")
                        },
                        {
                            line: 0,
                            col: _.lastIndexOf(codeStr, "'")
                        }
                    ]
                });
            });
        });

    });

});