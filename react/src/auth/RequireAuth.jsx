import { useEffect } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom"
import { useAuth } from "./auth_helpers";
import AuthStatus from "./AuthStatus";

export default function RequireAuth() {
    let auth = useAuth()
    let location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if(auth.user === null) {
            return navigate("/login", {state: {from: location}})
        }
    })

    return (<AuthStatus>{useOutlet()}</AuthStatus>)
}