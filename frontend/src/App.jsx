import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <AppRoutes />
              <Toaster richColors theme="system" position="top-center" />
            </TooltipProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
