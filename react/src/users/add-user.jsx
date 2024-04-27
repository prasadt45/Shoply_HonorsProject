import { useState } from "react"
import axios from 'axios'
import UserForm from "./user-form"

export default function AddUser() {


    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        phoneno: '',
        password: '',
        isAdmin: false 
    })

        const onSubmit = (userObject) => {
        axios.post('http://localhost:8000/users/create', userObject)
            .then(res => {
                if(res.status === 200) {
                    alert("User created successfully")
                }
            })
            .catch(err => alert('something went wrong'))
    }

    return (
        <UserForm
         initialValues={formValues}
         onSubmit={onSubmit}
         enableReinitialize>
             Create User 
         </UserForm>
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