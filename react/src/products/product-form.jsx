import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Button, FormGroup, FormLabel} from 'react-bootstrap'

const ProductForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().positive("Invalid Price").integer("Invalid Price").required("Required"),

    });

    console.log(props)

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Name</FormLabel>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <FormGroup style={{textAlign: 'left', paddingBottom: 1+"rem"}}>
                        <FormLabel>Price</FormLabel>
                        <Field name="price" type="number" className="form-control" />
                        <ErrorMessage name="price" className='d-block invalid-feedback' component="span" />
                    </FormGroup>
                    <Button variant='danger' size="lg" block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default ProductForm;