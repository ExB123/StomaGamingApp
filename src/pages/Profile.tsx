import { MapPin, Calendar, Shield, Clock, Trophy, Target, Crosshair, Heart, Activity, ExternalLink, Edit3, CheckCircle, Star } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const recentAchievements = [
  { title: 'Меткий стрелок', desc: 'Сделай 100 хедшотов', date: '12.05.2024' },
  { title: 'Победитель', desc: 'Одержи 100 побед', date: '10.05.2024' },
  { title: 'Командный игрок', desc: 'Сыграй 50 матчей', date: '08.05.2024' },
  { title: 'Неудержимый', desc: 'Серия из 10 убийств', date: '05.05.2024' },
];

const skillsData = {
  labels: ['Убийства', 'Выживаемость', 'Поддержка', 'Тактика', 'Точность'],
  datasets: [
    {
      label: 'Навыки',
      data: [75, 68, 60, 72, 85],
      backgroundColor: 'rgba(108, 93, 211, 0.2)',
      borderColor: '#6C5DD3',
      pointBackgroundColor: '#6C5DD3',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6C5DD3',
    },
  ],
};

const recentGames = [
  { game: 'Warface', kd: '1.82', result: 'Победа', date: '23.05.2024', type: 'win' },
  { game: 'PUBG Mobile', kd: '0.78', result: 'Поражение', date: '22.05.2024', type: 'loss' },
  { game: 'Valorant', kd: '1.91', result: 'Победа', date: '21.05.2024', type: 'win' },
  { game: 'CS2', kd: '1.45', result: 'Победа', date: '20.05.2024', type: 'win' },
];

const favoriteGames = [
  { name: 'Warface', hours: '245 ч.' },
  { name: 'PUBG Mobile', hours: '120 ч.' },
  { name: 'Valorant', hours: '98 ч.' },
  { name: 'CS2', hours: '76 ч.' },
];

const activity = [
  { text: 'Мастер штурма', action: 'Получено достижение', time: '2 ч. назад' },
  { text: '11 уровень', action: 'Повышен уровень', time: '5 ч. назад' },
  { text: 'Warface', action: 'Победа в рейтинговом матче', time: 'Вчера' },
];

export default function Profile() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер профиля */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-20 h-20 rounded-full border-4 border-border" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-surface rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              StomaUser <CheckCircle size={16} className="text-accent" />
            </h1>
            <div className="flex items-center gap-4 text-sm text-textMuted mt-1">
              <span className="flex items-center gap-1"><Calendar size={14} /> 12.03.2024</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> В сети</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-bold">Уровень 12</span>
              <div className="w-32 h-1.5 bg-bg rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[47%]"></div>
              </div>
              <span className="text-xs text-textMuted">2 350 / 5 000 XP</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-surfaceHover border border-border hover:bg-accent hover:border-accent hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
          <Edit3 size={16} /> Редактировать профиль
        </button>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Матчи', value: '4 250', icon: Activity },
          { label: 'Победы', value: '2 850', icon: Trophy },
          { label: 'K/D', value: '1.58', icon: Crosshair },
          { label: 'Процент побед', value: '68%', icon: Star },
          { label: 'Время в играх', value: '12d 14h', icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-surfaceHover rounded-lg text-accent">
              <stat.icon size={18} />
            </div>
            <div>
              <div className="text-xs text-textMuted">{stat.label}</div>
              <div className="font-bold text-lg">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Прогресс уровня */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Прогресс</h3>
            <span className="text-xs text-textMuted">Уровень 12</span>
          </div>
          <div className="relative flex items-center justify-between px-2 mb-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0"></div>
            {[10, 11, 12, 13, 14].map((lvl) => (
              <div key={lvl} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  lvl <= 12 ? 'bg-accent border-accent text-white' : 'bg-surface border-border text-textMuted'
                }`}>
                  {lvl}
                </div>
                <span className={`text-[10px] ${lvl <= 12 ? 'text-white font-medium' : 'text-textMuted'}`}>
                  {lvl <= 11 ? 'Получено' : lvl === 12 ? 'Текущий' : `Лвл${lvl}`}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-bg/50 rounded-lg p-3 text-center">
            <div className="text-xs text-textMuted mb-1">До следующего уровня</div>
            <div className="font-bold text-accent">2 650 XP</div>
          </div>
        </div>

        {/* Недавние достижения */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Достижения</h3>
            <button className="text-accent text-xs font-medium hover:text-white">Посмотреть все</button>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-bg/50 p-3 rounded-lg">
                <Trophy size={16} className="text-yellow-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-textMuted">{a.desc}</div>
                </div>
                <div className="ml-auto text-[10px] text-textMuted">{a.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика аккаунта (Радар) */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center">
          <div className="flex justify-between items-center mb-4 w-full">
            <h3 className="font-semibold">Статистика аккаунта</h3>
            <span className="text-xs bg-surfaceHover text-textMuted px-2 py-1 rounded">Все игры</span>
          </div>
          <div className="w-full h-64">
            <Radar data={skillsData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  grid: { color: '#232633' },
                  angleLines: { color: '#232633' },
                  pointLabels: { color: '#94A3B8', font: { size: 11 } },
                  ticks: { display: false, backdropColor: 'transparent' }
                }
              },
              plugins: { legend: { display: false } }
            }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Недавние игры */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Недавние игры</h3>
            <button className="text-accent text-xs font-medium hover:text-white">Посмотреть все</button>
          </div>
          <div className="space-y-2">
            {recentGames.map((g, i) => (
              <div key={i} className="flex items-center justify-between bg-bg/50 p-3 rounded-lg border border-border/50 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surfaceHover flex items-center justify-center text-xs font-bold text-textMuted">
                    {g.game[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{g.game}</div>
                    <div className="text-xs text-textMuted">K/D {g.kd}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold ${g.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>{g.result}</span>
                  <span className="text-xs text-textMuted">{g.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Любимые игры и О себе */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-3">О себе</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Геймер, аналитик, стремлюсь к совершенству. Люблю командные игры и сложные вызовы. Всегда в поиске новых побед!
            </p>
            <div className="flex gap-2 mt-4">
              <ExternalLink size={16} className="text-textMuted hover:text-white cursor-pointer" />
              <ExternalLink size={16} className="text-textMuted hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Любимые игры</h3>
              <button className="text-accent text-xs font-medium hover:text-white">Посмотреть все</button>
            </div>
            <div className="space-y-2">
              {favoriteGames.map((g, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-white">{g.name}</span>
                  <span className="text-textMuted bg-surfaceHover px-2 py-0.5 rounded text-xs">{g.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Недавняя активность */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Недавняя активность</h3>
          <button className="text-accent text-xs font-medium hover:text-white">Посмотреть все</button>
        </div>
        <div className="relative border-l-2 border-border ml-3 space-y-6 pl-6">
          {activity.map((act, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 bg-surface border-2 border-accent rounded-full"></div>
              <div className="text-sm text-white">{act.text} <span className="text-textMuted">{act.action}</span></div>
              <div className="text-xs text-textMuted mt-1">{act.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}