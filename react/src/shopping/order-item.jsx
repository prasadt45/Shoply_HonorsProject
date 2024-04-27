export default function OrderItem({dateOrdered, products}) {
    return (
        <div className="col-12" key={products._id}>
            <div className="card" style={{margin: "0.5em", marginLeft: "0px", backgroundColor: "#fcfcfc"}}>
                <div className="card-body" style={{textAlign: "start"}}>
                    <h5 className="card-title">Ordered on: {new Date(dateOrdered).toLocaleString() } </h5>
                    <div className="card-text" style={{marginBottom: "0.5em"}}>
                        <div className="container">
                            {
                                products.map(p => (
                                    <div className="row" key={p._id}>
                                        <div className="col-4" style={{paddingLeft: "0px"}}>Product: <b>{p.name}</b></div>
                                        <div className="col-4">Quantity: <b>{p.qty}</b></div>
                                        <div className="col-4">Price: <b>{p.total}</b></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}