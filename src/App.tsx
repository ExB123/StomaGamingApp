import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Achievements from './pages/Achievements';
import Capital from './pages/Capital';
import Clan from './pages/Clan';
import Profile from './pages/Profile';
import Settings from './pages/Settings'; // <-- Добавлено

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex h-screen w-screen bg-bg text-text font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'home' && <Dashboard />}
        {activeTab === 'stats' && <Statistics />}
        {activeTab === 'achievements' && <Achievements />}
        {activeTab === 'capital' && <Capital />}
        {activeTab === 'clan' && <Clan />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'settings' && <Settings />} {/* <-- Добавлено */}
        
        {activeTab !== 'home' && activeTab !== 'stats' && activeTab !== 'achievements' && activeTab !== 'capital' && activeTab !== 'clan' && activeTab !== 'profile' && activeTab !== 'settings' && (
          <div className="flex items-center justify-center h-full text-textMuted">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Раздел в разработке</h2>
              <p>Здесь будет страница "{activeTab}"</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;