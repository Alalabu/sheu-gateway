import React from 'react'
import 'antd/dist/antd.css';
import './Home.css'

import { Layout } from 'antd';

// 其他组件
import TopMenu from './TopMenu';
import ServiceHome from './services/ServiceHome';

const Home = () => (
  <Layout className="main-layout">
    <TopMenu />

    <ServiceHome />
  </Layout>
)

export default Home