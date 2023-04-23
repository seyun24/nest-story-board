import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardStatus} from "./boards.enums";
import {BoardRepository} from "../board.repository";
import {Board} from "./board.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateBoardDto} from "./dto/create-board.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository) {} //CustomRepository 데코레이터는 injectRepository 안써도됨

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', {userId: user.id})

        const boards = await query.getMany();
        return boards;
    }

    createBoard(createBoardDto: CreateBoardDto ,user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found =  await this.boardRepository.findOne(id);

        if(!found) throw new NotFoundException(`Can't find Board with id ${id}`);

        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result =await this.boardRepository.delete({id, user});

        if (result.affected === 0)
            throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
