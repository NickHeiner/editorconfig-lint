# deprecated: just use [jscs](https://github.com/jscs-dev/node-jscs) instead.
I originally created this as a way to ensure that my js fits a certain style, but I found jscs to be more mature and met my needs just as well.

editorconfig-lint
=================

Lint code for compliance with an editorconfig

### TODO ideas (PRs welcome!)
* Read files directly (both files to lint and .editorconfig)
* Allow user to pass in their own validators
* Allow code to override a rule (eg jshint lets you say "ignore this rule for this section or file"
* More validations
** Using one var statement or many
** `{foo: bar}` or `{ foo: bar }`
