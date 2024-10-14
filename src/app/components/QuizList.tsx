import React, { useState } from 'react';

interface Quiz {
    question: string;
    options: string[];
    answer: string;
}

interface QuizListProps {
    quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});

    const handleOptionChange = (quizIndex: number, selectedOption: string) => {
        setSelectedAnswers(prev => ({ ...prev, [quizIndex]: selectedOption }));
        setShowAnswer(prev => ({ ...prev, [quizIndex]: true }));
    };

    const isCorrectAnswer = (quizIndex: number, option: string) => {
        return selectedAnswers[quizIndex] === option && option === quizzes[quizIndex].answer;
    };

    const isWrongAnswer = (quizIndex: number, option: string) => {
        return selectedAnswers[quizIndex] === option && option !== quizzes[quizIndex].answer;
    };

    return (
        <div className='w-full h-full sm:text-lg text-sm text-white px-5 flex-flex-col gap-6 mb-1rem'>
            {quizzes.length > 0 ? <h1 className='text-center'>Result</h1>:<></>}
            {quizzes.map((quiz, index) => (
                <div key={index} className='mt-5'>
                    <p><strong>Question {index + 1}: </strong> {quiz.question}</p>

                    {quiz.options.map((option, i) => (
                        <div key={i} className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name={`quiz-${index}`} // Ensure each quiz has its own radio group
                                id={`option-${index}-${i}`}
                                value={option}
                                className={`text-red-400 ${isCorrectAnswer(index, option) ? 'border-green-500' : ''} ${isWrongAnswer(index, option) ? 'border-red-500' : ''}`}
                                onChange={() => handleOptionChange(index, option)}
                                disabled={!!selectedAnswers[index]} // Disable once an option is selected
                            />
                            <label
                                htmlFor={`option-${index}-${i}`}
                                className={`cursor-pointer ${isCorrectAnswer(index, option) ? 'text-green-500' : ''} ${isWrongAnswer(index, option) ? 'text-red-500' : ''}`}
                            >
                                {option}
                            </label>
                        </div>
                    ))}

                    {/* Show the correct answer after user selects an option */}
                    {showAnswer[index] && (
                        <p><strong>Correct Answer:</strong> {quizzes[index].answer}</p>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default QuizList;
