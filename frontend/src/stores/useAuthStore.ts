import {create} from 'zustand'
import {toast} from 'sonner'
import { authService } from '@/services/auth.service'
import type { AuthState } from '@/types/store'

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({accessToken: null, user: null, loading: false})
    },

    signUp: async (userName, password, email, firstName, lastName) => {
        try {
            set({loading: true})

            await authService.signUp(userName, password, email, firstName, lastName)

            toast.success('Đăng ký thành công!')
        } catch (error) {
            console.error(error)
            toast.error('Đăng ký không thành công!')
        } finally {
            set({loading: false})
        }
    },

    signIn: async (userName, password) => {
        try {
            set({loading: true})

            const {accessToken} = await authService.signIn(userName, password)

            set({accessToken})

            toast.success('Đăng nhập thành công!')
        } catch (error) {
            console.error(error)
            toast.error("Đăng nhập không thành công")
        }
    },

    signOut: async () => {
        try {
            get().clearState()
            await authService.signOut()
            toast.success("Đăng xuất thành công")
        } catch (error) {
            console.error(error);
            toast.error("Lỗi xảy ra khi logout. Hãy thử lại")
        }
    }
}))