import { createContext, useEffect, useState } from 'react';
import { fetchAssets, fetchCrypto } from '../api';
import { mapAssets } from '../utils';

export const CryptoContext = createContext();

export function CryptoContextProvider({ children }) {
    const [ loading, setLoading ] = useState(false)
    const [ crypto, setCrypto ] = useState([])
    const [ assets, setAssets ] = useState([])
    
    const loadAssetsFromLocalStorage = () => {
      const storedAssets = localStorage.getItem('Assets');
      if (storedAssets) {
          setAssets(JSON.parse(storedAssets));
      }
    };

    const saveAssetsToLocalStorage = (assetsToSave) => {
      localStorage.setItem('Assets', JSON.stringify(assetsToSave));
    };

    useEffect(() => {
        async function preLoad() {
            setLoading(true);
            const { result } = await fetchCrypto();
            const fetchedAssets = await fetchAssets();
            setCrypto(result);
            const transformedAssets = mapAssets(fetchedAssets, result);
            setAssets(transformedAssets);
            loadAssetsFromLocalStorage(transformedAssets);
            setLoading(false);
        }
        preLoad();
    }, []);

    function addAsset(newAsset) {
        setAssets((prev) => {
            const updatedAssets = [...prev, newAsset];
            saveAssetsToLocalStorage(updatedAssets);
            return updatedAssets;
        });
    }

      return (
          <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
            {children}
          </CryptoContext.Provider>
      );
}
export default CryptoContext
