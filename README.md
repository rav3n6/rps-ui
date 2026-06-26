# Rock Paper Scissors UI

Responsive Angular single-page application for playing Rock Paper Scissors against a computer-controlled opponent. The UI consumes the companion Spring Boot API, displays the latest result and session history, maintains a live scoreboard, and provides a separate analytics dashboard.

The backend repository is available in [`rav3n6/rps-bknd`](https://github.com/rav3n6/rps-bknd).

## Features

- Select Rock, Paper, or Scissors from the game screen
- Display the player's move, the computer's move, and the latest result
- Maintain player wins, computer wins, and draws in a session scoreboard
- Display persisted round history returned by the backend
- Reset the complete session from the UI
- Show API loading and error states
- Navigate between the game and analytics views
- Display total rounds, player win rate, computer win rate, and draw rate
- Display player move distribution and the most frequently selected move
- Adapt the layout for desktop and smaller screens

## Technology stack

- Angular 21.2
- TypeScript 5.9
- RxJS 7.8
- Angular Material and Angular CDK
- Standalone Angular components
- Angular Router
- Angular `HttpClient`
- Karma and Jasmine

## Prerequisites

Use a Node.js version supported by the Angular 21 toolchain included in this repository:

- Node.js `20.19` or later in the Node 20 line
- Node.js `22.12` or later in the Node 22 line
- Node.js 24 or later
- npm 8 or later

The backend must be running at `http://localhost:8080` for gameplay, history, reset, and analytics requests to succeed.

## Dependency compatibility note

The current dependency files combine Angular `21.2.x` with Angular Material and Angular CDK `19.2.19`. Material 19 declares peer compatibility with Angular 19 and 20, not Angular 21.

Before treating the project as a clean Angular 21 installation, align both UI libraries to the same Angular major and regenerate `package-lock.json`:

```bash
npm install @angular/material@21.2.4 @angular/cdk@21.2.4
```

Commit the regenerated `package.json` and `package-lock.json` together. Do not rely on `--force` or `--legacy-peer-deps` for the final submission because those options bypass peer-dependency validation rather than resolving the version mismatch.

## Run locally

First, start the backend:

```bash
git clone https://github.com/rav3n6/rps-bknd.git
cd rps-bknd
./mvnw spring-boot:run
```

In a second terminal, clone and start the UI after aligning the Material/CDK versions described above:

```bash
git clone https://github.com/rav3n6/rps-ui.git
cd rps-ui
npm install
npm start
```

Open:

```text
http://localhost:4200
```

The `npm start` script runs Angular's development server with `proxy.conf.json`. Requests sent to `/api` are forwarded to `http://localhost:8080`, avoiding hard-coded backend URLs in the application services.

## Available routes

| Route | View | Description |
|---|---|---|
| `/` | Game | Move selection, latest result, scoreboard, history, and reset |
| `/analytics` | Analytics | Session metrics, move distribution, and playing behavior |
| Any unknown path | Redirect | Redirects to the game view |

## Backend API usage

`GameApiService` uses a relative `/api` base path and calls:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/rounds` | Play a round |
| `GET` | `/api/rounds` | Load round history |
| `GET` | `/api/statistics` | Load aggregate statistics |
| `DELETE` | `/api/rounds` | Reset all saved rounds |

The client-side contracts expect these values:

```typescript
type Move = 'ROCK' | 'PAPER' | 'SCISSORS';
type RoundResult = 'WIN' | 'LOSS' | 'DRAW';
```

## State management

`GameStateService` is the central state boundary for the application. It owns observable streams for:

- Round history
- Statistics
- Latest round
- Loading state
- API errors
- Move distribution
- Most-played move
- Computer win rate
- Draw rate

The service loads history and statistics together, prevents concurrent game actions, prepends newly completed rounds to local history, refreshes backend statistics after each round, and clears local state after a successful reset.

## Build

Create a production build:

```bash
npm run build
```

The generated output is written to:

```text
dist/rps
```

The production configuration includes bundle-size budgets and output hashing.

## Tests

Run the Karma/Jasmine test suite:

```bash
npm test
```

For a non-interactive browser run suitable for automation:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

The current component tests verify application, game page, analytics dashboard, and supporting UI component creation. The repository does not currently include dedicated unit tests for `GameStateService` or `GameApiService`.

## Project structure

```text
src/app/
├── analytics/                  # Analytics dashboard
├── components/navbar/         # Main navigation
├── game/
│   ├── game-page/              # Main game container
│   ├── move-selector/          # Player move controls
│   ├── round-history/          # Persisted round list
│   ├── scoreboard/             # Win/loss/draw summary
│   ├── game-api.service.ts     # Backend HTTP client
│   ├── game-state.service.ts   # Shared observable application state
│   └── game.models.ts          # API and game types
├── app.component.*             # Application shell
├── app.config.ts               # Router and HttpClient providers
└── app.routes.ts               # Game and analytics routes
```

## Configuration

The development proxy is defined in `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

For a deployed environment, route `/api` to the backend through the hosting platform or replace the API base URL with environment-specific configuration.
