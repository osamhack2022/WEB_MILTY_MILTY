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
              "@error-color": "#854944",
              "@body-background": "#D2D2CA",
              "@component-background": "#ECEBE2",
              "@layout-body-background": "#D2D2CA",
              "@layout-sider-background": "#29302B",
              "@layout-header-color": "#ECEBE2",
              "@form-item-margin-bottom": "12px",
              "@form-vertical-label-padding": "0",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
