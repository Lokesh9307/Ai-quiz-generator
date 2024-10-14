import React from 'react';
import { AiOutlineWechatWork } from "react-icons/ai";
interface Props {
    setQuizzes: React.Dispatch<React.SetStateAction<any[]>>; // Adjust the type as needed
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const NewChat: React.FC<Props> = ({ setQuizzes, setPrompt }) => {
    const handleNewQuiz = () => {
        setQuizzes([]);  // Clear the quizzes
        setPrompt('');    // Reset the prompt if needed
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={handleNewQuiz}
                className="bg-white text-blue-500 p-2 font-extrabold md:text-3xl text-xl rounded-lg "
            >
                <AiOutlineWechatWork/>
            </button>
        </div>
    );
};

export default NewChat;
