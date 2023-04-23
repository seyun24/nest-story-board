import {EntityRepository, Repository} from "typeorm";
import {Board} from "./boards/board.entity";
import {CreateBoardDto} from "./boards/dto/create-board.dto";
import {BoardStatus} from "./boards/boards.enums";
import {User} from "./auth/user.entity";


@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board : Board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);
        return board;
    }
}