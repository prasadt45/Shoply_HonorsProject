import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { json } from 'react-router-dom'

axios.defaults.baseURL = "http://localhost:8000"

const apis = {
    useAxiosPost: (endpoint, jsonData, headers) => {
        const [response, setResponse] = useState(null)
        const [error, setError]  = useState("")
        const [loading, setLoading] = useState(false)

        const fetchData = () => {
            axios 
            .post(endpoint, jsonData, headers)
            .then((res) => {
                res.data.success ? setResponse(res.data) : setError(res.data.message)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false))
        }

        useEffect(() => {
            fetchData()
        }, [])

        return {response, error, loading}
    },
    useAxiosGet: (endpoint, headers, dirty) => {
        const [response, setResponse] = useState(null)
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(true)

        const fetchData = useCallback(() => {
            axios 
            .get(endpoint, headers)
            .then((res) => {
                res.data.success ? setResponse(res.data.data) : setError(res.data.message)
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
        }, [endpoint, headers])

        useEffect(() => {
            fetchData()
        }, [dirty])
        return {response, error, loading}
    }
}

export {apis as apiHooks}