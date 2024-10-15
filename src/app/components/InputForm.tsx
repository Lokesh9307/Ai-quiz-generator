// components/InputForm.tsx
import { useState } from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
import '../globals.css';

interface InputFormProps {
    onSubmit: (prompt: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [topicName, setTopicName] = useState<string>('');
    const [numQuestion, setNumQuestion] = useState<string>('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (numQuestion.length > 2) {
            return
        }

        // Combine topicName and numQuestion into a single prompt string
        const prompt = `Analyze all websites and Generate a multiple-choice quiz which is most asked by institutes and companies in exam on the topic of ${topicName}. Create exact  ${numQuestion} number of questions not less than ${numQuestion} questions. Each question should have 4 answer options. The correct answer for each question should be clearly marked. Provide the result in JSON format with the following structure:

[
  {
    "question": "string",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "correct_option"
  },
  {
    "question": "string",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "correct_option"
  }
]

Ensure that the JSON structure is correct and doesn't contain any additional text outside the JSON block.
`;

        // Call the onSubmit function with the combined prompt
        onSubmit(prompt);

        // Clear the input after submission
        setTopicName('');
        setNumQuestion('');
    };

    return (
        <form onSubmit={handleSubmit} className='w-full h-auto flex md:flex-row flex-col items-center justify-center gap-2 '>
            <section
                className='flex md:flex-row flex-col gap-4 border-white/50 rounded-2xl p-5 bg-[#0a100d]   shadow-white border-2 md:w-auto w-[20rem] relative'
            >
                <div className='flex md:flex-row flex-col gap-4'>
                    <label htmlFor="topicName">Topic</label>
                    <input
                        className='md:w-[10rem] w-full rounded-md'
                        type="text"
                        id="topicName"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        required
                    />
                    <label htmlFor="numQuestion">Number of Questions:</label>
                    <input
                        className='md:w-10 w-full rounded-md'
                        type="number"
                        id="numQuestion"
                        value={numQuestion}
                        onChange={(e) => setNumQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className='flex items-center justify-center rounded-md bg-white/80 hover:bg-white  p-1 btn'>
                    <button type="submit" className='text-black w-fit text-2xl rounded-full hover:scale-110 duration-300 '><FaArrowAltCircleUp /></button>
                </div>
            </section>
        </form>
    );
};

export default InputForm;
