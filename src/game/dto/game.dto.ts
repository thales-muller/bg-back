import { GameStatus } from "src/enum/status.enum";

export class CreateGameDto {
  readonly name: string;
  readonly teams: Team[];
  readonly words: string[];
  readonly status: GameStatus;
}

export class UpdateGameDto {
  readonly name?: string;
  readonly teams?: Team[];
  readonly words?: string[];
  readonly status?: GameStatus;
}

export class Team {
  name: string;
  points: number;
}
