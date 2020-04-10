// 'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);

  // router.get('/submap', controller.home.subserverMap);

  router.get('/', controller.home.index);
  router.post('/srevicesMap', controller.home.srevicesMap);
};
