// components/GenerateGoogleForm.tsx
import React, { useState } from 'react';

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

interface GenerateGoogleFormProps {
  quizzes: Quiz[];
}

const GenerateGoogleForm: React.FC<GenerateGoogleFormProps> = ({ quizzes }) => {
  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuizToGoogleForms = async () => {
    if (quizzes.length === 0) {
      setError("No quizzes available to send.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://developers.google.com/forms/api/reference/rest/v1/forms/create#response-body', {
        method: 'POST',
        body: JSON.stringify(quizzes),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate Google Form.');
      }

      const result = await response.json();
      setFormUrl(result.formUrl); // Google Forms URL
    } catch (error) {
      console.error('Error sending quiz to Google Forms:', error);
      setError('Failed to generate Google Form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={sendQuizToGoogleForms}
        disabled={loading}
      >
        {loading ? 'Generating Form...' : 'Generate Google Form'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {formUrl && (
        <div className="text-center mt-5">
          <p>
            FORM 
            <a href={formUrl} target="_blank" rel="noopener noreferrer">
                {formUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerateGoogleForm;
