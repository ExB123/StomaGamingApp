import { RefreshCw, Star, Trophy, Skull, Crosshair, Timer, Activity, ArrowLeft, Clock, Target } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { PlayerStats, MatchHistory } from '../types/game';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

interface StatisticsProps {
  stats: PlayerStats | null;
  matches: MatchHistory[] | null;
  gameId: string | null;
  onBack: () => void;
}

const mockChartDataLine = {
  labels: ['01.05', '06.05', '11.05', '16.05', '21.05', '26.05', '31.05'],
  datasets: [{
    label: 'K/D',
    data: [1.2, 1.35, 1.25, 1.5, 1.4, 1.55, 1.45],
    borderColor: '#6C5DD3',
    backgroundColor: (context: any) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(108, 93, 211, 0.4)');
      gradient.addColorStop(1, 'rgba(108, 93, 211, 0.0)');
      return gradient;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointBackgroundColor: '#6C5DD3',
  }],
};

const mockChartOptionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#161822', titleColor: '#fff', borderColor: '#232633', borderWidth: 1, padding: 8, cornerRadius: 8 } },
  scales: { x: { grid: { display: false, drawBorder: false }, ticks: { color: '#94A3B8', font: { size: 10 } } }, y: { grid: { color: '#232633' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 0.5, max: 2.5 } },
};

const mockChartDataDoughnut = {
  labels: ['Командный', 'Подрыв', 'Мясорубка', 'Штурм'],
  datasets: [{ data: [42, 28, 15, 15], backgroundColor: ['#6C5DD3', '#EF4444', '#10B981', '#F59E0B'], borderWidth: 0, hoverOffset: 4 }],
};

export default function Statistics({ stats, matches, gameId, onBack }: StatisticsProps) {
  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-textMuted">
        <h2 className="text-2xl font-bold text-white mb-2">Нет данных</h2>
        <p className="mb-4">Вернитесь на главную и выполните поиск игрока.</p>
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentHover transition-colors">
          <ArrowLeft size={18} /> На главную
        </button>
      </div>
    );
  }

  const gameName = gameId === 'warface' ? 'Warface' : gameId || 'Игра';

  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер страницы */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-surfaceHover rounded-lg transition-colors text-textMuted hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-textMuted text-sm">
            <span>Статистика</span> <span>/</span> <span className="text-white font-medium">{gameName}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm hover:bg-surfaceHover transition-colors">
            <RefreshCw size={14} /> Обновить
          </button>
          <select className="bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none">
            <option>30 дней</option>
            <option>7 дней</option>
          </select>
        </div>
      </div>

      {/* Карточка игрока */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent border-2 border-accent/50">
            {stats.level}
          </div>
          <div>
            <h2 className="text-lg font-bold">{stats.nickname}</h2>
            <p className="text-xs text-textMuted">
              {stats.server ? `Сервер: ${stats.server}` : 'Онлайн'} • {stats.rank}
            </p>
            <div className="flex items-center gap-4 mt-1 text-xs text-textMuted">
               {stats.playtime && <span>⏱ {stats.playtime}</span>}
               {stats.favoritePVP && <span>🎯 Любимый: {stats.favoritePVP}</span>}
            </div>
            <div className="w-48 h-1.5 bg-bg rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${stats.experience && stats.maxExperience ? (stats.experience / stats.maxExperience) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium">
          <Star size={16} fill="currentColor" /> В избранном
        </button>
      </div>

      {/* Сетка метрик */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'K/D', value: stats.kd.toFixed(2), change: '+0.0%', icon: Crosshair, color: 'text-blue-400' },
          { label: 'Побед', value: stats.winRate, change: '+0.0%', icon: Trophy, color: 'text-yellow-400' },
          { label: 'Матчи', value: stats.matches.toLocaleString(), change: '0', icon: Timer, color: 'text-green-400' },
          { label: 'Урон', value: stats.avgDamage.toLocaleString(), change: '0', icon: Activity, color: 'text-orange-400' },
          { label: 'Победы', value: stats.wins.toLocaleString(), change: '0', icon: Star, color: 'text-purple-400' },
          { label: 'Рейтинг', value: stats.rating.toLocaleString(), change: '0', icon: Target, color: 'text-red-400' },
        ].map((m, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2 hover:border-accent/30 transition-colors">
            <div className="flex justify-between items-start">
              <m.icon size={16} className={m.color} />
              <span className="text-xs font-medium text-textMuted">--</span>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="text-xs text-textMuted">{m.label}</div>
            </div>
            <div className="h-8 flex items-end gap-0.5 mt-2 opacity-50">
               {[40, 60, 45, 70, 55, 80, 65].map((h, idx) => (
                 <div key={idx} className="flex-1 bg-accent rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Динамика K/D</h3>
          </div>
          <div className="h-64"><Line data={mockChartDataLine} options={mockChartOptionsLine} /></div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-6">
          <div className="h-48 w-48"><Doughnut data={mockChartDataDoughnut} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} /></div>
          <div className="flex-1">
            <h3 className="font-semibold mb-3">Режимы игры</h3>
            <ul className="space-y-2">
              {mockChartDataDoughnut.labels.map((label, i) => (
                <li key={i} className="flex justify-between text-sm items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: mockChartDataDoughnut.datasets[0].backgroundColor[i] }}></span>
                    <span className="text-textMuted">{label}</span>
                  </div>
                  <div className="flex gap-4 text-textMuted">
                    <span>{mockChartDataDoughnut.datasets[0].data[i]}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Последние матчи */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <h3 className="font-semibold mb-4">Последние матчи</h3>
        {matches && matches.length > 0 ? (
          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="flex items-center justify-between bg-bg/50 p-3 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{m.mode} {m.map && <span className="text-textMuted text-xs ml-2">• {m.map}</span>}</div>
                  <div className="text-xs text-textMuted">{m.date}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${m.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>{m.result}</div>
                  <div className="text-xs text-textMuted">K/D: {m.kd} • Счет: {m.score}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-textMuted text-sm text-center py-4">
            История матчей доступна во вкладке PvP на сайте источника.
          </div>
        )}
      </div>
    </div>
  );
}