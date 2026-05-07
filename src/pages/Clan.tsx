import { Users, Trophy, Shield, Clock, ChevronRight, Activity, Star, Crown, Calendar } from 'lucide-react';

const clanStats = [
  { label: 'Лидер клана', value: 'StomaUser', icon: Crown },
  { label: 'Участники', value: '23 / 50', icon: Users },
  { label: 'Создан', value: '12.04.2024', icon: Calendar },
  { label: 'Рейтинг клана', value: '1 250 место', icon: Trophy },
  { label: 'Очки клана', value: '18 540', icon: Star },
  { label: 'Победы в войнах', value: '24', icon: Shield },
];

const clanTasks = [
  { title: 'Победить в 10 матчах', progress: '6 / 10', reward: '250', width: '60%' },
  { title: 'Нанести 100 000 урона', progress: '64 250 / 100 000', reward: '300', width: '64%' },
  { title: 'Сыграть 15 матчей', progress: '11 / 15', reward: '200', width: '73%' },
  { title: 'Совершить 20 убийств', progress: '18 / 20', reward: '150', width: '90%' },
];

const activity = [
  { user: 'GameMaster', action: 'получил 250 очков', time: '2ч назад' },
  { user: 'ProKiller', action: 'повысил уровень клана', time: '5ч назад' },
  { user: 'WarLegend', action: 'пожертвовал 500 очков', time: '1д назад' },
];

const topMembers = [
  { name: 'StomaUser', role: 'Лидер', points: '4 250', rank: 1 },
  { name: 'WarriorX', role: 'Офицер', points: '3 850', rank: 2 },
  { name: 'GameMaster', role: 'Офицер', points: '3 420', rank: 3 },
];

export default function Clan() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер клана */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-purple-900 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-accent/20">
            STS
          </div>
          <div>
            <h1 className="text-2xl font-bold">StomaSquad <span className="text-accent text-lg">[STS]</span></h1>
            <p className="text-textMuted text-sm">StomaGaming Community</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-bold">Ур. 12</span>
              <div className="w-32 h-1.5 bg-bg rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[72%]"></div>
              </div>
              <span className="text-xs text-textMuted">7 250 / 10 000 XP</span>
            </div>
          </div>
        </div>
        <button className="bg-accent hover:bg-accentHover text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-lg shadow-accent/20">
          Улучшить клан
        </button>
      </div>

      {/* Статистика клана (Сетка) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {clanStats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
            <stat.icon size={18} className="text-accent mb-1" />
            <div>
              <div className="text-xs text-textMuted mb-1">{stat.label}</div>
              <div className="font-bold text-sm md:text-base truncate">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Табы навигации */}
      <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 mb-6 overflow-x-auto">
        {['Обзор', 'Участники', 'Войны', 'Задания', 'Улучшения', 'Настройки'].map((tab, i) => (
          <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            i === 0 ? 'bg-accent text-white' : 'text-textMuted hover:text-white hover:bg-white/5'
          }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Контент вкладки "Обзор" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Информация об уровне */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Crown size={18} className="text-yellow-500" /> Преимущества уровня 12
          </h3>
          <ul className="space-y-3 text-sm text-textMuted">
            <li className="flex items-center gap-2 text-white">
              <ChevronRight size={16} className="text-accent" /> +20 слотов для участников
            </li>
            <li className="flex items-center gap-2 text-white">
              <ChevronRight size={16} className="text-accent" /> +10% к получаемому опыту
            </li>
            <li className="flex items-center gap-2 text-white">
              <ChevronRight size={16} className="text-accent" /> Доступ к клановым войнам
            </li>
            <li className="flex items-center gap-2 text-white">
              <ChevronRight size={16} className="text-accent" /> Уникальный клановый значок
            </li>
          </ul>
        </div>

        {/* Клановые войны */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Клановые войны</h3>
              <p className="text-sm text-textMuted">Текущий сезон: Активно</p>
            </div>
            <div className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20">
              Золотая лига
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-bg/50 rounded-lg p-3 text-center border border-border/50">
              <div className="text-xs text-textMuted mb-1">Позиция</div>
              <div className="font-bold text-lg">8 место</div>
            </div>
            <div className="bg-bg/50 rounded-lg p-3 text-center border border-border/50">
              <div className="text-xs text-textMuted mb-1">Очки</div>
              <div className="font-bold text-lg text-accent">2 450</div>
            </div>
            <div className="bg-bg/50 rounded-lg p-3 text-center border border-border/50">
              <div className="text-xs text-textMuted mb-1">До окончания</div>
              <div className="font-bold text-lg text-red-400 flex items-center justify-center gap-1">
                <Clock size={16} /> 5д 14ч
              </div>
            </div>
          </div>
          
          <button className="w-full bg-accent hover:bg-accentHover text-white font-medium py-2.5 rounded-lg transition-colors">
            Перейти к войнам
          </button>
        </div>
      </div>

      {/* Клановые задания и Активность */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Задания */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Клановые задания</h3>
            <div className="text-xs text-textMuted bg-bg px-3 py-1 rounded-lg border border-border/50">
              Обновляется через: <span className="text-white font-medium">14ч 32м</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {clanTasks.map((task, i) => (
              <div key={i} className="bg-bg/50 rounded-xl p-4 border border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{task.title}</span>
                  <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded">+{task.reward}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: task.width }}></div>
                  </div>
                  <span className="text-xs text-textMuted whitespace-nowrap">{task.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Активность и Топ */}
        <div className="space-y-6">
          {/* Активность */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Activity size={16} className="text-green-400" /> Активность
              </h4>
              <button className="text-xs text-accent hover:text-white">Вся активность</button>
            </div>
            <div className="space-y-3">
              {activity.map((act, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-surfaceHover flex items-center justify-center text-xs font-bold text-textMuted flex-shrink-0">
                    {act.user[0]}
                  </div>
                  <div>
                    <span className="font-medium text-white">{act.user}</span>
                    <span className="text-textMuted"> {act.action}</span>
                    <div className="text-xs text-textMuted mt-0.5">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Топ участников */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Топ участников</h4>
              <button className="text-xs text-accent hover:text-white">Все участники</button>
            </div>
            <div className="space-y-2">
              {topMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 text-center font-bold ${m.rank === 1 ? 'text-yellow-500' : m.rank === 2 ? 'text-gray-400' : 'text-orange-500'}`}>
                      {m.rank}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surfaceHover flex items-center justify-center text-xs font-bold text-textMuted">
                      {m.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-textMuted">{m.role}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-accent">{m.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}