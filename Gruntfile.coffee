'use strict';

module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  grunt.initConfig
    jshint:
      options:
        node: true

      src: 'lib/**/*.js'

      test: 'test/**/*.js'

    mochaTest:
      options:
        reporter: 'spec'

      unit: 'test/**/*.js'


  grunt.registerTask 'test', ['jshint', 'mochaTest']
  grunt.registerTask 'default', 'test'