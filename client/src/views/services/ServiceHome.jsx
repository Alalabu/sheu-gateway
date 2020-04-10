import React from 'react';
import { Layout } from 'antd';
import ServiceSider from './ServiceSider';
import ServiceContent from './ServiceContent';

const ServiceHome = () => (
  <Layout>
    <ServiceSider />

    <Layout style={{ padding: '0 24px 24px' }}>
      <ServiceContent />
    </Layout>
  </Layout>
);

export default ServiceHome;