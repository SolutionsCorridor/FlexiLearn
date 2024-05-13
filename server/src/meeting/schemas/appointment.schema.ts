import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Appointment extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student' })
    studentId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Teacher' })
    teacherId: MongooseSchema.Types.ObjectId;

    @Prop({ default: "" })
    date: string;

    @Prop({ default: "" })
    time: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
