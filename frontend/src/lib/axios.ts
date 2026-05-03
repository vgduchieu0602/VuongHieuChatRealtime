import { useAuthStore } from '@/stores/useAuthStore'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api':'/api',
    withCredentials: true   //nếu không có thì sẽ không gửi cookie và người dùng có thể bị logout liên tục
})

//Gắn accessToken vào req header
api.interceptors.request.use((config) => {
    //chỉ lấy giá trị của accessToken tại thời điểm dòng code này chạy. Nếu sau đó accessToken trong store thay đổi 
    //thì biến accessToken trong hàm này vẫn giữ nguyên.
    //Nếu sử dụng useAuthStore thì sẽ tự động cập nhật mỗi khi state trong store thay đổi. Nếu có token thì mình sẽ 
    //thêm vào phần authorization trong headers
    const {accessToken} = useAuthStore.getState()

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

export default api