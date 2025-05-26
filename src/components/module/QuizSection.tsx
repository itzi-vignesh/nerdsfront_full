
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircleDot, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

interface QuizSectionProps {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onQuizComplete: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  id,
  title,
  description,
  questions,
  onQuizComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation || quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      onQuizComplete();
    }
  };
  
  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };
  
  const isAnswerSelected = selectedAnswers[currentQuestion] !== -1;
  const isCorrect = selectedAnswers[currentQuestion] === questions[currentQuestion]?.correctAnswer;
  
  const getScorePercentage = () => {
    if (questions.length === 0) return 0;
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };
  
  return (
    <div id={id} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {quizCompleted && (
          <div className="flex items-center text-green-500 text-sm">
            <CheckCircle size={16} className="mr-1" />
            Completed
          </div>
        )}
      </div>
      
      {description && (
        <div className="prose prose-invert max-w-none mb-8">
          <p>{description}</p>
        </div>
      )}
      
      <div className="flex-grow">
        {!quizCompleted ? (
          <div className="bg-nerds-gray/30 rounded-lg p-6 h-full flex flex-col">
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            
            <h3 className="text-xl font-medium text-white mb-6">
              {questions[currentQuestion]?.question}
            </h3>
            
            <div className="space-y-3 mb-8 flex-grow">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center p-4 rounded-md cursor-pointer border transition-colors",
                    showExplanation && index === questions[currentQuestion]?.correctAnswer
                      ? "border-green-500 bg-green-500/10"
                      : showExplanation && index === selectedAnswers[currentQuestion] && !isCorrect
                        ? "border-red-500 bg-red-500/10"
                        : selectedAnswers[currentQuestion] === index
                          ? "border-nerds-yellow bg-nerds-yellow/10"
                          : "border-nerds-gray/30 hover:border-nerds-gray"
                  )}
                  onClick={() => handleSelectOption(index)}
                >
                  <div className="mr-3">
                    {showExplanation ? (
                      index === questions[currentQuestion]?.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : index === selectedAnswers[currentQuestion] && !isCorrect ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-nerds-gray/50" />
                      )
                    ) : selectedAnswers[currentQuestion] === index ? (
                      <CircleDot className="h-5 w-5 text-nerds-yellow" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-nerds-gray/50" />
                    )}
                  </div>
                  <span className="text-white">{option}</span>
                </div>
              ))}
            </div>
            
            {showExplanation && (
              <div className="mb-6 p-4 bg-nerds-darkblue/50 border border-nerds-gray/30 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-nerds-yellow mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Explanation</h4>
                    <p className="text-gray-300 text-sm">
                      {questions[currentQuestion]?.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-auto">
              {!showExplanation ? (
                <Button 
                  onClick={handleCheckAnswer}
                  disabled={!isAnswerSelected}
                  className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90 disabled:opacity-50"
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-nerds-gray/30 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quiz Completed!</h3>
            <p className="text-gray-400 mb-4">
              You scored {getScorePercentage()}% on this quiz.
            </p>
            <Button 
              onClick={() => {
                setCurrentQuestion(0);
                setShowExplanation(false);
                setQuizCompleted(false);
                setSelectedAnswers(Array(questions.length).fill(-1));
              }}
              variant="outline"
              className="border-nerds-gray/50 hover:bg-nerds-gray/30"
            >
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
