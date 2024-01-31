import './App.css'
import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import { CryptoContextProvider } from './context/crypto-context';
import { AppLayout } from './components/layout/AppLayout';

function App() {
 
 return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
    
  )
}

export default App
