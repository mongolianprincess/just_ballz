module.exports = function(grunt) {
  grunt.registerTask('travis', [
        'jshint','jasmine',
  ]);
  grunt.config.init({
    jasmine: {
            components: {
              src: [
              'components/*js'
              ],
              options: {
                specs: 'tests/spec/*Spec.js',
                keepRunner : true,
                //helpers: 'test/spec/*.js'
              }
            }
}});
};
