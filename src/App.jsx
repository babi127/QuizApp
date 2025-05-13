import React, { useState, useEffect } from 'react';

// Placeholder quiz data
const quizQuestions = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
        ],
    },
    {
        questionText: 'Who is the CEO of Tesla?',
        answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
        ],
    },
    {
        questionText: 'The iPhone was created by which company?',
        answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
        ],
    },
    {
        questionText: 'How many continents are there?',
        answerOptions: [
            { answerText: '5', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
            { answerText: '8', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the largest ocean on Earth?',
        answerOptions: [
            { answerText: 'Atlantic Ocean', isCorrect: false },
            { answerText: 'Indian Ocean', isCorrect: false },
            { answerText: 'Arctic Ocean', isCorrect: false },
            { answerText: 'Pacific Ocean', isCorrect: true },
        ],
    },
];

// Main Quiz Application component
function App() {
    // State to track the current question index
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // State to track the user's score
    const [score, setScore] = useState(0);
    // State to track if the quiz has finished
    const [showScore, setShowScore] = useState(false);
    // State to store which questions were answered correctly (by index)
    const [correctAnswersIndices, setCorrectAnswersIndices] = useState([]);
    // State to store the user's selected answer for each question (by question index)
    const [userAnswers, setUserAnswers] = useState({});


    // Function to handle user clicking an answer option
    const handleAnswerOptionClick = (answerText, isCorrect) => {
        // Record the user's answer for the current question
        setUserAnswers({ ...userAnswers, [currentQuestion]: answerText });

        // If the answer is correct, increment the score and record the question index
        if (isCorrect) {
            setScore(score + 1);
            setCorrectAnswersIndices([...correctAnswersIndices, currentQuestion]);
        }

        // Move to the next question
        const nextQuestion = currentQuestion + 1;

        // If there are more questions, update the current question index
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            // If all questions are answered, show the score screen
            setShowScore(true);
        }
    };

    // Function to restart the quiz
    const handleRestartQuiz = () => {
        setCurrentQuestion(0); // Reset to the first question
        setScore(0); // Reset the score
        setShowScore(false); // Hide the score screen
        setCorrectAnswersIndices([]); // Clear the correct answers record
        setUserAnswers({}); // Clear the user's answers
    };

    // Calculate score percentage
    const scorePercentage = (score / quizQuestions.length) * 100;
    const passed = scorePercentage >= 75; // Check if the user passed

    // Get missed questions (questions whose index is NOT in correctAnswersIndices)
    const missedQuestions = quizQuestions.filter((_, index) => !correctAnswersIndices.includes(index));


    // Render the Quiz UI
    return (
        // Main container with dark background, centered content, relative for absolute positioning of animation
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">

            {/* Quiz container with modern styling */}
            <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md text-center relative z-10"> {/* Added relative and z-10 */}
                {showScore ? (
                    // --- Score Section ---
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4 text-blue-400">Quiz Complete!</h2>
                        <div className="text-xl mb-6">
                            You scored {score} out of {quizQuestions.length} ({scorePercentage.toFixed(0)}%)
                        </div>

                        {/* Conditional Animation and Message */}
                        {passed ? (
                            // Celebration for passing
                            <div className="flex flex-col items-center mb-6">
                                <div className="text-6xl mb-4 animate-bounce">🎉</div> {/* Simple bounce animation */}
                                <p className="text-2xl font-bold text-green-400">Congratulations!</p>
                            </div>
                        ) : (
                            // Sad face and missed answers for not passing
                            <div className="flex flex-col items-center mb-6">
                                <div className="text-6xl mb-4 animate-pulse">😢</div> {/* Simple pulse animation */}
                                <p className="text-2xl font-bold text-red-400 mb-4">Try Again!</p>

                                {/* Section to display missed questions and correct answers */}
                                {missedQuestions.length > 0 && (
                                     <div className="mt-6 w-full text-left border-t border-gray-700 pt-6">
                                        <h3 className="text-xl font-semibold mb-4 text-blue-300">Questions Missed:</h3>
                                        <ul>
                                            {missedQuestions.map((question, index) => {
                                                // Find the correct answer text for this question
                                                const correctAnswer = question.answerOptions.find(option => option.isCorrect).answerText;
                                                // Get the user's answer for this question (using the original index)
                                                const originalIndex = quizQuestions.findIndex(q => q.questionText === question.questionText); // Find original index
                                                const userAnswer = userAnswers[originalIndex];

                                                return (
                                                    <li key={index} className="mb-3">
                                                        <p className="font-medium text-gray-300 mb-1">{originalIndex + 1}. {question.questionText}</p> {/* Use original index for numbering */}
                                                        <p className="text-red-400 pl-4">Your Answer: {userAnswer || 'Not Answered'}</p> {/* Display user's answer */}
                                                        <p className="text-green-400 pl-4">Correct Answer: {correctAnswer}</p> {/* Display correct answer */}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}


                        <button
                            onClick={handleRestartQuiz}
                            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
                        >
                            Restart Quiz
                        </button>
                    </div>
                ) : (
                    // --- Question Section ---
                    <>
                        {/* Question Counter */}
                        <div className="text-xl mb-6">
                            Question {currentQuestion + 1}/{quizQuestions.length}
                        </div>
                        {/* Question Text */}
                        <div className="text-2xl font-semibold mb-6">
                            {quizQuestions[currentQuestion].questionText}
                        </div>
                        {/* Answer Options */}
                        <div className="flex flex-col gap-4">
                            {quizQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
                                <button
                                    key={index} // Using index as key here is acceptable as the order is static
                                    onClick={() => handleAnswerOptionClick(answerOption.answerText, answerOption.isCorrect)} // Pass answerText and isCorrect
                                    className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-lg font-medium transition duration-300 ease-in-out text-left"
                                >
                                    {answerOption.answerText}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Footer or additional info (optional) */}
            <div className="text-center mt-8 text-gray-500 text-sm">
              <p>Quiz App</p>
            </div>
        </div>
    );
}

export default App;
