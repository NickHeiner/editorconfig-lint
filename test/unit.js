'use strict';

var expect = require('chai').expect,
    editorconfigLint = require('../lib/editorconfig-lint');

describe('editorconfig-lint', function () {

    describe('indent_style', function() {

        it('returns an empty object when there are no violations', function() {
            expect(editorconfigLint('var x = 3;')).to.deep.equal({});
        });

    });

});