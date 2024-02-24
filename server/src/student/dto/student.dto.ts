import { IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    readonly studentId: string;

    @IsString()
    readonly fullName: string;
}

export class UpdateStudentDto {
    @IsString()
    readonly qualification?: string;

    @IsString()
    readonly fullName?: string;
}
