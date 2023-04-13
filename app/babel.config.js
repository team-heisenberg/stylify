module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
      },
    ],
  ]

  return {
    presets: ["babel-preset-expo"],
    plugins
  };
};
