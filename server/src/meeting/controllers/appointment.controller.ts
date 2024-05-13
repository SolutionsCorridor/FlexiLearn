import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Post('')
    createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.createAppointment(createAppointmentDto);
    }

    @Get('student/:studentId/teacher/:teacherId')
    getAppointments(@Param() data: { studentId: string; teacherId: string }) {
        return this.appointmentService.getAppointments(data);
    }

}
