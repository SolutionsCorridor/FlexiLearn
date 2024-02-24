// ParentProfile Schema
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Parent } from './parent.schema';

@Schema()
export class ParentProfile extends Document {
    @Prop({ type: Parent })
    parent: Parent;

    @Prop({ unique: true })
    parentId: string;

    @Prop({ default: "" })
    profileImage: string;

    @Prop({ default: "" })
    phoneNo: string;

    @Prop({ default: "" })
    language: string;

    @Prop({ default: "" })
    gender: string;
}

export const ParentProfileSchema = SchemaFactory.createForClass(ParentProfile);
