import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Achievements from './pages/Achievements';
import Capital from './pages/Capital';
import Clan from './pages/Clan';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { PlayerStats, MatchHistory } from './types/game';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [matchHistory, setMatchHistory] = useState<MatchHistory[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayerSearch = async (gameId: string, nickname: string) => {
    setIsLoading(true);
    try {
      const { searchPlayerStats } = await import('./api');
      const data = await searchPlayerStats(gameId, nickname);
      
      setPlayerStats(data.stats);
      setMatchHistory(data.matches);
      setSelectedGameId(gameId);
      setActiveTab('stats');
    } catch (error: any) {
      console.error("Ошибка при поиске:", error);
      alert(error.message || "Не удалось загрузить статистику.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-bg text-text font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'home' && <Dashboard onSearch={handlePlayerSearch} isLoading={isLoading} />}
        
        {activeTab === 'stats' && (
          <Statistics 
            stats={playerStats} 
            matches={matchHistory} 
            gameId={selectedGameId}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'achievements' && <Achievements />}
        {activeTab === 'capital' && <Capital />}
        {activeTab === 'clan' && <Clan />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'settings' && <Settings />}
        
        {['achievements', 'capital', 'clan', 'profile', 'settings'].indexOf(activeTab) === -1 && 
         activeTab !== 'home' && activeTab !== 'stats' && (
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