import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  GameRound,
  GameStatistics,
  Move,
  PlayRoundRequest
} from './game.models';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private readonly apiUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  playRound(playerMove: Move): Observable<GameRound> {
    const request: PlayRoundRequest = {
      playerMove
    };

    return this.http.post<GameRound>(
      `${this.apiUrl}/rounds`,
      request
    );
  }

  getRounds(): Observable<GameRound[]> {
    return this.http.get<GameRound[]>(
      `${this.apiUrl}/rounds`
    );
  }

  getStatistics(): Observable<GameStatistics> {
    return this.http.get<GameStatistics>(
      `${this.apiUrl}/statistics`
    );
  }

  resetGame(): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/rounds`
    );
  }
}