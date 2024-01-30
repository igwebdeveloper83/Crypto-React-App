import { Layout } from 'antd';
import { useEffect } from 'react';
import { fetchCrypto } from '../../api';

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
  };

  export default function AppSider() {
    useEffect(() => {
     fetchCrypto()
    }, [])

    return (
        <Layout.Sider width="25%" style={siderStyle}>
          Sider
        </Layout.Sider>
    )
  }