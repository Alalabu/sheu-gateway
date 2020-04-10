/**
 * 全局的 Reducer 的汇总
 */
import { combineReducers } from 'redux'; // 用于合并多个 Reducers

import { ServicesMapReducer } from './reducers/servicesMap';
import { ServicesDataReducer } from './reducers/servicesData';

const appReducer = combineReducers({
  serviceItems: ServicesMapReducer,
  chooseService: ServicesDataReducer,
});

export default appReducer;
