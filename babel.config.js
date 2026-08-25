module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@assets': './src/assets',
          '@managers': './src/managers',
          '@images': './src/assets/images',
          '@redux': './src/redux'
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
