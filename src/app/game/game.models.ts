export type Move = 'ROCK' | 'PAPER' | 'SCISSORS';

export type RoundResult = 'WIN' | 'LOSS' | 'DRAW';

export interface PlayRoundRequest {
  playerMove: Move;
}

export interface GameRound {
  id?: number;
  playerMove: Move;
  computerMove: Move;
  result: RoundResult;
  playedAt: string;
}

export interface GameStatistics {
  totalRounds: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
}