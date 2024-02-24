import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { User } from "src/user/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Parent extends Document {
    @Prop({ type: User })
    user: User;

    @Prop()
    parentId: string;
    
    @Prop({ unique: true })
    fullName: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
