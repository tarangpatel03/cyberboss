module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@config': './src/config',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@models': './src/models',
          '@navigation': './src/navigation',
          '@locale': './src/locale',
          '@assets': './src/assets',
          '@demoData': './src/demoData',
        },
      },
    ],
  ],
};
