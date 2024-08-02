import axios from "axios"

const backendUrl = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL
})

export default backendUrl