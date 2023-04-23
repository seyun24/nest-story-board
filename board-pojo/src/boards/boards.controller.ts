import {
    Body,
    Controller,
    Delete,
    Get, Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {BoardStatus} from "./boards.enums";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import {Board} from "./board.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('boards')
@UseGuards(AuthGuard()) // 컨트롤러 레밸
export class BoardsController {

    private logger = new Logger('BoardsController');

    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(`User "${user.userName} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard
    (@Body() createBoardDto: CreateBoardDto,
     @GetUser() user: User,):Promise<Board> {
        this.logger.verbose(`user ${user.userName} creating a new board.
        Payload: ${JSON.stringify(createBoardDto)}
        `)
        return this.boardsService.createBoard(createBoardDto, user);
    }

  //   // @Param() parmam: Board[] => 여러개 쿼리파라미터로 사용가능
  //
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }


    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}