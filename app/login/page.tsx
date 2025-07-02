import LoginForm from '@/components/login-form'

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}
