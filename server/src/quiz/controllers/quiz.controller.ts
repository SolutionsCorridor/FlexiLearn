import { QuizService } from './../services/quiz.service';
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post('create')
    async createQuiz(@Body('subject') subject: string, @Body('amount') numberOfMCQs: number): Promise<any> {
      return await this.quizService.createQuiz(subject, numberOfMCQs);
    }
}
