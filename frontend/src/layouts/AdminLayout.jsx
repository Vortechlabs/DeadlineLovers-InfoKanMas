
import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import  { AdminPusatSidebar } from "@/components/sidebar/AdminPusatSidebar";
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
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-30 h-screen flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300",
        isDesktop ? "w-64" : "w-80",
        !isMobileSidebarOpen && !isDesktop ? "-translate-x-[100dvw]" : "translate-x-0"
      )}>
        <AdminPusatSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 md:ml-8">
          <AdminPusatTopBar toggleSidebar={toggleSidebar} />
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto py-4 md:mt-0">
          <div className="mx-auto w-full max-w-[calc(100%-2rem)] bg-background rounded-lg p-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {!isDesktop && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};