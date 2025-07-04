import RegisterForm from '@/components/register-form'

export default function register() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
