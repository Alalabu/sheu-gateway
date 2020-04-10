/**
 * 全局的 Store
 */
import { createStore } from 'redux';
// import routerUrl from './common/url-cache/url-cache-config';
import Reducers from './reducerMap';

// import TopbarStore from './stores/MenuStore';

// const testArr = [ 'girl', 'boy' ];

const initValues = {
  // topbar: TopbarStore
  serviceItems: [],
  chooseService: null,
};

/*
  创建store对象, 指定初始值以及
*/
const Store = createStore(Reducers, initValues);
export default Store;
