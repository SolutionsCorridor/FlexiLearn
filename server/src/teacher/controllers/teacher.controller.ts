import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { CreateTeacherDto, TeacherMeetingDto, UpdateTeacherDto } from '../dto/teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Get()
    findAll() {
        return this.teacherService.getTeachers();
    }

    @Post('quiz/result')
    saveQuiz(@Body() body: { quizId: string; score: number; userId: string }) {
        return this.teacherService.saveQuizResult(body);
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

    @Put('meeting/:teacherId')
    updateMeeting(@Param('teacherId') teacherId: string, @Body() teacherMeetingDto: TeacherMeetingDto) {
        return this.teacherService.setMeeting(teacherId, teacherMeetingDto);
    }

    @Delete(':teacherId')
    remove(@Param('teacherId') teacherId: string) {
        return this.teacherService.deleteTeacher(teacherId);
    }

    @Put('comments/:teacherId')
    updateComments(@Param('teacherId') teacherId: string, @Body() body: any) {
        const { adminComments } = body;
        return this.teacherService.updateComments(teacherId, adminComments);
    }
}
