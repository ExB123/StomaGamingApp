import { RefreshCw, Star, Trophy, Skull, Crosshair, Timer, Activity } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

// --- Данные (моки) ---
const metrics = [
  { label: 'K/D', value: '1.45', change: '+12.4%', icon: Crosshair, color: 'text-blue-400' },
  { label: 'Процент побед', value: '58%', change: '+5.7%', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Убийства', value: '2 532', change: '+8.1%', icon: Skull, color: 'text-red-400' },
  { label: 'Смерти', value: '1 742', change: '-2.3%', icon: Activity, color: 'text-purple-400' },
  { label: 'Матчи', value: '125', change: '+6.2%', icon: Timer, color: 'text-green-400' },
  { label: 'Средний урон', value: '1 560', change: '+9.3%', icon: Crosshair, color: 'text-orange-400' },
];

const weapons = [
  { name: 'Золотой AK-12', kills: 853, accuracy: '23%', kd: '1.62' },
  { name: 'Taurus CT9 G2', kills: 623, accuracy: '19%', kd: '1.35' },
  { name: 'M4A1 Custom', kills: 512, accuracy: '20%', kd: '1.28' },
];

const maps = [
  { name: 'Пункт назначения', winrate: '68%', kd: '1.78' },
  { name: 'Депозит', winrate: '62%', kd: '1.55' },
  { name: 'Фабрика', winrate: '60%', kd: '1.48' },
];

const matches = [
  { mode: 'Командный бой', map: 'Пункт назначения', result: 'Победа', kd: '1.62', kills: '23 / 14', time: 'Сегодня, 14:32', type: 'win' },
  { mode: 'Подрыв', map: 'Депозит', result: 'Поражение', kd: '0.88', kills: '12 / 18', time: 'Сегодня, 13:10', type: 'loss' },
  { mode: 'Мясорубка', map: 'Фабрика', result: 'Победа', kd: '1.45', kills: '29 / 20', time: 'Вчера, 20:45', type: 'win' },
];

// ИСПРАВЛЕНО: добавлено свойство data: [...]
const chartDataLine = {
  labels: ['01.05', '06.05', '11.05', '16.05', '21.05', '26.05', '31.05'],
  datasets: [
    {
      label: 'K/D',
      data: [1.2, 1.35, 1.25, 1.5, 1.4, 1.55, 1.45], // <-- FIX: Added 'data:'
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
    },
  ],
};

const chartOptionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#161822',
      titleColor: '#fff',
      borderColor: '#232633',
      borderWidth: 1,
      padding: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    x: { grid: { display: false, drawBorder: false }, ticks: { color: '#94A3B8', font: { size: 10 } } },
    y: { grid: { color: '#232633' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 0.5, max: 2.5 },
  },
};

// ИСПРАВЛЕНО: добавлено свойство data: [...]
const chartDataDoughnut = {
  labels: ['Командный', 'Подрыв', 'Мясорубка', 'Штурм'],
  datasets: [
    {
      data: [42, 28, 15, 15], // <-- FIX: Added 'data:'
      backgroundColor: ['#6C5DD3', '#EF4444', '#10B981', '#F59E0B'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

export default function Statistics() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер страницы */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-textMuted text-sm">
          <span>Статистика</span> <span>/</span> <span className="text-white font-medium">Warface</span>
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
            93
          </div>
          <div>
            <h2 className="text-lg font-bold">StomaUser</h2>
            <p className="text-xs text-textMuted">Сервер: Альфа • Опыт: 23 450 / 30 000</p>
            <div className="w-48 h-1.5 bg-bg rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-accent w-[78%]"></div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium">
          <Star size={16} fill="currentColor" /> В избранном
        </button>
      </div>

      {/* Сетка метрик */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2 hover:border-accent/30 transition-colors">
            <div className="flex justify-between items-start">
              <m.icon size={16} className={m.color} />
              <span className="text-xs font-medium text-green-400">{m.change}</span>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="text-xs text-textMuted">{m.label}</div>
            </div>
            {/* Мини-график (имитация) */}
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
            <h3 className="font-semibold">Динамика показателей</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">K/D</span>
              <span className="text-xs bg-surfaceHover text-textMuted px-2 py-1 rounded">Побед</span>
            </div>
          </div>
          <div className="h-64"><Line data={chartDataLine} options={chartOptionsLine} /></div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-6">
          <div className="h-48 w-48"><Doughnut data={chartDataDoughnut} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} /></div>
          <div className="flex-1">
            <h3 className="font-semibold mb-3">Режимы игры</h3>
            <ul className="space-y-2">
              {chartDataDoughnut.labels.map((label, i) => (
                <li key={i} className="flex justify-between text-sm items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: chartDataDoughnut.datasets[0].backgroundColor[i] }}></span>
                    <span className="text-textMuted">{label}</span>
                  </div>
                  <div className="flex gap-4 text-textMuted">
                    <span>{chartDataDoughnut.datasets[0].data[i]}%</span>
                    <span>{Math.floor(chartDataDoughnut.datasets[0].data[i] * 1.2)} матчей</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Таблицы */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Оружие */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold mb-4">Лучшее оружие</h3>
          <table className="w-full text-sm">
            <thead className="text-textMuted text-xs uppercase border-b border-border">
              <tr><th className="pb-2 text-left">Оружие</th><th className="pb-2">Убийства</th><th className="pb-2">Точн.</th><th className="pb-2">K/D</th></tr>
            </thead>
            <tbody>
              {weapons.map((w, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium">{w.name}</td>
                  <td className="py-3 text-center">{w.kills}</td>
                  <td className="py-3 text-center">{w.accuracy}</td>
                  <td className="py-3 text-center font-bold">{w.kd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Карты */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold mb-4">Лучшие карты</h3>
          <table className="w-full text-sm">
            <thead className="text-textMuted text-xs uppercase border-b border-border">
              <tr><th className="pb-2 text-left">Карта</th><th className="pb-2">Побед</th><th className="pb-2">K/D</th></tr>
            </thead>
            <tbody>
              {maps.map((m, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium">{m.name}</td>
                  <td className="py-3 text-center">{m.winrate}</td>
                  <td className="py-3 text-center font-bold">{m.kd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Матчи */}
        <div className="bg-surface border border-border rounded-xl p-4 lg:col-span-1">
          <h3 className="font-semibold mb-4">Последние матчи</h3>
          <div className="space-y-3">
            {matches.map((m, i) => (
              <div key={i} className="flex items-center justify-between bg-bg/50 p-3 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{m.mode}</div>
                  <div className="text-xs text-textMuted">{m.map}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${m.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>{m.result}</div>
                  <div className="text-xs text-textMuted">{m.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}