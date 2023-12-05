import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Game, GameDocument } from './game.schema';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';
import { AddWordDto } from './dto/add-word.dto';
import { DeleteWordDto } from './dto/delete-word.dto';
import { GameStatus } from 'src/enum/status.enum';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) { }

  /**
   * Get all games.
   * @returns {Promise<Game[]>} A promise that resolves to an array of games.
   */
  async getAllGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  /**
   * Get a game by its ID.
   * @param {string} id - The ID of the game.
   * @returns {Promise<Game>} A promise that resolves to the requested game.
   * @throws {NotFoundException} Thrown if the game is not found.
   */
  async getGameById(id: string): Promise<Game> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  /**
   * Create a new game.
   * @param {CreateGameDto} createGameDto - The data to create a new game.
   * @returns {Promise<Game>} A promise that resolves to the created game.
   */
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  /**
   * Add a word to the game's word array.
   * @param {AddWordDto} addWordDto - The data to add a word to the game.
   * @returns {Promise<Game>} A promise that resolves to the updated game.
   * @throws {NotFoundException} Thrown if the game is not found.
   * @throws {BadRequestException} Thrown if the word already exists in the game.
   */
  async addWord(addWordDto: AddWordDto): Promise<Game> {
    const { gameId, word } = addWordDto;
    const lowercaseWord = word.toLowerCase();

    try {
      const game = await this.gameModel.findById(gameId).exec();
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      // Check if the game already in progress
      if (game.status == GameStatus.IN_PROGRESS) {
        throw new BadRequestException('The game already has been started');
      }

      // Check if the game already have finished
      if (game.status == GameStatus.FINISHED) {
        throw new BadRequestException('The game already has finished');
      }

      // Check if the word already exists in the array
      if (game.words.includes(lowercaseWord)) {
        throw new BadRequestException('Word already exists in the game');
      }

      // Add the word to the array
      game.words.push(lowercaseWord);

      // Save the updated game document
      return game.save();
    } catch (error) {
      // Handle specific errors or log them
      throw error; // Rethrow the error or handle it as needed
    }
  }

  /**
 * Delete a word from the game's word array.
 * @param {DeleteWordDto} deleteWordDto - The data to delete a word from the game.
 * @returns {Promise<Game>} A promise that resolves to the updated game.
 * @throws {NotFoundException} Thrown if the game is not found.
 * @throws {BadRequestException} Thrown if the word does not exist in the game.
 */
  async deleteWord(deleteWordDto: DeleteWordDto): Promise<Game> {
    const { gameId, word } = deleteWordDto;
    const lowercaseWord = word.toLowerCase();

    try {
      const game = await this.gameModel.findById(gameId).exec();
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      // Check if the word exists in the array
      if (!game.words.includes(lowercaseWord)) {
        throw new BadRequestException('Word does not exist in the game');
      }

      // Check if the game already in progress
      if (game.status == GameStatus.IN_PROGRESS) {
        throw new BadRequestException('The game already has been started');
      }

      // Check if the game already have finished
      if (game.status == GameStatus.FINISHED) {
        throw new BadRequestException('The game already has finished');
      }

      // Delete the word from the array
      game.words = game.words.filter((w) => w !== lowercaseWord);

      // Save the updated game document
      return game.save();
    } catch (error) {
      // Handle specific errors or log them
      throw error; // Rethrow the error or handle it as needed
    }
  }

  /**
   * Update a game by its ID.
   * @param {string} id - The ID of the game to update.
   * @param {UpdateGameDto} updateGameDto - The data to update the game.
   * @returns {Promise<Game>} A promise that resolves to the updated game.
   */
  async updateGameById(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    try {
      return this.gameModel.findByIdAndUpdate(id, updateGameDto, { new: true }).exec();
    } catch (error) {
      // Handle specific errors or log them
      throw error; // Rethrow the error or handle it as needed
    }
  }

  /**
   * Delete a game by its ID.
   * @param {string} id - The ID of the game to delete.
   * @returns {Promise<Game | null>} A promise that resolves to the deleted game, or null if not found.
   */
  async deleteGame(id: string): Promise<Game | null> {
    try {
      const deletedGame = await this.gameModel.findByIdAndDelete(id).exec();
      return deletedGame as unknown as Game | null;
    } catch (error) {
      // Handle specific errors or log them
      throw error; // Rethrow the error or handle it as needed
    }
  }

}
