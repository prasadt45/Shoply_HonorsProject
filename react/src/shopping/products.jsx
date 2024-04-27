import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/auth_helpers"
import { apiHooks } from "../apis/hooks"
import { apiOperations } from "../apis/operations"
import ProductItem from "./product-item"
import { Row } from "react-bootstrap"

export default function Products() {
    let [cart, setCart] = useState([])
    let [sum, setSum] = useState(0)
    let [ordered, setOrdered] = useState(false)

    const navigate = useNavigate()
    const {user} = useAuth()

    const [dirty, setDirty] = useState(new Date())

    const { response, error, loading } = apiHooks.useAxiosGet('/products', {headers: {accept: '*/*'}}, dirty)
    
    console.log(error)
    const addToCart = (id, count) => {
        const newCart = [...cart.filter(c => c._id !== id), {...response.filter(p => p._id === id)[0], qty: count}]

        setCart(newCart)

        let total = 0
        newCart.map(c => total += (c.price * c.qty))
        setSum(total)
    }

    const doOrder = async ()  => {
        const payload = cart.map(c => ({id: c._id, qty: c.qty}))
        console.log(payload)

        try {
            const response = await apiOperations.apiPost("/orders", payload, {headers: {accept: "/*/", uid: user._id}})
            console.log(response)
            setOrdered(true)
        } catch(error) {
            console.log("ERROR: " + error)
        }
    }

    const doContinue = () => {
        setSum(0)
        setCart([])
        setOrdered(false)
    }

    const onMyOrders = () => {
        navigate("/myorders")
    }

    return (
        <>
            {!ordered && 
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col col-2 text-end" style={{marginBottom: "1em"}}>
                            <button type="button" onClick={onMyOrders} className="btn btn-sm btn-warning">Your Orders</button>
                        </div>
                    </div>
                </div>
            }
            {loading && <div>Loading...</div>}

            {!loading && response.length > 0 && !ordered &&
                <Row md={2} style={{rowGap: "1rem"}}>
                    {response.map(p => {
                        return (<ProductItem product={p} onAddCart={addToCart} key={p._id} />)
                    })}
                </Row>
                    
                
            }

            {!loading && !ordered && 
                <div className="row justify-content-center" style={{marginTop: "1rem"}}>
                    <div className="col col-2">
                        <b>Total: {sum}</b>&nbsp;
                        <button type="button" disabled={sum > 0 ? false : true} onClick={doOrder} className="btn btn-sm btn-warning">Place Order</button>
                    </div>

                </div>
            }

            {ordered && 
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-6 text-center">
                            <h1>Order Placed Successfully</h1>
                            <div className="col text-center">
                                <button type="button" onClick={doContinue} className="btn btn-sm btn-warning">Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        
        </>
    )


}