import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SovereignTerminal from './components/SovereignTerminal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Dedicated Pages
import Home from './pages/Home';
import DossierPage from './pages/DossierPage';
import SystemsPage from './pages/SystemsPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import CredentialsPage from './pages/CredentialsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [toast, setToast] = useState(null);

  const triggerToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#06070a] text-slate-200 overflow-x-hidden font-sans flex flex-col justify-between">
        
        {/* Interactive Cursor Follower */}
        <CustomCursor />

        {/* Minimalist Celestial Particles Canvas */}
        <ParticleBackground />

        {/* Global Navigation Bar */}
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          triggerToast={triggerToast}
        />

        {/* Global Sidebar Navigation Drawer */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          triggerToast={triggerToast}
        />

        {/* Main Routed Content Area */}
        <main className="relative z-10 flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenTerminal={() => setTerminalOpen(true)}
                  triggerToast={triggerToast}
                />
              }
            />
            <Route path="/dossier" element={<DossierPage />} />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route
              path="/contact"
              element={<ContactPage triggerToast={triggerToast} />}
            />
            {/* Fallback to Home */}
            <Route
              path="*"
              element={
                <Home
                  onOpenTerminal={() => setTerminalOpen(true)}
                  triggerToast={triggerToast}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Minimalist Footer */}
        <Footer />

        {/* Interactive CLI Terminal Modal */}
        <SovereignTerminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          triggerToast={triggerToast}
        />

        {/* Toast Alert Notification */}
        <Toast
          toast={toast}
          onClose={() => setToast(null)}
        />
      </div>
    </BrowserRouter>
  );
}
