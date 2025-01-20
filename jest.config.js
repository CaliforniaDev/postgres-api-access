module.exports = {
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/?(*.)+(spec|test).mjs',
  ],
};
