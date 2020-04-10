/* eslint-disable no-case-declarations */
import _ from 'lodash';
// import store from '../store';
/**
 * ServiceSiderReducer
 */
export const ServicesDataAction = {
  onChoose(serviceItems, serviceName, routerCMD) {
    return {
      serviceItems, serviceName, routerCMD,
      type: 'choose',
    };
  },
};

export const ServicesDataReducer = (state = null, action) => {
  // 获取服务群组 serviceItems
  // const { serviceItems } = store.getState();
  const serviceItems = action.serviceItems;
  if (!serviceItems || !_.isArray(serviceItems) || serviceItems.length <= 0) {
    // 无数据返回空对象
    return state;
  }
  switch (action.type) {
    case 'choose':
      const subserver = serviceItems.find(si => si.sname === action.serviceName);
      if (!subserver || !_.isArray(subserver.routers) || subserver.routers.length <= 0) {
        return state;
      }
      const router = subserver.routers.find(si => si.cmd === action.routerCMD);
      if (!router || !_.isObject(router)) {
        return state;
      }
      const { sname, title, describe, version } = subserver;
      const { name, cmd, method } = router;
      return { serviceName: sname, title, describe, version, apiName: name, cmd, method };
    default:
      return state;
  }
};
