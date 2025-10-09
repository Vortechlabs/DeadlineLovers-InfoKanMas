import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AdminKabupatenTopBar from "@/components/AdminKabupatenTopBAr";
import MasyarakatSidebar from "@/components/sidebar/MasyarakatSidebar";
import MasyarakatBottomBar from "@/components/bottombar/MasyarakatBottomBar";

export const MasyarakatLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const sidebarWidth = sidebarCollapsed ? 80 : 288;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-30 h-screen flex flex-col border-r border-gray-200/50 bg-white/80 backdrop-blur-md transition-all duration-300",
          !isMobileSidebarOpen && !isDesktop ? "-translate-x-full" : "translate-x-0"
        )}
        style={{ width: isDesktop ? sidebarWidth : 288 }}
      >
        <MasyarakatSidebar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </aside>

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: isDesktop ? 0 : 0 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-20">
          <AdminKabupatenTopBar 
            toggleSidebar={toggleSidebar} 
          />
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto mb-28 md:mb-0">
          <div className="mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      
      {/* Bottom Bar - Mobile Only */}
      {!isDesktop && <MasyarakatBottomBar />}


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

export default MasyarakatLayout;