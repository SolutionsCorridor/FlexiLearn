import { IsString } from 'class-validator';

export class CreateParentDto {
    @IsString()
    readonly parentId: string;

    @IsString()
    readonly fullName: string;
}

export class UpdateParentDto {
    @IsString()
    readonly fullName?: string;
}
