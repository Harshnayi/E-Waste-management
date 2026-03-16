import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Facilities from "./pages/Facilities";
import Rewards from "./pages/Rewards";
import Hazards from "./pages/Hazards";
import Education from "./pages/Education";
import Report from "./pages/Report";
import Enterprise from "./pages/Enterprise";
import Recycle from "./pages/Recycle";
import Policy from "./pages/Policy";
import SignIn from "./pages/SignIn";
import GetStarted from "./pages/GetStarted";
import Identification from "./pages/Identification";
import RecycleWorkflow from "./pages/RecycleWorkflow";
import Tracking from "./pages/Tracking";
import ImpactCertificate from "./pages/ImpactCertificate";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "next-themes";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/get-started" element={<GetStarted />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
              <Route path="/hazards" element={<ProtectedRoute><Hazards /></ProtectedRoute>} />
              <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
              <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
              <Route path="/enterprise" element={<ProtectedRoute><Enterprise /></ProtectedRoute>} />
              <Route path="/recycle" element={<ProtectedRoute><Recycle /></ProtectedRoute>} />
              <Route path="/policy" element={<ProtectedRoute><Policy /></ProtectedRoute>} />
              <Route path="/identify" element={<ProtectedRoute><Identification /></ProtectedRoute>} />
              <Route path="/recycle/:category" element={<ProtectedRoute><RecycleWorkflow /></ProtectedRoute>} />
              <Route path="/tracking/:id" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
              <Route path="/certificate/:id" element={<ProtectedRoute><ImpactCertificate /></ProtectedRoute>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
