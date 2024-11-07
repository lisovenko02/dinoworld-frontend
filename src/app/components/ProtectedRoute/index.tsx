import { useUser } from '@/app/(root)/dashboardWrapper'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/sign-in')
    }
  }, [user, router])

  return user ? <>{children}</> : null
}

export default ProtectedRoute
