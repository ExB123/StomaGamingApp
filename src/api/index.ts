import { PlayerStats, MatchHistory } from '../types/game';
import { fetchWarfaceStats } from './warface';

export const searchPlayerStats = async (gameId: string, nickname: string): Promise<{ stats: PlayerStats; matches: MatchHistory[] }> => {
  if (gameId === 'warface') {
    return await fetchWarfaceStats(nickname);
  }
  throw new Error(`Поддержка игры "${gameId}" пока не реализована`);
};