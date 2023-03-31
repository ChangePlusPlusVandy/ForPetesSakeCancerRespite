module.exports = function(api) {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        }
      ]
    ]
  };
};
