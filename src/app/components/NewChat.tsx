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
        <div className="flex justify-center items-center relative group"> {/* Add group class */}
            <button
                onClick={handleNewQuiz}
                className="bg-white text-blue-500 p-2 font-extrabold md:text-3xl text-xl rounded-lg"
            >
                <AiOutlineWechatWork />
            </button>
            <span className=" w-[5rem] absolute left-1/2 transform -translate-x-1/2 top-full mt-2 hidden bg-black text-white text-sm rounded p-1 group-hover:block"> {/* Change hidden to group-hover:block */}
                New chat
            </span>
        </div>
    );
};

export default NewChat;
