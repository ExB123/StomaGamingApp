import { Shield, Swords, Trophy, RefreshCw, Lock, CheckCircle, ChevronRight } from 'lucide-react';

const buildings = [
  { name: 'Центр управления', level: 7, xp: '4 250 / 6 000', desc: 'Основное здание столицы', maxLevel: false },
  { name: 'Академия', level: 6, xp: '3 100 / 5 000', desc: 'Увеличивает получение XP', maxLevel: false },
  { name: 'Казармы', level: 4, xp: '1 200 / 2 000', desc: 'Увеличивает мощь армии', maxLevel: false },
  { name: 'Стена', level: 3, xp: '800 / 1 500', desc: 'Повышает защиту столицы', maxLevel: false },
  { name: 'Мастерская', level: 5, xp: '2 200 / 3 500', desc: 'Снижает время улучшений', maxLevel: false },
  { name: 'Торговый пост', level: 2, xp: '450 / 1 000', desc: 'Увеличивает награды', maxLevel: false },
  { name: 'Алтарь древних', level: 10, xp: 'Заблокировано', desc: 'Требуется уровень столицы 10', locked: true },
  { name: 'Храм знаний', level: 15, xp: 'Заблокировано', desc: 'Требуется уровень столицы 15', locked: true },
];

const privileges = [
  { level: 5, desc: '+2 слота для отслеживания игр', unlocked: true },
  { level: 10, desc: 'Доступ к расширенной статистике', unlocked: true },
  { level: 15, desc: 'Уникальные рамки профиля', unlocked: false },
  { level: 20, desc: 'Эксклюзивный титул и значок', unlocked: false },
];

const enemies = [
  { name: 'WarriorX', level: 8, power: '11 320' },
  { name: 'GamingKing', level: 7, power: '10 870' },
  { name: 'ProPlayer', level: 6, power: '9 540' },
];

export default function Capital() {
  return (
    <div className="p-6 overflow-y-auto h-screen">
      {/* Хедер страницы */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Столица прогресса</h1>
        <p className="text-textMuted text-sm">Развивай свою столицу, открывай новые привилегии и сражайся с другими игроками!</p>
      </div>

      {/* Основная карточка столицы */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Левая часть: Уровень и статы */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="text-center lg:text-left">
            <div className="text-xs text-textMuted uppercase tracking-wider mb-1">Уровень столицы</div>
            <div className="text-5xl font-bold text-accent mb-2">7</div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-textMuted">Опыт столицы</span>
              <span>4 250 / 6 000 XP</span>
            </div>
            <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[70%]"></div>
            </div>
            <button className="w-full mt-3 bg-accent hover:bg-accentHover text-white font-medium py-2 rounded-lg transition-colors">
              Улучшить столицу
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-bg/50 rounded-lg p-3 flex items-center gap-3 border border-border/50">
              <Swords size={16} className="text-yellow-500" />
              <div>
                <div className="text-[10px] text-textMuted uppercase">Мощь</div>
                <div className="font-bold">12 540</div>
              </div>
            </div>
            <div className="bg-bg/50 rounded-lg p-3 flex items-center gap-3 border border-border/50">
              <Shield size={16} className="text-blue-500" />
              <div>
                <div className="text-[10px] text-textMuted uppercase">Защита</div>
                <div className="font-bold">9 320</div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть: Визуал и Привилегии */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Заглушка для картинки замка */}
          <div className="bg-gradient-to-br from-purple-900/20 to-bg rounded-xl border border-border/50 min-h-[200px] flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <div className="relative z-10 text-center p-4">
                <Trophy size={48} className="mx-auto text-accent mb-2" />
                <div className="font-bold text-lg">Уровень 7</div>
             </div>
          </div>

          {/* Привилегии */}
          <div className="bg-bg/30 rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy size={16} className="text-yellow-500" /> Привилегии столицы
            </h3>
            <div className="space-y-3">
              {privileges.map((priv, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${priv.unlocked ? 'bg-accent text-white' : 'bg-surface text-textMuted border border-border'}`}>
                      {priv.unlocked ? <CheckCircle size={14} /> : priv.level}
                    </div>
                    <span className={priv.unlocked ? 'text-white' : 'text-textMuted'}>Уровень {priv.level}</span>
                  </div>
                  <div className="text-right">
                    <div className={priv.unlocked ? 'text-green-400 text-xs' : 'text-textMuted text-xs'}>
                      {priv.unlocked ? 'Разблокировано' : priv.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Здания столицы */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Здания столицы</h3>
            <button className="text-accent text-sm flex items-center gap-1 hover:text-white transition-colors">
              Смотреть все <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((b, i) => (
              <div key={i} className={`relative rounded-xl p-4 border transition-all ${b.locked ? 'bg-surface border-border/50 opacity-60' : 'bg-bg/50 border-border hover:border-accent/50'}`}>
                {b.locked && (
                  <div className="absolute inset-0 bg-surface/80 rounded-xl flex items-center justify-center z-10">
                    <Lock size={24} className="text-textMuted" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div className={`text-xs font-bold px-2 py-1 rounded ${b.level >= 7 ? 'bg-accent/20 text-accent' : 'bg-surfaceHover text-textMuted'}`}>
                    Ур. {b.level}
                  </div>
                </div>
                <div className="font-bold mb-1">{b.name}</div>
                <div className="text-xs text-textMuted mb-3 h-8">{b.desc}</div>
                <div className="text-[10px] text-textMuted mb-1">{b.xp} XP</div>
                {!b.locked && (
                  <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${(parseInt(b.xp) / parseInt(b.xp.split('/')[1].replace(/\D/g,''))) * 100}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Сражения */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Сражения</h3>
            <div className="flex gap-2 text-xs bg-bg p-1 rounded-lg">
              <button className="px-3 py-1 bg-accent text-white rounded shadow">Атака</button>
              <button className="px-3 py-1 text-textMuted hover:text-white">Защита</button>
            </div>
          </div>
          
          <div className="bg-bg/50 rounded-lg p-3 mb-4 border border-border/50">
            <div className="text-xs text-textMuted mb-1">Рейтинг столицы</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-yellow-500" />
                <span className="font-bold text-lg">1 250</span>
              </div>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Топ 15%</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-sm">Доступные противники</h4>
              <button className="text-xs text-textMuted flex items-center gap-1 hover:text-white">
                <RefreshCw size={12} /> Обновить
              </button>
            </div>
            <div className="space-y-3">
              {enemies.map((e, i) => (
                <div key={i} className="flex items-center justify-between bg-bg/50 p-3 rounded-lg border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surfaceHover flex items-center justify-center text-xs font-bold text-textMuted">
                      {e.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{e.name}</div>
                      <div className="text-xs text-textMuted">Уровень {e.level} столицы</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] text-textMuted">Мощь</div>
                      <div className="text-xs font-bold">{e.power}</div>
                    </div>
                    <button className="bg-accent/20 hover:bg-accent text-accent hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors border border-accent/20">
                      Сразиться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-4 text-accent text-sm font-medium py-2 rounded-lg border border-accent/30 hover:bg-accent/10 transition-colors">
            История сражений
          </button>
        </div>
      </div>

      {/* Путь к следующему уровню */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Путь к следующему уровню столицы</h3>
          <div className="flex items-center gap-3 bg-bg/50 px-4 py-2 rounded-lg border border-border/50">
             <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
             <div>
                <div className="text-[10px] text-textMuted">Следующая награда</div>
                <div className="text-xs font-bold">+1 слот для игр</div>
             </div>
          </div>
        </div>
        
        <div className="relative flex items-center justify-between px-4">
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0"></div>
           {[4, 5, 6, 7, 8, 9].map((lvl) => (
             <div key={lvl} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${
                  lvl <= 7 
                    ? 'bg-accent border-accent/30 text-white' 
                    : 'bg-surface border-border text-textMuted'
                }`}>
                  {lvl <= 7 ? (lvl === 7 ? <Lock size={16} /> : <CheckCircle size={16} />) : lvl}
                </div>
                <span className={`text-xs font-medium ${lvl === 7 ? 'text-accent' : 'text-textMuted'}`}>Ур. {lvl}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}