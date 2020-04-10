// 'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },

  senecaGateway: {
    enable: true,
    package: 'egg-seneca-gateway',
  },

  // 静态资源插件
  // static: {
  //   enable: true,
  //   package: 'egg-static',
  // },

  view: {
    enable: true,
    package: 'egg-view',
  },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  handlebars: {
    enable: true,
    package: 'egg-view-handlebars',
  },
};
