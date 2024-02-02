import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useContext, useEffect, useState } from 'react';
import CryptoContext from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

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
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
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
    setModal(true)
    setCoin(crypto.find((coin) => coin.id === value))
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
            <Button type="primary" onClick={() => setDrawer(true)}>Add assets</Button>
            <Modal 
              open={modal} 
              onCancel={() => setModal(false)}
              footer={null}
            >
              <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer 
              title="Add Asset" 
              onClose={() => setDrawer(false)} 
              open={drawer}
            >
              <AddAssetForm/>
            </Drawer>
        </Layout.Header>
    )
}