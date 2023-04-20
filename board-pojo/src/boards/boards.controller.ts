import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board, BoardStatus} from "./boards.model";
import {CreateBoardDto} from "./dto/create-board.dto";

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard(@Body('title') createBoardDto: CreateBoardDto):Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    // @Param() parmam: Board[] => 여러개 쿼리파라미터로 사용가능

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string): void {
        this.boardsService.deleteBoard(id);
    }

    @Put('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}