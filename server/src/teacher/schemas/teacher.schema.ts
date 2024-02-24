import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { User } from "src/user/schemas/user.schema";

@Schema()
export class Teacher extends Document {
    @Prop({ type: User })
    user: User;

    @Prop({ unique: true })
    fullName: string;

    @Prop()
    qualification: string;

    @Prop()
    status: string;

    @Prop()
    experience: number;

    @Prop({ type: [String] })
    courses: string[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
