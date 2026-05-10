import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { z } from "zod"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Label } from "../ui/label"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"

const signUpSchema = z.object({
  firstName: z.string().min(1, "Tên là bắt buộc"),
  lastName: z.string().min(1, "Họ là bắt buộc"),
  userName: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {signUp} = useAuthStore()
  const navigate = useNavigate()

  //register là hàm lấy ra giá trị các ô input
  //handleSubmit là hàm sẽ chạy khi người dùng ấn đăng ký
  //formState là object chứa các thông tin về trạng thái của form
  //errors: chứa lỗi nếu input không hợp lệ
  //isSubmitting: để biết khi nào form đang trong quá trình gửi dữ liệu
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data:SignUpFormValues) => {
    const {userName, password, email, firstName, lastName} = data

    await signUp(userName, password, email, firstName, lastName)

    navigate("/signin")
  }
  
  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-4",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden rounded-xl border-0 shadow-xl p-0 m-0">
        <CardContent className="grid p-0 md:grid-cols-2 min-h-[640px]">

          {/* Left: Form */}
          <form className="flex h-full flex-col justify-center bg-white px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full space-y-4">

              {/* Logo */}
              <div className="flex justify-center">
                <a href="/">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-24 h-24 object-contain"
                  />
                </a>
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Tạo tài khoản
                </h2>
                <p className="text-sm text-gray-500">
                  Chào mừng bạn! Hãy đăng ký để bắt đầu.
                </p>
              </div>

              {/* Họ và Tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-left">
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Vương Đức"
                    className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                    {...register('lastName')}
                  />

                  {errors.lastName && (
                    <p className="min-h-[16px] text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="text-left">
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Hiếu"
                    className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                    {...register('firstName')}
                  />

                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1 text-left">
                <Label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên đăng nhập
                </Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="username123"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                  {...register('userName')}
                />

                {errors.userName && (
                    <p className="text-red-500 text-sm">{errors.userName.message}</p>
                  )}
              </div>

              {/* Email */}
              <div className="space-y-1 text-left">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                  {...register('email')}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
              </div>

              {/* Password */}
              <div className="space-y-1 text-left">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 8 ký tự"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                  {...register('password')}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-10 w-full rounded-md bg-gray-900 text-sm font-semibold text-white hover:bg-gray-700"
                disabled={isSubmitting}
              >
                Tạo tài khoản
              </Button>

              {/* Sign in */}
              <p className="text-center text-sm text-gray-500">
                Đã có tài khoản?{" "}
                <a
                  href="/signin"
                  className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
                >
                  Đăng nhập
                </a>
              </p>
            </div>
          </form>

          {/* Right: Image */}
          <div className="relative hidden h-full md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Sign up visual"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-balance mt-4 px-4 text-center text-gray-500 *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <a
          href="#"
          className="underline underline-offset-2 hover:text-gray-600"
        >
          Điều khoản dịch vụ
        </a>{" "}
        và{" "}
        <a
          href="#"
          className="underline underline-offset-2 hover:text-gray-600"
        >
          Chính sách bảo mật
        </a>{" "}
        của chúng tôi.
      </div>
    </div>
  )
}