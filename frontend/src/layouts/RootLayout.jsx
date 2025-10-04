
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}