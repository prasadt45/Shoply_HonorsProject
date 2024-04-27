import { useState } from "react"
import axios from 'axios'
import ProductForm from "./product-form"

export default function AddProduct() {


    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
    })

        const onSubmit = (productObject) => {
        axios.post('http://localhost:8000/products/create', productObject)
            .then(res => {
                if(res.status === 200) {
                    alert("Product created successfully")
                }
            })
            .catch(err => alert('something went wrong'))
    }

    return (
        <ProductForm
         initialValues={formValues}
         onSubmit={onSubmit}
         enableReinitialize>
             Create Product  
         </ProductForm>
    );
}

// import { useState } from "react"
// import axios from 'axios'
// import UserForm from "./user-form"

// const CreateUser = () => {
//     const [formValues, setFormValues] = useState({
//         name: '',
//         email: '',
//         rollno: ''
//     })

//     const onSubmit = (studentObject) => {
//         axios.post('http://localhost:8000/users/create', studentObject)
//             .then(res => {
//                 if(res.status === 200) {
//                     alert("User created successfully")
//                 }
//             })
//             .catch(err => alert('something went wrong'))
//     }

//     return (
//         <UserForm
//         initialValues={formValues}
//         onSubmit={onSubmit}
//         enableReinitialize>
//             Create User 
//         </UserForm>
        
//     )
// }

// export default CreateUser;