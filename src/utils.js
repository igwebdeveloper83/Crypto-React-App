export const percentDifference = (a,b) => +(100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2)
  

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1)


export const mapAssets = (assets, crypto) => assets.map((asset) => {
    const coin = crypto.find((c) => c.id === asset.id);
    return {
      grow: asset.price < coin.price,
      growPercent: percentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      name: coin.name,
      ...asset,
    };
  });
