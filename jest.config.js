module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-picker|@react-native-firebase|react-native-gesture-handler|react-clone-referenced-element|react-native-responsive-screen)/)'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^@react-native-firebase/auth$': '<rootDir>/__mocks__/@react-native-firebase/auth.js',
    '^@react-native-firebase/app$': '<rootDir>/__mocks__/@react-native-firebase/app.js',
  },
};
