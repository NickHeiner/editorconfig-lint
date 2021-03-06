'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var editorconfigLint = require('../../lib/editorconfig-lint');

describe('editorconfig-lint', function () {

    describe('max_line_length', function () {

        it('returns an empty object when the line is within the bounds', function () {
            expect(editorconfigLint("    var x = 'hello world';", {max_line_length: 9001})).to.deep.equal({});
        });

        it('detects a line that is too long', function () {
            expect(editorconfigLint('    var x = 3;', {max_line_length: 6})).to.deep.equal({
                max_line_length: [
                    {
                        line: 0,
                        col: 7
                    }
                ]
            });
        });

    });

});