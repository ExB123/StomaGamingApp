import { useState } from 'react';
import { Search, Gamepad2, ChevronRight, Trophy, Loader2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Game } from '../types/game';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Список доступных игр
const availableGames: Game[] = [
  { id: 'warface', name: 'Warface', icon: '🎮', platform: 'PC' },
  { id: 'clash', name: 'Clash of Clans', icon: '⚔️', platform: 'Mobile' },
  { id: 'brawl', name: 'Brawl Stars', icon: '💀', platform: 'Mobile' },
  { id: 'pubg', name: 'PUBG Mobile', icon: '🪖', platform: 'Mobile' },
  { id: 'valorant', name: 'Valorant', icon: '🔴', platform: 'PC' },
];

// Моковые данные для превью (показываются до поиска)
const recentMatches = [
  { result: 'Победа', mode: 'Командный бой', date: 'Сегодня, 14:32', score: '23 / 10', damage: '2 450', kd: '+24', type: 'win' },
  { result: 'Поражение', mode: 'Подрыв', date: 'Сегодня, 13:10', score: '8 / 14', damage: '1 250', kd: '-18', type: 'loss' },
  { result: 'Победа', mode: 'Мясорубка', date: 'Вчера, 20:45', score: '30 / 16', damage: '3 210', kd: '+31', type: 'win' },
];

const chartData = {
  labels: ['01.05', '08.05', '15.05', '22.05', '29.05'],
  datasets: [
    {
      label: 'Рейтинг',
      data: [2100, 2250, 2300, 2450, 2532],
      borderColor: '#6C5DD3',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(108, 93, 211, 0.5)');
        gradient.addColorStop(1, 'rgba(108, 93, 211, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6C5DD3',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#161822',
      titleColor: '#fff',
      bodyColor: '#94A3B8',
      borderColor: '#232633',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
    },
  },
  scales: {
    x: { grid: { display: false, drawBorder: false }, ticks: { color: '#94A3B8', font: { size: 10 } } },
    y: { grid: { color: '#232633', borderDash: [5, 5] }, ticks: { color: '#94A3B8', font: { size: 10 } }, beginAtZero: false },
  },
};

interface DashboardProps {
  onSearch: (gameId: string, nickname: string) => void;
  isLoading: boolean;
}

export default function Dashboard({ onSearch, isLoading }: DashboardProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [nickname, setNickname] = useState('');

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setNickname(''); // Сброс ника при смене игры
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGame && nickname.trim()) {
      onSearch(selectedGame.id, nickname.trim());
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер: Заголовок и Поиск (активен только если игра выбрана) */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Твоя статистика <br /><span className="text-accent">под контролем</span></h1>
          <p className="text-textMuted text-sm">
            {selectedGame 
              ? `Введите никнейм для поиска в ${selectedGame.name}` 
              : 'Выберите игру из списка ниже, чтобы начать поиск'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
          <input 
            type="text" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!selectedGame || isLoading}
            placeholder={selectedGame ? "Введи никнейм..." : "Сначала выберите игру"}
            className={`w-full bg-surface border rounded-xl py-3 pl-10 pr-12 text-sm focus:outline-none transition-colors placeholder-textMuted/50
              ${!selectedGame 
                ? 'border-border opacity-50 cursor-not-allowed' 
                : isLoading 
                  ? 'border-border opacity-70' 
                  : 'border-border focus:border-accent'
              }`}
          />
          <button 
            type="submit"
            disabled={!selectedGame || !nickname.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold px-4 py-1.5 rounded-lg transition-all flex items-center gap-1
              ${(!selectedGame || !nickname.trim() || isLoading)
                ? 'bg-border text-textMuted cursor-not-allowed'
                : 'bg-accent hover:bg-accentHover text-white'
              }`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'Поиск'}
          </button>
        </form>
      </div>

      {/* Доступные игры (бывшие Популярные) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Доступные игры</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {availableGames.map((game) => (
            <div 
              key={game.id} 
              onClick={() => handleGameSelect(game)}
              className={`min-w-[140px] bg-surface border rounded-xl p-4 flex flex-col items-center gap-3 transition-all cursor-pointer group relative overflow-hidden
                ${selectedGame?.id === game.id 
                  ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(108,93,211,0.3)]' 
                  : 'border-border hover:border-accent/50 hover:bg-surface/80'
                }`}
            >
              {selectedGame?.id === game.id && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              )}
              <div className={`text-3xl transition-transform ${selectedGame?.id === game.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {game.icon}
              </div>
              <span className="text-sm font-medium">{game.name}</span>
              <span className="text-[10px] text-textMuted uppercase tracking-wider bg-bg/50 px-2 py-0.5 rounded">{game.platform}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Карточка Warface (Превью / Пример) - Показываем только если ничего не выбрано или как демо */}
      {!selectedGame && (
        <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden opacity-60 pointer-events-none grayscale">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Gamepad2 className="text-accent" size={24} />
              <h3 className="text-xl font-bold">Warface <span className="text-textMuted text-sm font-normal ml-2">PC</span></h3>
            </div>
            <div className="flex items-center gap-1 text-textMuted text-sm font-medium">
              Выберите игру для просмотра <ChevronRight size={16} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col justify-between bg-bg/50 rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center shadow-lg">
                  <Trophy className="text-white" size={32} />
                </div>
                <div>
                  <div className="text-xs text-textMuted uppercase tracking-wider">Ранг</div>
                  <div className="font-bold text-lg">--</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Рейтинг</div>
                <div className="text-2xl font-bold text-textMuted">--</div>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ label: 'Матчи', value: '--' }, { label: 'Победы', value: '--' }, { label: 'У/С', value: '--' }, { label: 'Ср. урон', value: '--' }]
              .map((stat, i) => (
                <div key={i} className="bg-bg/50 rounded-xl p-3 border border-border/50">
                  <div className="text-xs text-textMuted mb-1">{stat.label}</div>
                  <div className="text-xl font-bold text-textMuted">{stat.value}</div>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-4 h-40 mt-2 flex items-center justify-center text-textMuted text-sm">
                График появится после поиска
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Таблица матчей (Демо) */}
      {!selectedGame && (
        <div className="bg-surface border border-border rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4 text-textMuted">История матчей будет доступна после поиска</h3>
          <div className="overflow-x-auto opacity-50">
             {/* Упрощенная таблица для фона */}
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-textMuted text-xs uppercase tracking-wider border-b border-border">
                  <th className="pb-3 font-medium">Результат</th>
                  <th className="pb-3 font-medium">Режим</th>
                  <th className="pb-3 font-medium">Дата</th>
                  <th className="pb-3 font-medium">Счет</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentMatches.map((match, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-4 text-textMuted">{match.result}</td>
                    <td className="py-4 text-textMuted">{match.mode}</td>
                    <td className="py-4 text-textMuted">{match.date}</td>
                    <td className="py-4 text-textMuted">{match.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}