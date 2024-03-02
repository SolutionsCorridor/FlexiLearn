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

    @Prop([{ question: String, options: [String], correct_answer: Number }])
    questions: Array<{
        question: string;
        options: string[];
        correct_answer: number;
    }>;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
