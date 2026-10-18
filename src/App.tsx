import React, { useState, useEffect } from 'react';
import { StudentProfile } from './types/student';
import {
  getActiveProfile,
  saveProfileToStorage,
  clearActiveSession,
} from './utils/storage';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { CardView } from './views/CardView';
import { OffersView } from './views/OffersView';
import { QRCodeView } from './views/QRCodeView';
import { LoginView } from './views/LoginView';
import { QRCodeModal } from './components/QRCodeModal';
import { SettingsModal } from './components/SettingsModal';
import { Settings } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('carteirinha');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Modals
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Load active session from localStorage (NO DEFAULT PROFILES, NO AUTO LOGIN)
  useEffect(() => {
    const active = getActiveProfile();
    if (active) {
      setProfile(active);
      setIsLogged(true);
    } else {
      setProfile(null);
      setIsLogged(false);
    }
    setIsInitialized(true);
  }, []);

  const handleLoginSuccess = (userProfile: StudentProfile) => {
    setProfile(userProfile);
    setIsLogged(true);
    setActiveTab('carteirinha'); // Enters directly into Carteirinha Digital
  };

  const handleLogout = () => {
    clearActiveSession();
    setIsLogged(false);
    setProfile(null);
    setIsSettingsOpen(false);
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveProfileToStorage(updated);
  };

  const getHeaderTitle = (): string => {
    switch (activeTab) {
      case 'inicio':
        return 'Início';
      case 'carteirinha':
        return 'Carteirinha';
      case 'ofertas':
        return 'Ofertas';
      case 'qrcode':
        return 'QRCode';
      default:
        return 'Carteirinha';
    }
  };

  const handleHeaderBack = () => {
    if (activeTab !== 'inicio') {
      setActiveTab('inicio');
    }
  };

  // Wait for initial check
  if (!isInitialized) {
    return <div className="min-h-screen bg-[#F4F4F4]" />;
  }

  // If user is not logged in, ALWAYS render the Login View
  if (!isLogged || !profile) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-slate-800 flex flex-col items-center">
      {/* Mobile-first centered frame with authentic phone proportions */}
      <div className="w-full max-w-md min-h-screen bg-[#F4F4F4] flex flex-col relative shadow-2xl shadow-slate-300/60 border-x border-slate-200/60">
        {/* Sticky Blue Header with Back Arrow, Centered Tab Title, and conditional Settings Gear on QRCode tab */}
        <Header
          title={getHeaderTitle()}
          onBack={handleHeaderBack}
          showBack={activeTab !== 'inicio'}
          rightAction={
            activeTab === 'qrcode' ? (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-10 h-10 -mr-1 rounded-full flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                title="Configurações"
                aria-label="Abrir Configurações"
              >
                <Settings size={21} />
              </button>
            ) : null
          }
        />

        {/* Main Content Area based on Active Tab */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'inicio' && <HomeView profile={profile} />}

          {activeTab === 'carteirinha' && (
            <CardView
              profile={profile}
              onOpenQR={() => setIsQRModalOpen(true)}
            />
          )}

          {activeTab === 'ofertas' && <OffersView />}

          {activeTab === 'qrcode' && (
            <QRCodeView
              profile={profile}
              onOpenQRModal={() => setIsQRModalOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

        {/* QR Code Celebration Modal ("Turma de sempre! 🎓") */}
        <QRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          profile={profile}
        />

        {/* Settings Modal triggered by Gear button in QRCode tab */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
