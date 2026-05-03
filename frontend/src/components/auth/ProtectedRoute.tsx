import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

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

    if(starting || loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Đang tải trang...
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