import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import ProductItem from './product-item'

export default function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/products/")
            .then(res => {
                setProducts(res.data.data) 
            })
            .catch(err => console.log("ERROR" + err))
    }, [])


    const DataTable = () => {
        return products.map((res, i) => {
            return <ProductItem product={res} key={i} />
        })
    }


    return (
        <div className="table-wrapper">
             <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
               </thead>
               <tbody>
                   {DataTable()}
               </tbody>
            </Table>
        </div>
    )
}


// import axios from "axios"
// import { useDebugValue, useEffect, useState } from "react"
// import { Table } from "react-bootstrap"
// import UserItem from './user-item'

// const UserList = () => {
//     const [users, setUsers] = useState([])

//     useEffect(() => {
//         axios.get("http://localhost:8000/users/")
//             .then(res => {
//                 setUsers(res.data) 
//             })
//             .catch(err => console.log(err))
//     }, [])

//     const DataTable = () => {
//         return users.map((res, i) => {
//             return <UserItem user={res} key={i} />
//         })
//     }

//     return (
//         <div className="table-wrapper">
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Roll No</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {DataTable()}
//                 </tbody>
//             </Table>
//         </div>
//     )
// }

// export default UserList;