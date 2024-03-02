import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schemas/quiz.schema';

@Module({
    imports: [
            MongooseModule.forFeature([
                {
                    name: 'Quiz',
                    schema: QuizSchema
                },
            ]),
    ],
    controllers: [QuizController],
    providers: [QuizService],
    exports: [QuizService]
})
export class QuizModule {}