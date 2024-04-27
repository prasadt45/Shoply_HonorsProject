import { useAuth } from "./auth_helpers";

export default function AdminAuth({children}) {
    const auth = useAuth()

    return (
        <>
            {auth.isAdmin && children}
            {!auth.isAdmin && <h1>Not authorized!</h1>}
        </>
    )
}