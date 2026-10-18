import React, { useState, useEffect } from 'react';
import { StudentProfile } from './types/student';
import {
  getStoredProfile,
  saveStoredProfile,
  isUserLoggedIn,
  setLoggedInState,
  SAMPLE_PORTRAITS,
} from './utils/storage';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { CardView } from './views/CardView';
import { OffersView } from './views/OffersView';
import { QRCodeView } from './views/QRCodeView';
import { LoginView } from './views/LoginView';
import { QRCodeModal } from './components/QRCodeModal';
import { EditProfileModal } from './components/EditProfileModal';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('carteirinha');
  
  // Modals
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedProfile = getStoredProfile();
    const loggedIn = isUserLoggedIn();

    if (savedProfile && loggedIn) {
      setProfile(savedProfile);
      setIsLogged(true);
    } else if (savedProfile && !loggedIn) {
      setProfile(savedProfile);
      setIsLogged(false);
    } else {
      // Default initial mock profile if fresh visitor
      const defaultProfile: StudentProfile = {
        nome: 'Kaique',
        sobrenome: 'Bezerra Deus',
        curso: 'Ciências Econômicas',
        matricula: 'RA00223241',
        validade: '06/2026',
        semestre: '5º semestre',
        fotoUrl: SAMPLE_PORTRAITS[0].url,
        sponsorLogoUrl: null,
        faculdadeNome: 'PUC-SP',
      };
      setProfile(defaultProfile);
      saveStoredProfile(defaultProfile);
      setIsLogged(true);
      setLoggedInState(true);
    }
  }, []);

  const handleLoginSuccess = (userProfile: StudentProfile) => {
    setProfile(userProfile);
    setIsLogged(true);
    setActiveTab('carteirinha');
  };

  const handleLogout = () => {
    setLoggedInState(false);
    setIsLogged(false);
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveStoredProfile(updated);
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

  // If user is not logged in, render the login view
  if (!isLogged || !profile) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-slate-800 flex flex-col items-center">
      {/* Mobile-first centered frame with authentic phone proportions on desktop */}
      <div className="w-full max-w-md min-h-screen bg-[#F4F4F4] flex flex-col relative shadow-2xl shadow-slate-300/60 border-x border-slate-200/60">
        {/* Sticky Blue Header with Back Arrow and Centered Tab Title */}
        <Header
          title={getHeaderTitle()}
          onBack={handleHeaderBack}
          showBack={activeTab !== 'inicio'}
        />

        {/* Main Content Area based on Active Tab */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'inicio' && (
            <HomeView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onOpenEditModal={() => setIsEditModalOpen(true)}
              onLogout={handleLogout}
            />
          )}

          {activeTab === 'carteirinha' && (
            <CardView
              profile={profile}
              onOpenQR={() => setIsQRModalOpen(true)}
              onOpenEditModal={() => setIsEditModalOpen(true)}
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

        {/* Edit Profile & Photo Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={handleUpdateProfile}
        />
      </div>
    </div>
  );
}
