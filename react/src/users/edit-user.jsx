import axios from "axios";
import { useEffect, useState } from "react"
import UserForm from "./user-form";
import {  useNavigate } from "react-router-dom";

const EditUser = (props) => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        phoneno: ''
    });

    const navigate = useNavigate()

    const onSubmit = (userObject) => {
        axios.put(`http://localhost:8000/users/update-user/${props.id}`, userObject)
            .then(res => {
                if(res.status === 200) {
                    alert("Student Updated!")
                    return navigate("/users/")
                }
            })
            .catch(err => {
                alert("something went akfgldjf wrong!")
                console.log(err)
            })
    }

    

    useEffect(() => {
        // console.log(params)
        axios.get(`http://localhost:8000/users/update-user/${props.id}`)
            .then(res => {
                const {username, email, phoneno, password, isAdmin} = res.data;

                setFormValues({
                    username,
                    email,
                    phoneno,
                    password,
                    isAdmin 
                })
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <UserForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
                Update User 
            </UserForm>
    )
}

export default EditUser;
