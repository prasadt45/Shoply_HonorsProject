import axios from "axios";
import { useEffect, useState } from "react"
import ProductForm from "./product-form";
import {useNavigate} from "react-router-dom";

const EditProduct = (props) => {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
    });

    const navigate = useNavigate()

    const onSubmit = (productObject) => {
        axios.put(`http://localhost:8000/products/update-product/${props.id}`, productObject)
            .then(res => {
                if(res.status === 200) {
                    alert("Product Updated!")
                    return navigate("/products/")
                }
            })
            .catch(err => {
                alert("something went akfgldjf wrong!")
                console.log(err)
            })
    }

    

    useEffect(() => {
        // console.log(params)
        axios.get(`http://localhost:8000/products/update-product/${props.id}`)
            .then(res => {
                const {name, price} = res.data;

                setFormValues({
                    name,
                    price,
                })
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <ProductForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
                Update Product  
            </ProductForm>
    )
}

export default EditProduct;
