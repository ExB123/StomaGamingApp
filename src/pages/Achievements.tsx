import { Trophy, Target, Users, Skull, Zap, Shield, Flag, Compass, Bomb, Crosshair } from 'lucide-react';

const recentAchievements = [
  { title: 'Меткий стрелок', desc: 'Сделай 100 хедшотов', xp: '+50 XP', date: 'Сегодня, 14:32', icon: Target },
  { title: 'Победитель', desc: 'Одержи 100 побед', xp: '+100 XP', date: 'Вчера, 21:15', icon: Trophy },
  { title: 'Командный игрок', desc: 'Сыграй 50 матчей в команде', xp: '+75 XP', date: 'Вчера, 18:40', icon: Users },
  { title: 'Неудержимый', desc: 'Сделай серию из 10 убийств', xp: '+60 XP', date: '12.05.2024', icon: Skull },
];

const progressAchievements = [
  { title: 'Мастер штурма', desc: 'Убить 1000 врагов из штурмовых винтовок', current: 750, total: 1000, xp: '+200 XP', icon: Crosshair },
  { title: 'Снайпер', desc: 'Сделать 500 хедшотов', current: 320, total: 500, xp: '+150 XP', icon: Target },
  { title: 'Выживший', desc: 'Выиграть 100 матчей в режиме Выживание', current: 78, total: 100, xp: '+100 XP', icon: Shield },
  { title: 'Верный союзник', desc: 'Сыграть 100 матчей с друзьями', current: 42, total: 100, xp: '+100 XP', icon: Users },
  { title: 'Ветеран', desc: 'Провести 100 часов в игре', current: 64, total: 100, xp: '+120 XP', icon: Zap },
  { title: 'Захватчик', desc: 'Захватить 500 точек', current: 230, total: 500, xp: '+150 XP', icon: Flag },
];

const upcomingRewards = [
  { level: 13, xp: '3 000 XP', reward: 'Редкий кейс', locked: false },
  { level: 14, xp: '5 000 XP', reward: 'Эмблема "Легенда"', locked: true },
  { level: 15, xp: '7 500 XP', reward: 'Скин "Хищник"', locked: true },
];

const topPlayers = [
  { name: 'GameMaster', xp: '12 540 XP', rank: 1 },
  { name: 'ProKiller', xp: '11 320 XP', rank: 2 },
  { name: 'WarLegend', xp: '9 870 XP', rank: 3 },
  { name: 'StomaUser', xp: '8 650 XP', rank: 4, me: true },
  { name: 'IronMan', xp: '7 420 XP', rank: 5 },
];

export default function Achievements() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Достижения</h1>
          <p className="text-textMuted text-sm">Отслеживай свой прогресс и получай награды</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none">
            <option>Сортировка: Недавние</option>
            <option>Сортировка: По редкости</option>
          </select>
        </div>
      </div>

      {/* Сводка */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
          <Trophy className="text-purple-400" size={24} />
          <div>
            <div className="text-xs text-textMuted">Всего достижений</div>
            <div className="text-xl font-bold">24 / 68</div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
          <Zap className="text-purple-400" size={24} />
          <div>
            <div className="text-xs text-textMuted">Получено XP</div>
            <div className="text-xl font-bold">2 350 XP</div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
          <Shield className="text-yellow-400" size={24} />
          <div>
            <div className="text-xs text-textMuted">Редкие достижения</div>
            <div className="text-xl font-bold">7 / 24</div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-textMuted">Следующая награда</div>
            <div className="text-sm font-medium">2 650 XP до уровня 13</div>
            <div className="w-full h-1.5 bg-bg rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-accent w-[45%]"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold border-2 border-accent/50">13</div>
        </div>
      </div>

      {/* Недавно полученные */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-4">Недавно полученные</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentAchievements.map((a, i) => (
            <div key={i} className="bg-bg/50 rounded-xl p-4 flex flex-col items-center text-center gap-3 relative">
              <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <Zap size={12} />
              </div>
              <a.icon size={32} className="text-textMuted" />
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-textMuted">{a.desc}</div>
              </div>
              <div className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-md font-medium">{a.xp}</div>
              <div className="text-[10px] text-textMuted">{a.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Прогресс достижений */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Прогресс достижений</h3>
            <button className="text-accent text-xs font-medium">Показать все</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressAchievements.map((a, i) => (
              <div key={i} className="bg-bg/50 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-1">
                  <a.icon size={20} className="text-textMuted" />
                  <div>
                    <div className="font-medium text-sm">{a.title}</div>
                    <div className="text-xs text-textMuted">{a.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 h-1.5 bg-bg rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${(a.current / a.total) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-textMuted">{a.current} / {a.total}</span>
                </div>
                <div className="text-xs text-accent font-medium self-end">{a.xp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Боковая панель: Награды и Топ */}
        <div className="space-y-6">
          {/* Ближайшие награды */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Ближайшие награды</h3>
            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border"></div>
              {upcomingRewards.map((r, i) => (
                <div key={i} className="flex items-center gap-3 relative">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${r.locked ? 'bg-surface border-2 border-border text-textMuted' : 'bg-accent text-white'}`}>
                    {r.locked ? <Zap size={10} /> : <Zap size={10} />}
                  </div>
                  <div className="flex-1 bg-bg/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-accent">Уровень {r.level}</span>
                      {r.locked && <Zap size={14} className="text-textMuted" />}
                    </div>
                    <div className="text-xs text-textMuted">{r.xp}</div>
                    <div className="text-xs font-medium mt-1">{r.reward}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Топ игроков */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Топ игроков</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-accent text-white px-2 py-1 rounded">По XP</button>
                <button className="text-xs text-textMuted px-2 py-1 rounded">По достижениям</button>
              </div>
            </div>
            <div className="space-y-2">
              {topPlayers.map((p, i) => (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${p.me ? 'bg-accent/10 border border-accent/20' : 'hover:bg-white/5'}`}>
                  <div className="w-6 text-center font-bold text-textMuted">
                    {p.rank <= 3 ? (p.rank === 1 ? '👑' : p.rank === 2 ? '🥈' : '🥉') : p.rank}
                  </div>
                  <img src={`https://i.pravatar.cc/150?img=${10 + i}`} alt={p.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{p.name}</div>
                  </div>
                  <div className="text-xs text-textMuted">{p.xp}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-accent text-xs font-medium py-2 rounded-lg border border-accent/30 hover:bg-accent/10 transition-colors">
              Показать полный рейтинг
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}