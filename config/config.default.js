/* eslint valid-jsdoc: "off" */

// 'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582872261051_8688';

  // add your middleware config here
  // config.middleware = [];
  // config.middleware = [ 'senecaIn' ];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  /**
   * 配置服务器启动项
   */
  config.cluster = {
    listen: {
      port: 20982,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
  };

  config.logger = {
    // outputJSON: true,
    dir: '../logs/sheu-bff',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  /**
   * egg-seneca-slot 配置
   */
  config.senecaGateway = {
    server: {
      host: '127.0.0.1',
      port: 50005,
    },
    users: [
      { appid: 'Alalabu', appsecret: '002f61118a6045d1ae7c49173805b0cd' },
      { appid: 'xiaofei', appsecret: '0034211ec4c5420f9171f2724af9e34a' },
    ],
  };

  // 配置静态资源
  // config.static = {
  //   // maxAge: 31536000,
  //   // dir: path.join(appInfo.baseDir, 'app/assets'),
  //   // prefix: '/assets/',
  //   // index: 'index.html',
  //   // publicPath: '/public/',
  //   prefix: '/view/',
  // };

  /**
   * 配置 视图引擎
   */
  config.view = {
    // root: `${appInfo.baseDir}/app/public`,
    // defaultExtension: '.html',

    // defaultViewEngine: 'nunjucks',
    // defaultExtension: '.nj',
    // mapping: {
    //   '.nj': 'nunjucks',
    // },
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
    mapping: {
      '.hbs': 'handlebars',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
