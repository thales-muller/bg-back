import { Module } from '@nestjs/common';
import { GameController } from './game.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { Game, GameSchema } from './game.schema';
import { GameService } from './game.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
