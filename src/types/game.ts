export interface Game {
  id: string;
  name: string;
  icon: string;
  platform: 'PC' | 'Mobile' | 'Console';
}

export interface PlayerStats {
  nickname: string;
  gameId: string;
  level: number;
  rank: string;
  rating: number;
  matches: number;
  wins: number;
  kd: number;
  avgDamage: number;
  winRate: string;
  server?: string;
  experience?: number;
  maxExperience?: number;
  
  // Дополнительные поля с wfts.su
  clan?: string;
  playtime?: string;
  favoritePVP?: string;
}

export interface MatchHistory {
  id: string;
  mode: string;
  map?: string;
  result: 'win' | 'loss';
  score: string;
  kd: string;
  damage?: string;
  date: string;
  type: 'win' | 'loss';
}