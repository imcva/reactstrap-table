const { resolve } = require('path');

module.exports = {
  stories: ['../stories/*.stories.*'],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.tsx?$/
        },
        loaderOptions: {
          parser: 'typescript',
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [/\.tsx?$/],
      },
    }
  ]
};