import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Button, FormGroup, FormLabel} from 'react-bootstrap'

const UserForm = (props) => {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email entered!").required("Required"),
        phoneno: Yup.number().positive("Invalid Phone No").integer("Invalid Roll No").test('len', "Enter valid mobile number", val => val.toString().length === 10).required("required"),
        password: Yup.string().required("Required"),
        isAdmin: Yup.boolean().required("Required") 
    });

    console.log(props)

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Username</FormLabel>
                        <Field name="username" type="text" className="form-control" />
                        <ErrorMessage name="username" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Email</FormLabel>
                        <Field name="email" type="text" className="form-control" />
                        <ErrorMessage name="email" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Phone No</FormLabel>
                        <Field name="phoneno" type="number" className="form-control" />
                        <ErrorMessage name="phoneno" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Password</FormLabel>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage name="password" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel className='form-check-label' style={{marginRight: "0.5rem"}}>Admin</FormLabel>
                        <Field name="isAdmin" type="checkbox" className="form-check-input" />
                        <ErrorMessage name="isAdmin" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <Button variant='danger' size="lg" block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default UserForm;