import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Student extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Parent' })
    parentId?: MongooseSchema.Types.ObjectId;

    @Prop({ unique: true })
    fullName: string;

    @Prop({ default: "" })
    profileImage: string;

    @Prop({ default: "" })
    dob: string;

    @Prop({ default: "" })
    language: string;

    @Prop({ default: "" })
    gender: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
