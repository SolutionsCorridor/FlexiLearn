import { IsString, IsNumber } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    readonly teacherId: string;

    @IsString()
    readonly fullName: string;

    @IsString()
    readonly qualification: string;

    @IsString()
    readonly status: string;

    @IsNumber()
    readonly experience: number;
}

export class UpdateTeacherDto {
    @IsString()
    readonly qualification?: string;

    @IsString()
    readonly fullName?: string;

    @IsString()
    readonly status?: string;

    @IsNumber()
    readonly experience?: number;
}
