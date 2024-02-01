import { Layout, Select, Space, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import CryptoContext from '../../context/crypto-context';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  };

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const { crypto } = useContext(CryptoContext)

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])
  
  function handleSelect(value) {
    console.log(value);
  };
  
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                onSelect={handleSelect}
                open={select}
                onClick={() => setSelect((prev) => !prev)}
                value='press / open'                
                options={crypto.map(coin => ({
                  label: coin.name,
                  value: coin.id,
                  icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img 
                          style={{width: 20 }} 
                          src={option.data.icon} 
                          alt={option.data.label}
                          />{' '} 
                          {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary">Add assets</Button>
        </Layout.Header>
    )
}