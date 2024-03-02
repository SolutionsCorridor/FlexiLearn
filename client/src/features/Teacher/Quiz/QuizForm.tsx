import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {Button} from '@/components/ui/button'; // Make sure you import Button from the correct path
import { SERVER_URL } from '@/config/config';

// Types for question and options
type Question = {
    question: string;
    options: string[];
    correct_answer: string;
  };
  

// Types for MCQProps
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

// QuizPage component
// QuizPage component
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
      
            const data = response.data;
            if (data) {
              const parsedData = data.map((question: any) => ({
                ...question,
                correct_answer: question.correct_answer.toLowerCase(), // Convert correct answer to lowercase
              }));
      
              setQuestions(parsedData);
              setTimeLeft(parsedData.length * 90);
            }
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
  
      fetchQuizData();
    }, [quizId]);
  
    // Timer countdown
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
  
    const handleSubmit = () => {
  if (!isSubmitted && timeLeft > 0) {
    setIsSubmitted(true);

    // Log answers and correct answers for debugging
    console.log('Answers:', answers);
    console.log('Correct Answers:', questions.map((q) => q.correct_answer));

    // Calculate score
    const correctCount = questions.reduce((count, question, index) => {
      // Compare the stored answer with the correct answer
      const correctOption = question.correct_answer;
      return answers[index] === correctOption ? count + 1 : count;
    }, 0);

    const scorePercentage = (correctCount / questions.length) * 100;

    // Display score in an alert
    alert(`Your score: ${scorePercentage.toFixed(2)}%`);

    // Redirect if score is more than 80%
    if (scorePercentage > 80) {
      navigate('/teacher/meeting');
    }
  }
};

      
      
  
    return (
      <div>
        <div>
          <p>Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
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
  