import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AdminPusatSidebar } from "@/components/sidebar/AdminPusatSidebar";
import { cn } from "@/lib/utils";
import AdminPusatTopBar from "@/components/TopBar";

export const AdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      if (window.innerWidth > 768) setIsMobileSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-40 h-full flex flex-col border-r bg-white transition-transform duration-300",
        isDesktop ? "w-72" : "w-80",
        !isMobileSidebarOpen && !isDesktop ? "-translate-x-full" : "translate-x-0"
      )}>
        <AdminPusatSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <AdminPusatTopBar toggleSidebar={toggleSidebar} />
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {!isDesktop && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};