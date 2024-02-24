import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get(':studentId')
    findOne(@Param('studentId') studentId: string) {
        return this.studentService.getStudent(studentId);
    }

    // @Put(':studentId')
    // update(@Param('studentId') studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
    //     return this.studentService.updateStudent(studentId, updateStudentDto);
    // }

    @Delete(':studentId')
    remove(@Param('studentId') studentId: string) {
        return this.studentService.deleteStudent(studentId);
    }
}
