import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { StudentProfileService } from '../services/student-profile.service';
import { CreateStudentProfileDto, UpdateStudentProfileDto } from '../dto/student-profile.dto';

@Controller('student/profile')
export class StudentProfileController {
    constructor(private readonly studentProfileService: StudentProfileService) { }

    @Post()
    create(@Body() createStudentProfileDto: CreateStudentProfileDto) {
        return this.studentProfileService.createStudentProfile(createStudentProfileDto);
    }

    @Get(':studentId')
    findOne(@Param('studentId') studentId: string) {
        return this.studentProfileService.getStudentProfile(studentId);
    }

    @Put(':studentId')
    update(@Param('studentId') studentId: string, @Body() updateStudentProfileDto: UpdateStudentProfileDto) {
        return this.studentProfileService.updateStudentProfile(studentId, updateStudentProfileDto);
    }
}
