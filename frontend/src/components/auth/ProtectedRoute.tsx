import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import AppLoading from '../ui/AppLoading'

const ProtectedRoute = () => {
    const {accessToken, user, loading, refresh, fetchMe} = useAuthStore()
    const [starting, setStarting] = useState(true)

    //Chạy lúc hàm được render lần đầu để kiểm tra xem có accessToken hay không
    const init = async () => {
      if(!accessToken) {
        await refresh()
      }

      if(accessToken && !user) {
        await fetchMe()
      }

      setStarting(false)
    }

    useEffect(() => {
      init()
    }, [])

    /**
     * Nếu chỉ xét trường hợp loading thì accessToken sẽ được gán vào store ngay lập tức -> load trang không có vấn đề
     * Nếu chủ động reload lại trang thì các state trong store sẽ bị reset accessToken tạm thời bị mất
     * Kiểm tra mỗi loading -> loading chỉ bật lên khi đang gọi API 
     * Ngay thời điểm component vừa reset lại state thì refresh hay là fetchMe chưa kịp chạy -> {loading:false, accessToken: null}
     * Tưởng người dùng chưa đăng nhập -> redirect về trang signin
     */
    if(starting || loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <AppLoading />
        </div>
      )
    }

    if(!accessToken) {
        return (
            <Navigate to="/signin" replace />
        )
    }
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute