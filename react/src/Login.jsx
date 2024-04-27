import { useState } from "react"
import { useAuth } from "./auth/auth_helpers"
import {useNavigate, useLocation} from 'react-router-dom'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Button, FormGroup, FormLabel} from 'react-bootstrap'


export default function Login() {
    let {signIn} = useAuth()
    let navigate = useNavigate()
    let location = useLocation()

    let state = location.state 
    let from = state ? state.from.pathname : "/"

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required")

    });

    const onSubmit = async (credentials) => {
        console.log("DONE")
        const response = await signIn(credentials.email, credentials.password, () => {})
        response.success ? navigate(from, {replace: true}) : alert(response.message) 
    }
    console.log("DONE")
    return (
        <div className="form-wrapper">
            <Formik initialValues={formValues} onSubmit={onSubmit} enableReinitialize validationSchema={validationSchema}>
                <Form>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Email</FormLabel>
                        <Field name="email" type="email" className="form-control" />
                        <ErrorMessage name="email" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Password</FormLabel>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage name="password" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <Button variant='danger' size="lg" block="block" type="submit">
                        Sign In 
                    </Button>
                </Form>
            </Formik>
        </div>
    )

    // return (
    //     <UserForm
    //      initialValues={formValues}
    //      onSubmit={onSubmit}
    //      enableReinitialize>
    //          Create User 
    //      </UserForm>
    // );
}