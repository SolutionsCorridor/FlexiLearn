// StudentProfile Schema
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Student } from './student.schema';

@Schema()
export class StudentProfile extends Document {
    @Prop({ type: Student })
    student: Student;

    @Prop({ unique: true })
    studentId: string;

    @Prop({ default: "" })
    profileImage: string;

    @Prop({ default: "" })
    dob: string;

    @Prop({ default: "" })
    language: string;

    @Prop({ default: "" })
    gender: string;
}

export const StudentProfileSchema = SchemaFactory.createForClass(StudentProfile);
