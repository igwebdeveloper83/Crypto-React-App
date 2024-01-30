import { cryptoAssets } from "./data";

const apiKey = import.meta.env.VITE_API_KEY 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': apiKey,
    }
  };

  export function fetchCrypto() {
        setTimeout(() => {
            fetch('https://openapiv1.coinstats.app/coins', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err))
        },3000)
    
  }
    
export function fetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}