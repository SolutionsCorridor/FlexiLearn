import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { SERVER_URL } from '@/config/config';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

type Question = {
  question: string;
  options: string[];
  correct_answer: string;
};


type MCQProps = {
  question: string;
  options: string[];
  selectedAnswer: string;
  onAnswer: (option: string) => void;
  isTimeUp: boolean;
};

const MCQ: React.FC<MCQProps> = ({ question, options, selectedAnswer, onAnswer, isTimeUp }) => (
  <div className="bg-white shadow-lg rounded-lg p-5 mb-5">
    <h3 className="text-xl font-semibold mb-4">{question}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option)}
          className={`text-left p-4 text-md rounded-lg transition-colors ${isTimeUp || selectedAnswer === option
            ? 'bg-green-800 text-white cursor-not-allowed'
            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
            }`}
          disabled={isTimeUp || selectedAnswer === option}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);


const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!quizId) return;

      try {
        const response = await axios.get(`${SERVER_URL}/quiz/get/${quizId}`);
        console.log(response.data)
        const data = response.data;
        if (data) {
          console.log(data)

          const parsedData = data.map((question: any) => ({
            ...question,
            correct_answer: (question.correct_option && question.correct_option.toLowerCase()) ||
              (question.correct_answer && question.correct_answer.toLowerCase()) ||
              ''
          }));

          setQuestions(parsedData);
          console.log(parsedData)
          setTimeLeft(parsedData.length * 90);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quizId]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !isSubmitted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted]);

  const handleAnswer = (questionIndex: number, option: string) => {
    if (!isSubmitted && timeLeft > 0) {
      setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    }
  };

  const saveQuizResult = async (score: number) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post(`${SERVER_URL}/teacher/quiz/result`, { quizId, score, userId });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const handleSubmit = () => {
    if (!isSubmitted && timeLeft > 0) {
      setIsSubmitted(true);

      // Calculate score
      const correctCount = questions.reduce((count, question, index) => {
        const userAnswerFullText = answers[index]; // Full answer text selected by the user
        let userAnswerLetter = ''; // To store the letter corresponding to the user's answer

        // Iterate over the question's options to find the letter corresponding to the user's full text answer
        Object.entries(question.options).forEach(([key, value]) => {
          if (value === userAnswerFullText) {
            userAnswerLetter = key;
          }
        });

        // Check if the user's answer (by letter) matches the correct answer
        console.log(question.correct_answer, userAnswerLetter)
        const isCorrect = userAnswerLetter === question.correct_answer;
        return isCorrect ? count + 1 : count;
      }, 0);

      const scorePercentage = (correctCount / questions.length) * 100;

      // Display score in an alert
      if (scorePercentage < 80) {
        toast.error(`Your score: ${scorePercentage.toFixed(2)}%`);
        setTimeout(() => {
          toast("You need to score more than 80% to move to the next stage")
        }, 2000);
      }

      // Redirect if score is more than 80%
      if (scorePercentage > 80) {
        toast.success(`Your score: ${scorePercentage.toFixed(2)}%`);
        saveQuizResult(scorePercentage);
        setTimeout(() => {
          navigate('/teacher/meeting');
        }, 2000);
      }
    }
  };





  return (
    <div>
      <div>
        <Toaster />
        <p className="text-xl font-bold mb-5">
          Time left:
          <span className='text-2xl text-gray-500'>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </p>
        {Array.isArray(questions) &&
          questions.map((question, index) => (
            <MCQ
              key={index}
              question={question.question}
              options={Object.values(question.options)}
              selectedAnswer={answers[index]}
              onAnswer={(option) => handleAnswer(index, option)}
              isTimeUp={timeLeft === 0}
            />
          ))}
        <Button onClick={handleSubmit}>Submit Quiz</Button>
      </div>
    </div>
  );
};

export default QuizPage;
