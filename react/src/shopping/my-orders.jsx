import { useState } from "react";
import { useAuth } from "../auth/auth_helpers";
import { Link } from "react-router-dom";
import OrderItem from "./order-item";
import { apiHooks } from "../apis/hooks";

export default function MyOrders() {
    const {user} = useAuth()

    const [dirty, setDirty] = useState(new Date())
    let {response, error, loading} = apiHooks.useAxiosGet("/orders", {headers:{accept: "/*/", uid: user._id}}, dirty)
    
    if(response === null) {
        response = []
    }

    console.log(response)
    response.map(order => console.log(order))

    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-2"><h2>Your Orders</h2></div>
                    <div className="col-2"><Link className="btn btn-sm btn-warning" to="/" style={{padding: 5}}>Continue Shopping</Link></div>
                </div>
            </div>
            {loading && <div>loading...</div>}
            {!loading && 
                <div className="container">
                    <div className="row">
                        {
                            response.map(item => item.orders.map(order => <OrderItem key={order._id} dateOrdered={order.addedAt} products={order.products} />))
                        }
                    </div>
                </div>
            }
        </>
    )
}