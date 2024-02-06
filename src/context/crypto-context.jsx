import { createContext, useEffect, useState } from 'react';
import { fetchAssets, fetchCrypto } from '../api';

const CryptoContext = createContext();

export function CryptoContextProvider({ children }) {
    const [ loading, setLoading ] = useState(false)
    const [ crypto, setCrypto ] = useState([])
    const [ assets, setAssets ] = useState([])
    
    useEffect(() => {
     async function preload() {
      setLoading(true)
      const { result } = await fetchCrypto()
      const fetchedAssets = await fetchAssets()

      setCrypto(result)
      setAssets(fetchedAssets)
      setLoading(false)
     }
     preload()
    }, [])
    
    function addAsset(newAsset) {
      setAssets((prev) => [...prev, newAsset])
    }

 return (
    <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
      {children}
    </CryptoContext.Provider>
 );
}
export default CryptoContext
