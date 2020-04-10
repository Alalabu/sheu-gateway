import React from 'react';
import _ from 'lodash';
import { Layout, Menu } from 'antd';
import { FrownOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { ServicesMapAction } from '../../redux/reducers/servicesMap';
import { ServicesDataAction } from '../../redux/reducers/servicesData';
import store from '../../redux/store';

class ServiceSider extends React.PureComponent {

  state = {}

  constructor(props) {
    super(props);

    this.onMenuItemsUpdate = this.onMenuItemsUpdate.bind(this);
  }
  /**
   * render 组件渲染挂载之前执行的生命周期方法
   */
  async componentWillMount() {
    // 注册 菜单更新 服务
    store.subscribe(this.onMenuItemsUpdate);
    // 刷新 服务数据
    await this.props.onRefresh();
  }

  /**
   * 菜单更新过程
   */
  onMenuItemsUpdate() {
    // console.log('更新菜单样式, 执行 onMenuItemsUpdate ...');
    // 获取服务群组
    const { serviceItems } = store.getState();
    console.log('当前的服务群组:', serviceItems);
    // 定义菜单事件
    const onItemClick = (e, opts) => {
      const sitems = store.getState().serviceItems;
      const {serviceName, routerCMD} = opts;
      typeof this.props.onChooseMenuitem === 'function' && this.props.onChooseMenuitem(sitems, serviceName, routerCMD);
    };
    // 遍历侧边菜单项
    const menuReduce = (item, key) => {
      const routers = item.routers;
      return (
        <SubMenu key={'m'+key}
            title={ <span> <UserOutlined /> {item.title} </span> }
          >
            {routers.map((rv, rk) => { return (
              <Menu.Item key={'m'+key+'r'+rk} 
                onClick={(e) => onItemClick(e, {serviceName:item.sname, routerCMD: rv.cmd})}>
                {rv.name}
              </Menu.Item>
              );}) }
          </SubMenu>
      );
    };
    // 拼接菜单
    let SubMenus = (_.isArray(serviceItems) && serviceItems.length > 0) ? 
      serviceItems.map(menuReduce): 
      (<SubMenu title={ <span> <FrownOutlined />无服务 </span> }></SubMenu>);
    
    this.setState({ SubMenus });
  }

  render() {
    const { SubMenus } = this.state;
    // console.log('ServiceSider render: ', SubMenus);

    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          { SubMenus }
        </Menu>
      </Sider>
    );
  }
}

function mapState(state, ownProps) {
  // console.log('【mapState】 state =>', state);
  // console.log('【mapState】 ownProps =>', ownProps);
  return {
    // routerUrl: state['routerUrl']
  }
}

function mapDispatch(dispatch, ownProps) {
  // console.log('【mapDispatch】 dispatch =>', dispatch);
  // console.log('【mapDispatch】 ownProps =>', ownProps);
  return {
    // 挂载一个 `urlCache` 对象
    async onRefresh() {
      dispatch(await ServicesMapAction.onRefresh())
    },
    // 侧边菜单项选中事件
    onChooseMenuitem(serviceItems, serviceName, routerCMD) {
      dispatch(ServicesDataAction.onChoose(serviceItems, serviceName, routerCMD))
    }
  }
}

// export default ServiceSider;
// export default withRouter(connect(mapState,mapDispatch)(ServiceSider));
export default connect(mapState, mapDispatch)(ServiceSider);
