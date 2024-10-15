// components/TypeformQuizLinkGenerator.tsx
import { useState } from 'react';
import axios from 'axios';

interface TypeformQuizLinkGeneratorProps {
    quizzes: { question: string; options: string[]; answer: string; }[];
}

const TypeformQuizLinkGenerator: React.FC<TypeformQuizLinkGeneratorProps> = ({ quizzes }) => {
    const [quizLink, setQuizLink] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generatePublicQuizLink = async () => {
        try {
            const typeformApiKey = process.env.NEXT_PUBLIC_TYPEFORM_API_KEY; // Replace with your Typeform API key
            const typeformId = process.env.TYPEFORM_TOKEN; // Replace with your Typeform ID

            const questions = quizzes.map((quiz) => ({
                title: quiz.question,
                type: 'multiple_choice',
                properties: {
                    choices: quiz.options.map(option => ({
                        text: option,
                        id: option, // Use option text as ID for simplicity
                    })),
                    correct_choice: quiz.answer,
                },
            }));

            const response = await axios.post(
                `https://api.typeform.com/forms/${typeformId}/questions`,
                { fields: questions },
                {
                    headers: {
                        Authorization: `Bearer ${typeformApiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setQuizLink(response.data.link); // Assuming the response contains the quiz link
            } else {
                setError("Failed to generate quiz link.");
            }
        } catch (error) {
            console.error("Error generating quiz link:", error);
            setError("Error generating quiz link. Please try again.");
        }
    };

    return (
        <div>
            {quizLink && (
                <p>
                    Quiz Link: <a href={quizLink} target="_blank" rel="noopener noreferrer">{quizLink}</a>
                </p>
            )}
            <button 
                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded' 
                onClick={generatePublicQuizLink}
                disabled={quizzes.length === 0} // Disable if there are no quizzes
            >
                Generate Public Quiz Link
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TypeformQuizLinkGenerator;
