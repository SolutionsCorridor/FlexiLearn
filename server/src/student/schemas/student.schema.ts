import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Parent } from "src/parent/schemas/parent.schema";
import { User } from "src/user/schemas/user.schema";

@Schema()
export class Student extends Document {
    @Prop({ type: User })
    user: User;

    @Prop({ type: Parent })
    parent?: Parent;

    @Prop({ unique: true })
    id: string;

    @Prop({ unique: true })
    fullName: string;

    @Prop()
    parentId?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
