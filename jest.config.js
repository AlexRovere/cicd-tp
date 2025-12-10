module.exports = {
  testEnvironment: "allure-jest/node",
  testRunner: 'jest-circus/runner',

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'junit.xml',
        suiteName: 'Unit and Integration Tests',
        usePathAsTestName: true,
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ]
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
};