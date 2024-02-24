import { IsString, IsInt, IsLatitude, IsLongitude, IsBoolean } from 'class-validator';

export class CreateTeacherProfileDto {
    @IsString()
    teacherId: string;

    @IsString()
    fullName?: string;

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

export class UpdateTeacherProfileDto {
    @IsString()
    teacherId: string;

    @IsString()
    fullName?: string;

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

    @IsInt()
    rating?: number;

    @IsInt()
    totalClasses?: number;

    @IsInt()
    totalStudents?: number;

    @IsInt()
    totalHours?: number;

    @IsInt()
    totalReviews?: number;

    @IsString()
    profileImage?: string;

    @IsString()
    cv?: string;
}
