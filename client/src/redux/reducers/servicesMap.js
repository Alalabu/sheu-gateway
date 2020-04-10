import _ from 'lodash';
/**
 * ServiceSiderReducer
 */
export const ServicesMapAction = {
  async onRefresh() {
    // console.log('========> 触发 ServiceSiderAction.onRefresh()');
    try {
      // eslint-disable-next-line no-undef
      const res = await fetch('/srevicesMap', {
      // const res = await fetch('http://127.0.0.1:20982/srevicesMap', {
        method: 'POST',
      });
      const data = await res.json();
      // console.log('========> ServiceSiderAction.onRefresh Fetch Success => ', data);
      return {
        data,
        type: 'refresh',
      };
    } catch (e) {
      console.log('========> ServiceSiderAction.onRefresh Fetch Error => ', e);
    }
  },
};

export const ServicesMapReducer = (state = [], action) => {
  switch (action.type) {
    case 'refresh':
      if (action.data && _.isArray(action.data)) {
        return state.concat(action.data);
      }
      return state.concat([ 'Lucy', 'Lily' ]);
    default:
      return state;
  }
};
