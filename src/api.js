import { cryptoAssets } from "./data";

const apiKey = import.meta.env.VITE_API_KEY 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': apiKey,
    }
  };

  export const fetchCrypto = () => new Promise((resolve, reject) => {
          fetch('https://openapiv1.coinstats.app/coins', options)
            .then(response => response.json())
            .then(data => {
              setTimeout(() => {
                resolve(data);
              },1)
            })
            .catch(err => {
              console.error(err);
              reject(err);
            }); 
  });
    

    
export const fetchAssets = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
})
