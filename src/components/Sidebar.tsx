import { Home, BarChart3, Trophy, Crown, Users, User, Settings, Bell } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Главная' },
  { id: 'stats', icon: BarChart3, label: 'Статистика' },
  { id: 'achievements', icon: Trophy, label: 'Достижения' },
  { id: 'capital', icon: Crown, label: 'Столица прогресса' },
  { id: 'clan', icon: Users, label: 'Клан' },
  { id: 'profile', icon: User, label: 'Профиль' },
  { id: 'settings', icon: Settings, label: 'Настройки' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-surface border-r border-border flex flex-col p-4">
      {/* Логотип */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-accent/20">
          S
        </div>
        <span className="text-xl font-bold tracking-wide">
          Stoma<span className="text-accent">Gaming</span>
        </span>
      </div>

      {/* Навигация */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(108,93,211,0.1)]'
                  : 'text-textMuted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Блок уведомлений и профиля внизу */}
      <div className="mt-auto space-y-4">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-textMuted text-sm">
          <div className="flex items-center gap-2">
            <Bell size={18} />
            <span>Уведомления</span>
          </div>
          <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
          <img 
            src="https://i.pravatar.cc/150?img=11" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full border-2 border-border"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">StomaUser</span>
            <span className="text-xs text-textMuted">Уровень 12</span>
          </div>
        </div>
      </div>
    </aside>
  );
}