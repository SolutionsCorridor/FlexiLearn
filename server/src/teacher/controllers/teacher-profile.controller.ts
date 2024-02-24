import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TeacherProfileService } from '../services/teacher-profile.service';
import { CreateTeacherProfileDto, UpdateTeacherProfileDto } from '../dto/teacher-profile.dto';

@Controller('teacher/profile')
export class TeacherProfileController {
    constructor(private readonly teacherProfileService: TeacherProfileService) { }

    @Post()
    create(@Body() createTeacherProfileDto: CreateTeacherProfileDto) {
        return this.teacherProfileService.createTeacherProfile(createTeacherProfileDto);
    }

    @Get(':teacherId')
    findOne(@Param('teacherId') teacherId: string) {
        return this.teacherProfileService.getTeacherProfile(teacherId);
    }

    @Put(':teacherId')
    update(@Param('teacherId') teacherId: string, @Body() updateTeacherProfileDto: UpdateTeacherProfileDto) {
        return this.teacherProfileService.updateTeacherProfile(teacherId, updateTeacherProfileDto);
    }
}
