import { DeleteWordDto } from './dto/delete-word.dto';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';
import { AddWordDto } from './dto/add-word.dto';

@Controller('game')
export class GameController {

  constructor(private readonly gameService: GameService) { }

  @Get()
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @Post()
  createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Post('/add-word')
  async addWord(@Body() addWordDto: AddWordDto) {
    return this.gameService.addWord(addWordDto);
  }

  @Post('/delete-word')
  async deleteWord(@Body() deleteWordDto: DeleteWordDto) {
    return this.gameService.deleteWord(deleteWordDto);
  }

  @Put(':id')
  updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.updateGameById(id, updateGameDto);
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }
}
