"use client";
// components/QuizGenerator.tsx
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import QuizList from './QuizList';
import InputForm from './InputForm';
import ExportToPDF from './ExportToPdf';
import Loader from './Loader';
import NewChat from './NewChat';

interface Quiz {
    question: string;
    options: string[];
    answer: string;
}

const QuizGenerator: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');

    const handlePromptSubmit = (userPrompt: string) => {
        setPrompt(userPrompt);
        fetchQuizzes(userPrompt);
    };

    const fetchQuizzes = async (userPrompt: string) => {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        console.log(apiKey); // Ensure you see the correct API key
        if (!apiKey) {
            setError("API key not found in environment variables!");
            setLoading(false);
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContentStream(userPrompt);
            let jsonResponse = "";

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                jsonResponse += chunkText;
            }

            jsonResponse = jsonResponse.replace(/```json|```/g, "");

            const parsedQuizzes = JSON.parse(jsonResponse) as Quiz[];
            setQuizzes(parsedQuizzes);
        } catch (error) {
            console.error("Error in API call or processing:", error);
            setError("Error fetching quizzes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='relative h-auto w-full md:mb-[3rem] mb-[14rem]'>
            <div className='overflow-y-auto pb-16 flex items-center justify-center'> {/* Added padding to prevent content from being obscured */}
                {loading && <Loader />}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <>
                        <QuizList quizzes={quizzes} />
                    </>
                )}
            </div>
            <div className='fixed bottom-10 left-0 right-0 z-10'> {/* Fixed positioning */}
                <InputForm onSubmit={handlePromptSubmit} />
            </div>
            <div className='fixed right-3 top-16 flex items-center justify-center gap-3'>
                <NewChat setQuizzes={setQuizzes} setPrompt={setPrompt}/>
                <ExportToPDF quizzes={quizzes} />
            </div>
        </div>
    );
};

export default QuizGenerator;
