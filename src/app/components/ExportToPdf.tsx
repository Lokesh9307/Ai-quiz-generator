'use client';
// components/ExportToPDF.tsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa6';

interface Quiz {
    question: string;
    options: string[];
    answer: string;
}

interface ExportToPDFProps {
    quizzes: Quiz[];
}

const ExportToPDF: React.FC<ExportToPDFProps> = ({ quizzes }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Quiz Questions', 10, 10);
        doc.setFontSize(12);
        let yPosition = 20;
        const lineHeight = 10;

        quizzes.forEach((quiz, index) => {
            // Check if the current position will exceed the page height
            if (yPosition + lineHeight * (quiz.options.length + 3) > doc.internal.pageSize.height) {
                doc.addPage(); // Add a new page
                yPosition = 10; // Reset yPosition for the new page
            }

            // Add the question
            doc.text(`Question ${index + 1}: ${quiz.question}`, 10, yPosition);
            yPosition += lineHeight;

            // Add options
            quiz.options.forEach((option, optionIndex) => {
                doc.text(`Option ${optionIndex + 1}: ${option}`, 20, yPosition);
                yPosition += lineHeight;
            });

            // Add the correct answer
            doc.text(`Correct Answer: ${quiz.answer}`, 10, yPosition);
            yPosition += lineHeight * 2; // Add extra space between quizzes
        });

        doc.save('quiz.pdf');
    };

    return (
        <div className='w-fit'>
            <button 
                onClick={exportToPDF} 
                disabled={quizzes.length === 0} 
                className={`bg-white p-2 rounded-xl hover:bg-gray-100 transition duration-300 relative`}
            >
                <FaFilePdf className='md:text-3xl text-xl text-red-600' />
            </button>
        </div>
    );
};

export default ExportToPDF;
