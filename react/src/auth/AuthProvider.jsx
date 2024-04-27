import { createContext, useState } from 'react'
import apiAuthProvider from './authApiProvider';


const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null);
    let [isAdmin, setIsAdmin] = useState(false);

    let signIn = async (email, password, callback) => {
        console.log(`EMAIL: ${email}`)

        const response = await apiAuthProvider.signIn({email, password}, (user, message) => {
            callback(user, message);
        })

        console.log(response)

        response.success && setUser(response.data);
        response.success && setIsAdmin(response.data.isAdmin)

        return {success: response.success, message: response.message}
    }

    let signOut = (callback) => {
        return apiAuthProvider.signOut(() => {
            setUser(null);
            setIsAdmin(false)
            callback()
        })
    }

    let value = {user, isAdmin, signIn, signOut}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}