import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 absolute inset-0 z-0" style={{
        backgroundImage: "var(--gradient-blue)"
      }}>
        <div className="w-full max-w-sm md:max-w-4xl">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
