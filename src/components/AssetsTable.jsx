import { Table } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../context/CryptoContext';
import { mapAssets } from '../utils';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
    
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets, crypto } = useContext(CryptoContext);
  const transformedAssets = mapAssets(assets, crypto);

  const data = transformedAssets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

    return (
        <Table pagination={false} columns={columns} dataSource={data} />
    )
}