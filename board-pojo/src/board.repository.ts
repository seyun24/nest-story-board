import {EntityRepository, Repository} from "typeorm";
import {Board} from "./boards/board.entity";
import {CreateBoardDto} from "./boards/dto/create-board.dto";
import {BoardStatus} from "./boards/boards.enums";


@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board: Board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    }
}