import { PlayerStats, MatchHistory } from '../types/game';

const isElectron = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes(' electron/') || !!(window as any).electronAPI;
};

export const fetchWarfaceStats = async (nickname: string): Promise<{ stats: PlayerStats, matches: MatchHistory[] }> => {
  if (!isElectron()) {
    throw new Error('API Warface доступно только в Electron-приложении.');
  }

  const result = await (window as any).electronAPI.getWarfaceStats(nickname);

  if (!result.success) {
    throw new Error(result.error || 'Неизвестная ошибка при получении данных');
  }

  const rawData = result.data;
  if (!rawData) {
    throw new Error('Данные игрока пусты');
  }

  // --- МАППИНГ ПОД РЕАЛЬНЫЙ ОТВЕТ api.warface.ru ---
  const pvpKd = Number(rawData.pvp) || 0;
  const pvpMatches = Number(rawData.pvp_all) || 0;
  const pvpWins = Number(rawData.pvp_wins) || 0;
  
  // Считаем винрейт сами, так как API его не отдает
  const winRate = pvpMatches > 0 ? ((pvpWins / pvpMatches) * 100).toFixed(1) + '%' : '0%';

  const stats: PlayerStats = {
    nickname: rawData.nickname || nickname,
    gameId: 'warface',
    level: Number(rawData.rank_id) || 1,
    rank: `Ранг ${rawData.rank_id || '?'}`,
    rating: 0, // В этом эндпоинте нет Skill/Rating
    matches: pvpMatches,
    wins: pvpWins,
    kd: pvpKd,
    avgDamage: 0, // Средний урон в сыром дампе отсутствует
    winRate: winRate,
    server: rawData.shard ? `Shard ${rawData.shard}` : 'RU',
    experience: Number(rawData.experience) || 0,
    maxExperience: 150000, // Примерный порог для прогресс-бара
    clan: rawData.clan_name || '-',
    playtime: rawData.playtime_h ? `${rawData.playtime_h} ч.` : '-',
    // В API опечатка: favoritPVP вместо favoritePVP. Учитываем это.
    favoritePVP: rawData.favoritPVP || rawData.favoritePVP || '-',
  };

  // История последних матчей этим эндпоинтом не отдается. 
  // В будущем сделаем мок или ручной ввод, как указано в TODO.
  const matches: MatchHistory[] = [];

  return { stats, matches };
};