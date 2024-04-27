import { useState } from 'react'
import {useAuth} from '../auth/auth_helpers'
import {Link} from 'react-router-dom'
import { apiHooks } from '../apis/hooks'
import OrderItem from './OrderItem'
import DeleteOrder from './DeleteOrder'

export default function Orders() {
    const {user} = useAuth()

    const [dirty, setDirty] = useState(new Date())

    const {response, error, loading} = apiHooks.useAxiosGet('/orders', {headers: {accept: "*/*", uid: user._id}}, dirty)
    console.log(response)
    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-1"><h2>Orders</h2></div>
                    <div className="col-2"><Link to="/" style={{padding: 5}}>Home</Link></div>
                </div>
            </div>
            {loading && <div>Loading...</div>}

            {!loading && response.length > 0 && 
                <div className="container">
                    <div className="row">
                        {response.map(item => <OrderItem key={item._id} order={item} setDirty={setDirty} />)}
                    </div>
                </div>
            }
            {!loading && response.length === 0 && <div>No orders found</div>}
        </>
    )
}