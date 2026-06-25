import {
  computed,
  inject,
  Injectable,
  signal
} from '@angular/core';

import { firstValueFrom } from 'rxjs';

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
  private readonly gameApi = inject(GameApiService);

  private readonly roundsState =
    signal<readonly GameRound[]>([]);

  private readonly statisticsState =
    signal<GameStatistics>({ ...EMPTY_STATISTICS });

  private readonly loadingState = signal(false);

  private readonly errorState =
    signal<string | null>(null);

  private readonly initializedState = signal(false);

  readonly rounds = this.roundsState.asReadonly();

  readonly statistics =
    this.statisticsState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly lastRound = computed(
    () => this.roundsState()[0] ?? null
  );

  readonly moveDistribution = computed<
    Record<Move, number>
  >(() => {
    const distribution: Record<Move, number> = {
      ROCK: 0,
      PAPER: 0,
      SCISSORS: 0
    };

    for (const round of this.roundsState()) {
      distribution[round.playerMove]++;
    }

    return distribution;
  });

  readonly mostPlayedMove = computed<Move | null>(() => {
    if (this.roundsState().length === 0) {
      return null;
    }

    const distribution = this.moveDistribution();

    const moves: Move[] = [
      'ROCK',
      'PAPER',
      'SCISSORS'
    ];

    return moves.reduce((mostPlayed, currentMove) =>
      distribution[currentMove] >
      distribution[mostPlayed]
        ? currentMove
        : mostPlayed
    );
  });

  readonly lossRate = computed(() =>
    this.calculatePercentage(
      this.statisticsState().losses,
      this.statisticsState().totalRounds
    )
  );

  readonly drawRate = computed(() =>
    this.calculatePercentage(
      this.statisticsState().draws,
      this.statisticsState().totalRounds
    )
  );

  async loadGame(): Promise<void> {
    if (
      this.initializedState() ||
      this.loadingState()
    ) {
      return;
    }

    this.loadingState.set(true);
    this.errorState.set(null);

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

      this.roundsState.set(rounds);
      this.statisticsState.set(statistics);
      this.initializedState.set(true);
    } catch (error: unknown) {
      console.error('Failed to load game data', error);

      this.errorState.set(
        'Unable to load game data. Make sure the backend is running.'
      );
    } finally {
      this.loadingState.set(false);
    }
  }

  async playRound(playerMove: Move): Promise<void> {
    if (this.loadingState()) {
      return;
    }

    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const savedRound = await firstValueFrom(
        this.gameApi.playRound(playerMove)
      );

      this.roundsState.update(currentRounds => [
        savedRound,
        ...currentRounds
      ]);

      const updatedStatistics =
        await firstValueFrom(
          this.gameApi.getStatistics()
        );

      this.statisticsState.set(updatedStatistics);
      this.initializedState.set(true);
    } catch (error: unknown) {
      console.error('Failed to play round', error);

      this.errorState.set(
        'The round could not be played. Please try again.'
      );
    } finally {
      this.loadingState.set(false);
    }
  }

  async resetGame(): Promise<void> {
    if (this.loadingState()) {
      return;
    }

    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      await firstValueFrom(
        this.gameApi.resetGame()
      );

      this.roundsState.set([]);

      this.statisticsState.set({
        ...EMPTY_STATISTICS
      });

      this.initializedState.set(true);
    } catch (error: unknown) {
      console.error('Failed to reset game', error);

      this.errorState.set(
        'The game could not be reset. Please try again.'
      );
    } finally {
      this.loadingState.set(false);
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