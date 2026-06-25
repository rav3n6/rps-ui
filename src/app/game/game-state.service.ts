import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameApiService } from './game-api.service';

import {
  GameRound,
  GameStatistics,
  Move
} from '../game/game.models';

const EMPTY_STATISTICS: GameStatistics = {
  totalRounds: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  winRate: 0
};

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly roundsSubject = new BehaviorSubject<readonly GameRound[]>([]);
  private readonly statisticsSubject = new BehaviorSubject<GameStatistics>({ ...EMPTY_STATISTICS });
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  private readonly initializedSubject = new BehaviorSubject<boolean>(false);

  readonly rounds$: Observable<readonly GameRound[]> = this.roundsSubject.asObservable();
  readonly statistics$: Observable<GameStatistics> = this.statisticsSubject.asObservable();
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  readonly lastRound$: Observable<GameRound | null> = this.rounds$.pipe(
    map(rounds => rounds[0] ?? null)
  );

  readonly moveDistribution$: Observable<Record<Move, number>> = this.rounds$.pipe(
    map(rounds => {
      const distribution: Record<Move, number> = {
        ROCK: 0,
        PAPER: 0,
        SCISSORS: 0
      };
      for (const round of rounds) {
        distribution[round.playerMove]++;
      }
      return distribution;
    })
  );

  readonly mostPlayedMove$: Observable<Move | null> = this.rounds$.pipe(
    map(rounds => {
      if (rounds.length === 0) {
        return null;
      }
      const distribution: Record<Move, number> = {
        ROCK: 0,
        PAPER: 0,
        SCISSORS: 0
      };
      for (const round of rounds) {
        distribution[round.playerMove]++;
      }
      const moves: Move[] = ['ROCK', 'PAPER', 'SCISSORS'];
      return moves.reduce((mostPlayed, currentMove) =>
        distribution[currentMove] > distribution[mostPlayed] ? currentMove : mostPlayed
      );
    })
  );

  readonly lossRate$: Observable<number> = this.statistics$.pipe(
    map(stats => this.calculatePercentage(stats.losses, stats.totalRounds))
  );

  readonly drawRate$: Observable<number> = this.statistics$.pipe(
    map(stats => this.calculatePercentage(stats.draws, stats.totalRounds))
  );

  constructor(private readonly gameApi: GameApiService) {}

  async loadGame(): Promise<void> {
    if (
      this.initializedSubject.value ||
      this.loadingSubject.value
    ) {
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const [rounds, statistics] =
        await Promise.all([
          firstValueFrom(
            this.gameApi.getRounds()
          ),
          firstValueFrom(
            this.gameApi.getStatistics()
          )
        ]);

      this.roundsSubject.next(rounds);
      this.statisticsSubject.next(statistics);
      this.initializedSubject.next(true);
    } catch (error: unknown) {
      console.error('Failed to load game data', error);

      this.errorSubject.next(
        'Unable to load game data. Make sure the backend is running.'
      );
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async playRound(playerMove: Move): Promise<void> {
    if (this.loadingSubject.value) {
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const savedRound = await firstValueFrom(
        this.gameApi.playRound(playerMove)
      );

      this.roundsSubject.next([
        savedRound,
        ...this.roundsSubject.value
      ]);

      const updatedStatistics =
        await firstValueFrom(
          this.gameApi.getStatistics()
        );

      this.statisticsSubject.next(updatedStatistics);
      this.initializedSubject.next(true);
    } catch (error: unknown) {
      console.error('Failed to play round', error);

      this.errorSubject.next(
        'The round could not be played. Please try again.'
      );
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async resetGame(): Promise<void> {
    if (this.loadingSubject.value) {
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      await firstValueFrom(
        this.gameApi.resetGame()
      );

      this.roundsSubject.next([]);

      this.statisticsSubject.next({
        ...EMPTY_STATISTICS
      });

      this.initializedSubject.next(true);
    } catch (error: unknown) {
      console.error('Failed to reset game', error);

      this.errorSubject.next(
        'The game could not be reset. Please try again.'
      );
    } finally {
      this.loadingSubject.next(false);
    }
  }

  private calculatePercentage(
    count: number,
    total: number
  ): number {
    if (total === 0) {
      return 0;
    }

    return Math.round((count / total) * 100);
  }
}