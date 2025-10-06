
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}