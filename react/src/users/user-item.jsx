import axios from "axios";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'

const UserItem = (props) => {
    const {
        _id,
        username,
        email,
        phoneno,
        isAdmin
    } = props.user;

    

    const deleteStudent = () => {
        axios.delete(`http://localhost:8000/users/delete-user/${_id}`)
            .then(res => {
                if(res.status === 200) {
                    alert("User deleted successfully");
                    window.location.reload();
                }
            })
            .catch(err => alert("something went wrong!"))
    }

    return (
        <tr>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phoneno}</td>
            <td>{isAdmin ? "Yes" : "No"}</td>
            <td>
                <Link className="edit-link" to={"/users/edit-user/"+_id}>
                    Edit 
                </Link>
                <Button onClick={deleteStudent} size="sm" variant="danger">
                    Delete 
                </Button>
            </td>
        </tr>
    )
}

export default UserItem;