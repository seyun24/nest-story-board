import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
//인터페이스가 아닌 클래스인 이유 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할때 유리