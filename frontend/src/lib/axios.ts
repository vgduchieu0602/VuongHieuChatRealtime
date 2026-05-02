import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api':'/api',
    withCredentials: true   //nếu không có thì sẽ không gửi cookie và người dùng có thể bị logout liên tục
})

export default api