import axios from "axios";
import { json } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000"

const operations = {
    apiPost: (endpoint, jsonData, headers) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.post(endpoint, jsonData, headers)
                resolve(response)
            } catch(error) {
                reject(error)
            }
        })
        
    },
    apiPut: (endpoint, jsonData, headers) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.put(endpoint, jsonData, headers)

                resolve(response.data)
            } catch (err) {
                reject(err) 
            }
        })
    }
    ,
    apiDelete: (endpoint, headers = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(endpoint, headers)

                resolve(response.data)
            } catch (err) {
                reject(err) 
            }
        })
    }
}

export {operations as apiOperations}