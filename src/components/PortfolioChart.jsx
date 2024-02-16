import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import CryptoContext from '../context/CryptoContext'
import { mapAssets } from '../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {

    const { assets, crypto } = useContext(CryptoContext)
    const transformedAssets = mapAssets(assets, crypto);

    const data = {
        labels: transformedAssets.map((asset) => asset.name),
        datasets: [
          {
            label: '$',
            data: transformedAssets.map((asset) => asset.totalAmount),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
         
    return (
        <div style={{display: 'flex',justifyContent: 'center', height: 400, marginBottom: '1rem'}}>
            <Pie data={data} />
        </div>
    )
}