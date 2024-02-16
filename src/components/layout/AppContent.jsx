import { Layout, Typography } from 'antd';
import { useContext } from 'react';
import PortfolioChart from '../PortfolioChart';
import CryptoContext from '../../context/CryptoContext';
import AssetsTable from '../AssetsTable';


const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
  };

  
  
  
  export default function AppContent() {
    const { assets, crypto } = useContext(CryptoContext);
    
    const CryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    },{})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                Portfolio: {assets.map((asset) => asset.amount * CryptoPriceMap[asset.id])
                                  .reduce((acc, v) => (acc += v), 0)
                                  .toFixed(2)
                                  }
                                  $
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable />
        </Layout.Content>
    );
}