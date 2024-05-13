import { IsString, IsLatitude, IsLongitude, IsInt } from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    readonly studentId: string;

    @IsString()
    readonly teacherId: string;

    @IsString()
    readonly date: string;

    @IsString()
    readonly time: string;
}

export class UpdateAppointmentDto {
    @IsString()
    readonly date?: string;

    @IsString()
    readonly time?: string;
}