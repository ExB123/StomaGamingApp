import { Search, Gamepad2, ChevronRight, Trophy } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const popularGames = [
  { name: 'Warface', icon: '🎮' },
  { name: 'Clash of Clans', icon: '⚔️' },
  { name: 'Brawl Stars', icon: '💀' },
  { name: 'PUBG Mobile', icon: '🪖' },
  { name: 'Valorant', icon: '🔴' },
];

const recentMatches = [
  { result: 'Победа', mode: 'Командный бой', date: 'Сегодня, 14:32', score: '23 / 10', damage: '2 450', kd: '+24', type: 'win' },
  { result: 'Поражение', mode: 'Подрыв', date: 'Сегодня, 13:10', score: '8 / 14', damage: '1 250', kd: '-18', type: 'loss' },
  { result: 'Победа', mode: 'Мясорубка', date: 'Вчера, 20:45', score: '30 / 16', damage: '3 210', kd: '+31', type: 'win' },
];

// Данные для графика рейтинга
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
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#94A3B8', font: { size: 10 } },
    },
    y: {
      grid: { color: '#232633', borderDash: [5, 5] },
      ticks: { color: '#94A3B8', font: { size: 10 } },
      beginAtZero: false,
    },
  },
};

export default function Dashboard() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер: Заголовок и Поиск */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Твоя статистика <br /><span className="text-accent">под контролем</span></h1>
          <p className="text-textMuted text-sm">Введи никнейм и получи детальную статистику по любимым играм</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
          <input 
            type="text" 
            placeholder="Введи никнейм..." 
            className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder-textMuted/50"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accentHover text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
            Поиск
          </button>
        </div>
      </div>

      {/* Популярные игры */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Популярные игры</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {popularGames.map((game, idx) => (
            <div key={idx} className="min-w-[140px] bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-3 hover:border-accent/50 hover:bg-surface/80 transition-all cursor-pointer group">
              <div className="text-3xl group-hover:scale-110 transition-transform">{game.icon}</div>
              <span className="text-sm font-medium">{game.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Карточка Warface */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-accent" size={24} />
            <h3 className="text-xl font-bold">Warface <span className="text-textMuted text-sm font-normal ml-2">PC</span></h3>
          </div>
          <button className="flex items-center gap-1 text-accent text-sm font-medium hover:text-white transition-colors">
            Перейти к игре <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая часть: Ранг и Рейтинг */}
          <div className="flex flex-col justify-between bg-bg/50 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-900/20">
                <Trophy className="text-white" size={32} />
              </div>
              <div>
                <div className="text-xs text-textMuted uppercase tracking-wider">Ранг</div>
                <div className="font-bold text-lg">Золотая лига II</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Рейтинг</div>
              <div className="text-2xl font-bold text-accent">2 532</div>
            </div>
          </div>

          {/* Центральная часть: Статистика */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Матчи', value: '1 256' },
              { label: 'Победы', value: '732' },
              { label: 'У/С', value: '1.45' },
              { label: 'Ср. урон', value: '2 350' },
            ].map((stat, i) => (
              <div key={i} className="bg-bg/50 rounded-xl p-3 border border-border/50">
                <div className="text-xs text-textMuted mb-1">{stat.label}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
            
            {/* График */}
            <div className="col-span-2 sm:col-span-4 h-40 mt-2">
               <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Таблица матчей */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Недавние матчи</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-textMuted text-xs uppercase tracking-wider border-b border-border">
                <th className="pb-3 font-medium">Результат</th>
                <th className="pb-3 font-medium">Режим</th>
                <th className="pb-3 font-medium">Дата</th>
                <th className="pb-3 font-medium">Счет</th>
                <th className="pb-3 font-medium">Урон</th>
                <th className="pb-3 font-medium text-right">+/-</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentMatches.map((match, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                      match.type === 'win' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {match.type === 'win' ? 'Победа' : 'Поражение'}
                    </span>
                  </td>
                  <td className="py-4 text-textMuted">{match.mode}</td>
                  <td className="py-4 text-textMuted">{match.date}</td>
                  <td className="py-4 font-medium">{match.score}</td>
                  <td className="py-4 text-textMuted">{match.damage}</td>
                  <td className={`py-4 text-right font-bold ${match.type === 'win' ? 'text-success' : 'text-danger'}`}>
                    {match.kd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}