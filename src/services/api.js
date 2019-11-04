import axios from 'axios'

const api = axios.create({baseURL: `http://localhost:3000/odata/v2/`})

export default api;