import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth_helpers";
import { useEffect } from "react";

export default function AuthStatus({children}) {
    let {user, signOut } = useAuth()
    let navigate = useNavigate()

    return (
        <>
            {user !== null && 
            <div className="container">
                <div className="row justify-content-end align-items-center" style={{marginBottom: "1em", marginTop: "1em"}}>
                    <div className="col col-4 text-md">
                        Welcome {user.username}!
                    </div>
                    <div className="col col-1 justify-content-end">
                        <button className="btn btn-success btn-sm" onClick={() => {
                            signOut(() => navigate("/", {replace: true}))
                        }}>
                            Sign out
                        </button>
                    </div>
                </div>
                <div className="row">
                    {children}
                </div>
            </div>
            }

        </>
    )
}