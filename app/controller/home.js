// 'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    let manifest;

    try {
      manifest = require('../public/static/manifest.json');
    } catch (error) {
      manifest = {};
    }

    const SENECA_ROUTERS_CACHE = 'SenecaRoutersCache';
    const clientMap = await ctx.app.registryClient.getConfig(SENECA_ROUTERS_CACHE);
    const subservers = (clientMap => {
      const keys = Object.keys(clientMap.serverMap);
      return keys.map(k => clientMap.serverMap[k]);
    })(clientMap);

    // 获取本机服务器端 host 以及 port 便于生成页面对服务端进行请求
    const { hostname, port } = ctx.app.config.cluster.listen;

    await ctx.render('index', {
      isDev: process.env.NODE_ENV === 'development',
      manifest, subservers, hostname, port,
    });
  }

  /**
   * 获取服务映射群组
   */
  async srevicesMap() {
    const { ctx } = this;
    const SENECA_ROUTERS_CACHE = 'SenecaRoutersCache';
    // console.log('[srevicesMap] In 01 ...');
    try {
      const clientMap = await ctx.app.registryClient.getConfig(SENECA_ROUTERS_CACHE);
      // console.log('[srevicesMap] clientMap: ', clientMap);
      const srevicesMap = (clientMap => {
        const keys = Object.keys(clientMap.serverMap);
        return keys.map(k => clientMap.serverMap[k]);
      })(clientMap);
      // console.log('[srevicesMap] subservers: ', srevicesMap);
      ctx.body = srevicesMap;
    } catch (error) {
      console.log('[srevicesMap] ERROR ...', error);
      ctx.body = { error };
    }
  }
}

module.exports = HomeController;
