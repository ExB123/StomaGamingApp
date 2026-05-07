import { useState, useEffect } from 'react';
import React from 'react';
import { 
  Globe, Moon, Shield, Bell, Lock, Palette, Info, 
  Check, Trash2, Download, Upload, LogOut, 
  HardDrive, ChevronDown, RotateCw, CircleDot 
} from 'lucide-react';

const tabs = [
  { id: 'general', label: 'Основные', icon: Globe },
  { id: 'security', label: 'Безопасность', icon: Shield },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'privacy', label: 'Приватность', icon: Lock },
  { id: 'connections', label: 'Подключения', icon: Globe },
  { id: 'appearance', label: 'Оформление', icon: Palette },
  { id: 'about', label: 'О программе', icon: Info },
];

// Ключи для сохранения в electron-store
const STORAGE_KEYS = {
  language: 'settings_language',
  timezone: 'settings_timezone',
  dateFormat: 'settings_dateFormat',
  timeFormat: 'settings_timeFormat',
  autoStart: 'settings_autoStart',
  theme: 'settings_theme',
  accentColor: 'settings_accentColor',
  animations: 'settings_animations',
  compact: 'settings_compact',
  showProfile: 'settings_showProfile',
  showActivity: 'settings_showActivity',
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  
  // Состояния (инициализируем пустыми, подгрузим в useEffect)
  const [language, setLanguage] = useState('');
  const [timezone, setTimezone] = useState('');
  const [dateFormat, setDateFormat] = useState('');
  const [timeFormat, setTimeFormat] = useState('');
  const [autoStart, setAutoStart] = useState(false);
  const [theme, setTheme] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [animations, setAnimations] = useState(false);
  const [compact, setCompact] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  // 1. ЗАГРУЗКА НАСТРОЕК ПРИ ЗАПУСКЕ
  useEffect(() => {
    const loadSettings = async () => {
      const l = await window.electronAPI.storeGet(STORAGE_KEYS.language);
      if (l) setLanguage(l); else setLanguage('ru');

      const tz = await window.electronAPI.storeGet(STORAGE_KEYS.timezone);
      if (tz) setTimezone(tz); else setTimezone('utc3');

      const df = await window.electronAPI.storeGet(STORAGE_KEYS.dateFormat);
      if (df) setDateFormat(df); else setDateFormat('dd.mm.yyyy');

      const tf = await window.electronAPI.storeGet(STORAGE_KEYS.timeFormat);
      if (tf) setTimeFormat(tf); else setTimeFormat('24h');

      const as = await window.electronAPI.storeGet(STORAGE_KEYS.autoStart);
      if (as !== null) setAutoStart(as);

      const th = await window.electronAPI.storeGet(STORAGE_KEYS.theme);
      if (th) setTheme(th); else setTheme('dark');

      const ac = await window.electronAPI.storeGet(STORAGE_KEYS.accentColor);
      if (ac) setAccentColor(ac); else setAccentColor('purple');

      const anim = await window.electronAPI.storeGet(STORAGE_KEYS.animations);
      if (anim !== null) setAnimations(anim); else setAnimations(true);

      const comp = await window.electronAPI.storeGet(STORAGE_KEYS.compact);
      if (comp !== null) setCompact(comp);

      const sp = await window.electronAPI.storeGet(STORAGE_KEYS.showProfile);
      if (sp !== null) setShowProfile(sp); else setShowProfile(true);

      const sa = await window.electronAPI.storeGet(STORAGE_KEYS.showActivity);
      if (sa !== null) setShowActivity(sa); else setShowActivity(true);
    };

    loadSettings();
  }, []);

  // 2. ФУНКЦИЯ СОХРАНЕНИЯ
  const saveSetting = async (key: string, value: any, setter: Function) => {
    setter(value); // Обновляем экран
    await window.electronAPI.storeSet(key, value); // Сохраняем на диск
  };

  // Компонент Toggle
  const Toggle = ({ checked, onChange, storageKey }: { checked: boolean; onChange: () => void; storageKey: string }) => (
    <button 
      onClick={() => saveSetting(storageKey, !checked, onChange)}
      className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-accent' : 'bg-border'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );

  // Компонент Select
  const Select = ({ value, onChange, options, storageKey }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[], storageKey: string }) => (
    <div className="relative w-48">
      <select 
        value={value} 
        onChange={(e) => saveSetting(storageKey, e.target.value, onChange)}
        className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm outline-none appearance-none focus:border-accent pr-8"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" size={16} />
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto h-screen flex flex-col md:flex-row gap-6">
      {/* Левая колонка: Навигация */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Настройки</h1>
          <p className="text-sm text-textMuted mt-1">Настройте приложение под себя</p>
        </div>
        
        <nav className="bg-surface border border-border rounded-xl p-2 flex md:flex-col gap-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-textMuted hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Правая колонка: Контент */}
      <div className="flex-1 bg-surface border border-border rounded-xl p-6 min-w-0">
        
        {/* === ВКЛАДКА: ОСНОВНЫЕ === */}
        {activeTab === 'general' && (
          <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Globe size={18} className="text-accent" /> Основные настройки
              </h3>
              <div className="bg-bg/50 rounded-xl border border-border/50 divide-y divide-border/50">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Язык интерфейса</div>
                    <div className="text-xs text-textMuted">Выберите язык приложения</div>
                  </div>
                  <Select value={language} onChange={setLanguage} storageKey={STORAGE_KEYS.language} options={[
                    { value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }
                  ]} />
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Часовой пояс</div>
                    <div className="text-xs text-textMuted">Выберите ваш часовой пояс</div>
                  </div>
                  <Select value={timezone} onChange={setTimezone} storageKey={STORAGE_KEYS.timezone} options={[
                    { value: 'utc3', label: '(UTC+3) Москва' }, { value: 'utc0', label: '(UTC+0) Лондон' }
                  ]} />
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Формат даты</div>
                    <div className="text-xs text-textMuted">Как отображать дату</div>
                  </div>
                  <Select value={dateFormat} onChange={setDateFormat} storageKey={STORAGE_KEYS.dateFormat} options={[
                    { value: 'dd.mm.yyyy', label: 'DD.MM.YYYY' }, { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY' }
                  ]} />
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Формат времени</div>
                    <div className="text-xs text-textMuted">12 или 24 часа</div>
                  </div>
                  <Select value={timeFormat} onChange={setTimeFormat} storageKey={STORAGE_KEYS.timeFormat} options={[
                    { value: '24h', label: '24 часа' }, { value: '12h', label: '12 часов' }
                  ]} />
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Запуск приложения</div>
                    <div className="text-xs text-textMuted">Запускать при включении компьютера</div>
                  </div>
                  <Toggle checked={autoStart} onChange={setAutoStart} storageKey={STORAGE_KEYS.autoStart} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Palette size={18} className="text-accent" /> Настройки отображения
              </h3>
              <div className="bg-bg/50 rounded-xl border border-border/50 p-4 space-y-4">
                <div>
                  <div className="font-medium text-sm mb-2">Тема приложения</div>
                  <div className="flex gap-2">
                    {['dark', 'light', 'system'].map(t => (
                      <button
                        key={t}
                        onClick={() => saveSetting(STORAGE_KEYS.theme, t, setTheme)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                          theme === t ? 'bg-accent border-accent text-white' : 'bg-surface border-border text-textMuted hover:border-accent/50'
                        }`}
                      >
                        {t === 'dark' ? 'Темная' : t === 'light' ? 'Светлая' : 'Системная'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                  <div>
                    <div className="font-medium text-sm">Анимации интерфейса</div>
                    <div className="text-xs text-textMuted">Включить плавные переходы</div>
                  </div>
                  <Toggle checked={animations} onChange={setAnimations} storageKey={STORAGE_KEYS.animations} />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">Компактный режим</div>
                    <div className="text-xs text-textMuted">Уменьшить отступы</div>
                  </div>
                  <Toggle checked={compact} onChange={setCompact} storageKey={STORAGE_KEYS.compact} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <HardDrive size={18} className="text-accent" /> Кэш и данные
              </h3>
              <div className="bg-bg/50 rounded-xl border border-border/50 divide-y divide-border/50">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Размер кэша</div>
                    <div className="text-xs text-textMuted">Занято 256 MB</div>
                  </div>
                  <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-400/30 hover:bg-red-400/10 transition-colors">
                    <Trash2 size={14} /> Очистить
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* === ВКЛАДКА: ПРИВАТНОСТЬ === */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-lg font-semibold text-white">Настройки конфиденциальности</h3>
             <div className="bg-bg/50 rounded-xl border border-border/50 divide-y divide-border/50">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Показывать профиль в поиске</div>
                    <div className="text-xs text-textMuted">Разрешить другим находить вас</div>
                  </div>
                  <Toggle checked={showProfile} onChange={setShowProfile} storageKey={STORAGE_KEYS.showProfile} />
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium text-sm">Показывать игровую активность</div>
                    <div className="text-xs text-textMuted">Отображать текущие игры в профиле</div>
                  </div>
                  <Toggle checked={showActivity} onChange={setShowActivity} storageKey={STORAGE_KEYS.showActivity} />
                </div>
             </div>
          </div>
        )}

        {/* Заглушки для остальных вкладок */}
        {!['general', 'privacy'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-64 text-textMuted animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-border">
              {tabs.find(t => t.id === activeTab)?.icon && (
                <div className="text-accent">{React.createElement(tabs.find(t => t.id === activeTab)!.icon, { size: 32 })}</div>
              )}
            </div>
            <p className="text-lg font-medium text-white mb-1">Раздел "{tabs.find(t => t.id === activeTab)?.label}"</p>
            <p className="text-sm">Функционал будет добавлен в следующих обновлениях.</p>
          </div>
        )}
      </div>
    </div>
  );
}