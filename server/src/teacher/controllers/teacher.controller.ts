import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from '../dto/teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Get()
    findAll() {
        return this.teacherService.getTeachers();
    }

    @Get(':teacherId')
    findOne(@Param('teacherId') teacherId: string) {
        return this.teacherService.getTeacher(teacherId);
    }

    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teacherService.createTeacher(createTeacherDto);
    }

    @Put(':teacherId')
    update(@Param('teacherId') teacherId: string, @Body() updateTeacherDto: UpdateTeacherDto) {
        return this.teacherService.updateTeacher(teacherId, updateTeacherDto);
    }

    @Delete(':teacherId')
    remove(@Param('teacherId') teacherId: string) {
        return this.teacherService.deleteTeacher(teacherId);
    }

}
