import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {BoardStatus} from "../boards.enums";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
         BoardStatus.PRIVATE,
         BoardStatus.PUBLIC,
        ]

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value}`);
        }
        console.log(value);
        console.log(metadata);
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}