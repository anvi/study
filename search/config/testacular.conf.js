basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular/angular.js',
  'tests/lib/angular/angular-mock.js',
  'js/**/*.js',
  'tests/unit/**/*.js'
];

autoWatch = true;

browsers = ['Firefox'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};