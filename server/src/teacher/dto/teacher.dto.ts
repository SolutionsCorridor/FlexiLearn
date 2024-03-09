import { IsString, IsLatitude, IsLongitude, IsInt } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    readonly teacherId: string;

    @IsString()
    readonly fullName: string;

    @IsString()
    aboutMe?: string;

    @IsString()
    education?: string;

    @IsString()
    experience?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsLatitude()
    longitude?: number;

    @IsLongitude()
    latitude?: number;

    @IsString()
    subject?: string;

    @IsString()
    availability?: string;

    @IsInt()
    availabilityHours?: number;

    @IsInt()
    hourlyRate?: number;

    @IsString()
    profileImage?: string;

    @IsString()
    cv?: string;
}
export class UpdateTeacherDto {
    @IsString()
    readonly fullName?: string;

    @IsString()
    aboutMe?: string;

    @IsString()
    education?: string;

    @IsString()
    experience?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsLatitude()
    longitude?: number;

    @IsLongitude()
    latitude?: number;

    @IsString()
    subject?: string;

    @IsString()
    availability?: string;

    @IsInt()
    availabilityHours?: number;

    @IsInt()
    hourlyRate?: number;

    @IsString()
    profileImage?: string;

    @IsString()
    cv?: string;
}

export class TeacherMeetingDto {
    @IsString()
    readonly meetingDate: string;

    @IsString()
    readonly meetingTime: string;
}
