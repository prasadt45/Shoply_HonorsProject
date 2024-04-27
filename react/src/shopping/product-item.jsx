import { useState } from "react";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";

export default function ProductItem({product, onAddCart}) {
    let [count, setCount] = useState(0)

    return (
        <Col md={4}>
            <Card className="text-start">
                <Card.Body>
                    <Card.Title className="text-center">{product.name}</Card.Title>
                    <Card.Text>
                        <Row style={{flexDirection: "column", gap: "0.55rem"}}>
                            <Col>
                                Price: {product.price}
                            </Col>
                            <Col style={{display: "flex", gap: "6px"}}>
                                <div>
                                    Quantity: 
                                </div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <button onClick={() => setCount(count-1)} className="btn btn-sm btn-outline-secondary" type="button" style={{borderRightWidth: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}}>-</button>
                                    <div style={{height: "100%", border: "1px solid #6c757d", borderLeftWidth: "0px", borderRightWidth: "0px", paddingLeft: "0.3rem", paddingRight: "0.3rem"}}>{count}</div>
                                    <button onClick={() => setCount(count+1)} type="button" className="btn btn-sm btn-outline-secondary" style={{borderLeftWidth: "0px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}>+</button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Text>
                    <Button variant="primary" onClick={() => onAddCart(product._id, count)}>Add to cart</Button>
                </Card.Body>
            </Card>
        </Col>
        
    )
}