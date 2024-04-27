import { apiOperations } from "../apis/operations"
import { useAuth } from "../auth/auth_helpers"

export default function DeleteOrder({setOnDirty, id}) {
    const {user} = useAuth()

    const onDeleteOrder = async (event) => {
        event.preventDefault()

        try {
            const response = await apiOperations.apiDelete(`/orders/${id}`, {headers: {accept: "/*/", uid: user._id}})
            console.log(response)
            if(response.success !== true) {
                console.error(response.message)
            } else {
                console.log("GELLG")
                setOnDirty(new Date())
            }
        } catch(error) {
            console.error("ERROR: " + error)
        }
    }

    return (
        <>
            <button className="btn" type="button" style={{color: "red", padding: "3px 6px" }} data-bs-toggle="modal" data-bs-target={`#del_${id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
            <div className="modal fade" id={`del_${id}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Order</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onDeleteOrder} noValidate>
                                <div className="container">
                                    <div className="row justify-content-center">Are you sure you want to delete orderr?</div>
                                    <div className="row justify-content-center" style={{marginTop: "0.5em"}}>
                                        <div className="col col-sm-2 text-end" style={{marginTop: "0.5em"}}>
                                            <button type="submit" name="submit" data-bs-dismiss="modal" className="btn btn-danger btn-sm">Yes</button>
                                        </div>
                                         <div className="col col-sm-2 text-start" style={{marginTop: "0.5em"}}>
                                            <button type="button" data-bs-dismiss="modal" className="btn btn-success btn-sm">No</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}