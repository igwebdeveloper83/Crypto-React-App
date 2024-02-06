import { Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result } from 'antd'
import { useContext, useRef, useState } from "react"
import CryptoContext from '../context/crypto-context'
import CoinInfo from './layout/CoinInfo'

export default function AddAssetForm({onClose}) {
    const { crypto, addAsset } = useContext(CryptoContext)
    const [coin, setCoin] = useState(null)
    const [ form ] = Form.useForm()
    const [ submitted, setSubmitted ] = useState(false)
    const assetRef = useRef()

    const validateMessages = {
        required: '${label} is required!',
        type: {
            number: '${label} is not a valid number'
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
        
      };

    if (submitted) {
        return (
            <Result
                status="success"
                title="New asset was added"
                subTitle={`Added ${assetRef.current.amount} coins of ${coin.name} by price
                ${assetRef.current.price}`}
                extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    Close
                </Button>
                ]}
            />
        )
    }  

    if (!coin) {
        return (
            <Select
            style={{ width: '100%' }}
            onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
            placeholder = 'select coin'                
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
        )
    }

    function onFinish(values) {
        console.log('values', values)
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        };
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        form.setFieldsValue({
            total: +value * coin.price.toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +value * amount.toFixed(2)
        })
    }

    return (
        <Form
        form={form}
        name="basic"
        labelCol={{
        span: 4,
        }}
        wrapperCol={{
        span: 10,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{
            price: +coin.price.toFixed(2)
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>
            <Divider />
            
            <Form.Item
            label="Amount"
            name="amount"
            rules={[
                {
                required: true,
                type: 'number',
                min: 0,
                },
            ]}
            >
            <InputNumber onChange={handleAmountChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            label="Price"
            name="price"
            >
            <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            label="Date/Time"
            name="time"
            >
            <DatePicker showTime/>
            </Form.Item>

            <Form.Item
            label="Total"
            name="total"
            >
            <InputNumber placeholder='Enter coin amount' disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item >
            <Button type="primary" htmlType="submit">
                Add Asset
            </Button>
            </Form.Item>
  </Form>
    )
}