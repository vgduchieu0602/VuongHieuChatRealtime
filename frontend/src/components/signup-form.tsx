import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form className="flex h-full flex-col justify-center bg-white px-8 py-6">
            <div className="w-full space-y-4">

              {/* Logo */}
              <div className="flex justify-center">
                <a href="/">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-32 h-32 object-contain"
                  />
                </a>
              </div>

              {/* Title */}
              <div className="space-y-1 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Tạo tài khoản
                </h1>
                <p className="text-sm text-gray-500">
                  Chào mừng bạn! Hãy đăng ký để bắt đầu.
                </p>
              </div>

              {/* Họ và Tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 text-left">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Nguyễn"
                    className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Văn A"
                    className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên đăng nhập
                </label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="username123"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                />
              </div>

              {/* Password */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 8 ký tự"
                  className="h-10 rounded-md border-gray-200 bg-gray-50 text-sm focus:bg-white"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-10 w-full rounded-md bg-gray-900 text-sm font-semibold text-white hover:bg-gray-700"
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
      <div className="text-xs text-balance mt-4 px-4 text-center text-gray-500 *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 *:[a]:">
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