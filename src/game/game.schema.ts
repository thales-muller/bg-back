import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { GameStatus } from 'src/enum/status.enum';

@Schema()
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  points: number;
}

@Schema()
export class Game {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Team], required: true })
  teams: Team[];

  @Prop({ type: [String], required: true })
  words: string[];

  @Prop({
    type: String,
    enum: Object.values(GameStatus),
    default: GameStatus.CREATE,
  })
  status: GameStatus;
}

export type GameDocument = Game & Document;

export const GameSchema = SchemaFactory.createForClass(Game);
