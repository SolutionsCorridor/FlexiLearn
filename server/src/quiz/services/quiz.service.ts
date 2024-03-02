import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from '../schemas/quiz.schema';

@Injectable()
export class QuizService {
    private openai;
    constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>) {
        this.openai = new OpenAI({
            apiKey: `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`,
        });
    }



    async createQuiz(subject: string, numberOfMCQs: number): Promise<any> {
        try {
            const promptPart1 = `Generate ${numberOfMCQs} advanced-level multiple choice questions about ${subject}.`;
            const promptPart2 = `These questions should be complex and challenging, targeting the assessment of teachers rather than students.`;
            const promptPart3 = `The questions should delve into nuanced aspects of ${subject}, requiring deep knowledge and expertise. They should test critical thinking, analytical skills, and expert insight.`;
            const promptPart4 = `Format the questions in JSON, with each question offering multiple plausible options, and indicate the correct answer.`;

            const prompt = `${promptPart1} ${promptPart2} ${promptPart3} ${promptPart4}`;

            console.log(subject, numberOfMCQs)
            const response = await this.openai.chat.completions.create({
                temperature: 0.7,
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: prompt
                    },
                ],
            });

            let res = response.choices[0].message?.content || "";
            res = res.replace(/`/g, '');  // Remove backticks (`)
            res = res.replace(/.*?(\{.*\}).*/, "$1");
            res = res.replace(/^json/, "");
            const mcqs = JSON.parse(res);


            const createdQuiz = await this.quizModel.create({
                topic: subject,
                numberOfQuestions: numberOfMCQs,
                questions: mcqs.questions,
            });

            return {quizId: createdQuiz._id};




        } catch (error) {
            console.error('Error:', error);
        }
    }


    async getQuiz(quizId: string): Promise<any> {
        try {
            const quiz = await this.quizModel.findById(quizId);
            return quiz.questions;
        }
        catch{
            console.log("Error occured fetching quiz");
        }
    }
}