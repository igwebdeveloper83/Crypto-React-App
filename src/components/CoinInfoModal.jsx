import { Typography, Divider, Tag } from 'antd'
import CoinInfo from './layout/CoinInfo'

export default function CoinInfoModal({coin}) {
    return (
        <>
            <CoinInfo coin={coin} withSymbol/>
            <Divider/>
            <Typography.Paragraph strong>
                <Typography.Text style={{marginRight: 10}}>1 hour:</Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                <Typography.Text style={{marginRight: 10}}>1 week:</Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
                <Typography.Text style={{marginRight: 10}}>1 day:</Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
        </>
    )
}