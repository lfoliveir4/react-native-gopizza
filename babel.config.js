module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
              '@components': './src/components',
              '@screens': './src/screens',
              '@assets': './src/assets',
              '@hooks': './src/hooks',
              '@routes': './src/routes',
              '@helpers': './src/helpers',
              '@utils': './src/utils'
            }
          }
        ]
    ]
  };
};
