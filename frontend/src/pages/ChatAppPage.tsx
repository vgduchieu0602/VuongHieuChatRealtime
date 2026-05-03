import Logout from '@/components/auth/Logout'
import { Button } from '@/components/ui/button'
import api from '@/lib/axios'
import { useAuthStore } from '@/stores/useAuthStore'
import React from 'react'
import { toast } from 'sonner'

const ChatAppPage = () => {
  //Cú pháp này đang theo dõi toàn bộ state trong store nên chỉ cần 1 state thay đổi thì component này sẽ re-render
  //Nếu chỉ muốn theo dõi riêng user thì phải viết như này

  //API lấy thông tin người dùng là API được bảo vệ. Bắt buộc phải có accessToken gửi kèm request thì server mới xác minh được người gửi là ai và mới cho phép trả về dữ liệu
  //Cách 1: gán thủ công vào header của request trong fetchMe
  //Cách 2: tạo 1 Axios Intercepter để tự động gán accessToken vào tất cả request gửi đi
  const user = useAuthStore((s) => s.user)

  const handleOnclick = async () => {
    try {
      await api.get("/users/test", {withCredentials: true})
      toast.success("OK")
    } catch (error) {
      console.error(error)
      toast.error("Thất bại")
    }
  }

  return (
    <div>
      {user?.userName}
      <Logout />

      <Button onClick={handleOnclick}>test</Button>
    </div>
  )
}

export default ChatAppPage