import axios from "axios";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'

const ProductItem = (props) => {
    const {
        _id,
        name,
        price,
    } = props.product;

    

    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/products/delete-product/${_id}`)
            .then(res => {
                if(res.status === 200) {
                    alert("Product deleted successfully");
                    window.location.reload();
                }
            })
            .catch(err => alert("something went wrong!"))
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <Link className="edit-link" to={"/products/edit-product/"+_id}>
                    Edit 
                </Link>
                <Button onClick={deleteProduct} size="sm" variant="danger">
                    Delete 
                </Button>
            </td>
        </tr>
    )
}

export default ProductItem;