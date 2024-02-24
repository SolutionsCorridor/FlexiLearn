// TeacherProfile Schema
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Teacher } from './teacher.schema';

@Schema()
export class TeacherProfile extends Document {
    @Prop({ type: Teacher })
    teacher: Teacher;

    @Prop({ unique: true })
    teacherId: string;

    @Prop({ default: "" })
    profileImage: string;

    @Prop({ default: "" })
    aboutMe: string;

    @Prop({ default: "" })
    education: string;

    @Prop({ default: "" })
    experience: string;

    @Prop({ default: "" })
    language: string;

    @Prop({ default: 0 })
    longitude: number;

    @Prop({ default: 0 })
    latitude: number;

    @Prop({ default: "" })
    subject: string;

    @Prop({ default: "" })
    availability: string;

    @Prop({ default: 0 })
    availabilityHours: number;

    @Prop({ default: 0 })
    hourlyRate: number;

    @Prop({ default: 0 })
    rating: number;

    @Prop({ default: 0 })
    totalClasses: number;

    @Prop({ default: 0 })
    totalStudents: number;

    @Prop({ default: 0 })
    totalHours: number;

    @Prop({ default: 0 })
    totalReviews: number;

    @Prop({ default: "" })
    cv: string;
}

export const TeacherProfileSchema = SchemaFactory.createForClass(TeacherProfile);
