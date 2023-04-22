import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardStatus} from "./boards.enums";
import {BoardRepository} from "../board.repository";
import {Board} from "./board.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateBoardDto} from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository) {} //CustomRepository 데코레이터는 injectRepository 안써도됨
    // private boards: Board[] = [{
    //     id: "1",
    //     title: "test",
    //     description: "text text text",
    //     status: BoardStatus.PUBLIC,
    // },
    //     {
    //         id: "2",
    //         title: "test",
    //         description: "text text text",
    //         status: BoardStatus.PRIVATE,
    //     }
    // ];
    //
    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }


    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board> {
        const found =  await this.boardRepository.findOne(id);

        if(!found) throw new NotFoundException(`Can't find Board with id ${id}`);

        return found;
    }
    //
    async deleteBoard(id: number): Promise<void> {
        const result =await this.boardRepository.delete(id);

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
