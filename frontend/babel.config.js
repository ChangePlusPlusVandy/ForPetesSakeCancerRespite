module.exports = function(api) {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        ['react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        }]
    ]
  };
};
