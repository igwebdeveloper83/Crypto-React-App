import { Layout, Card, Spin } from 'antd';
import { useEffect, useState } from 'react';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
    padding: '1rem'
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'H/XUp4ZkAh9mHzlvq8eeM02n0z6LU3f3g3rGiG8mcbw='
    }
  };
  
  
export default function AppContent() {
     const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    
    /* useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch('https://openapiv1.coinstats.app/coins', options)
            .then(response => response.json())
            .then(response => setCoins(response.result))
            .catch(err => console.error(err))
            .finally(setLoading(false))
        },3000)
     
      }, []) */
    return (
        <Layout.Content style={contentStyle}>
            {loading ? (
                <Spin size='large'/> 
            ) : (
                <>
                    {coins.map((coin) => (
                        <Card title={coin.id} 
                        key={coin.id}
                        bordered={false} style={{ width: 300, marginBottom: '1rem' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                       ))}
                </>
                )
            }
           
        </Layout.Content>
    )
}