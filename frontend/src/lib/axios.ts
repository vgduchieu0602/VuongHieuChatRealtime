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

// Tự động gọi refresh API khi accessToken hết hạn
api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config

    //Những API không cần check
    if(originalRequest.url.includes("/auth/signin") 
        || originalRequest.url.includes("/auth/signup") 
        || originalRequest.url.includes("/auth/refresh")) {
            return Promise.reject(error)
    }

    originalRequest._retryCount = originalRequest._retryCount || 0
    
    if(error.response?.status === 403 && originalRequest._retryCount < 4) {
        originalRequest._retryCount += 1;

        console.log("refresh", originalRequest._retryCount)
        
        try {
            const res = await api.post("/auth/refresh", {withCredentials: true})
            const newAccessToken = res.data.accessToken

            useAuthStore.getState().setAccessToken(newAccessToken)

            //Gắn accessToken mới vào header của request cũ
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

            return api(originalRequest)
        } catch (refreshError) {
            useAuthStore.getState().clearState()
            return Promise.reject(refreshError)
        }
    }

    return Promise.reject(error)
})

export default api