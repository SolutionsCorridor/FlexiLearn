import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { User } from "src/user/schemas/user.schema";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Teacher extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop()
    fullName: string;

    @Prop({ type: [String] })
    courses: string[];

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

    @Prop({ default: "" })
    gender: string;

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

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
