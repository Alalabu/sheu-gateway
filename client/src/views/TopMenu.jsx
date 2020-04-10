import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const TopMenu = () => (
  <Header className="header">
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">子服务群</Menu.Item>
      {/* <Menu.Item key="2">子服务群</Menu.Item>
      <Menu.Item key="3">使用教程</Menu.Item> */}
    </Menu>
  </Header>
);

export default TopMenu;