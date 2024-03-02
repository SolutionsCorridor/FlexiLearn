import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({
    timestamps: true,
})
export class Quiz extends Document {

    @Prop()
    topic: string;

    @Prop()
    numberOfQuestions: number;

    @Prop()
    questions: Array<any>;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
