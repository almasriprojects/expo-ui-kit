/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo/ios',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@ungap/structured-clone$': '<rootDir>/jest.mocks/structured-clone.js',
    '^lucide-react-native$': '<rootDir>/jest.mocks/lucide.js',
    '^expo-image$': '<rootDir>/jest.mocks/expo-image.js',
    '^react-native-reanimated$': '<rootDir>/jest.mocks/reanimated.js',
    'expo/src/winter/runtime\\.native': '<rootDir>/jest.mocks/expo-winter.js',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'src/components/ui/**/*.tsx',
    '!src/components/ui/index.ts',
  ],
  setupFiles: ['./jest.setup.js'],
  forceExit: true,
};
