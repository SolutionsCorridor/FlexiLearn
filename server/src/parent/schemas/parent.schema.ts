import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
    timestamps: true,
})
export class Parent extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ default: "" })
    fullName: string;

    @Prop({ default: "" })
    profileImage: string;

    @Prop({ default: "" })
    phoneNo: string;

    @Prop({ default: "" })
    language: string;

    @Prop({ default: "" })
    gender: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
