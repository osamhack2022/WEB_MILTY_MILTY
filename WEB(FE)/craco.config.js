const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#7B8450",
              "@body-background": "#D2D2CA",
              "@component-background": "#ECEBE2",
              "error-color": "#854944",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
