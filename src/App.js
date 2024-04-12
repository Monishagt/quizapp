import React, { useState, useEffect } from 'react';

const Question = ({ question, options, onAnswerClick }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    // Automatically submit answer when an option is selected
    onAnswerClick(updatedOptions);
  };

  return (
    <div>
      <p>{question}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuizApp = () => {
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: 'What is the output of the expression 2 + 3 * 5?',
      options: ['25', '17', 'None of the above'],
      correctAnswer: '17',
    },
    {
      question: 'Which data structure operates in a last-in, first-out (LIFO) manner?',
      options: ['Queue', 'Stack', 'Heap'],
      correctAnswer: 'Stack',
    },
    {
      question: 'What is the result of "10" + 20?',
      options: ['1020', '30', 'Error'],
      correctAnswer: '1020',
    },
    {
      question: 'What is the primary purpose of a constructor function in JavaScript?',
      options: ['To create new objects', 'To delete objects', 'To modify existing objects'],
      correctAnswer: 'To create new objects',
    },
    {
      question: 'What does CSS stand for?',
      options: ['Cascading Style Sheets', 'Central Style Sheets', 'Computer Style Sheets'],
      correctAnswer: 'Cascading Style Sheets',
    },
    {
      question: 'Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const'],
      correctAnswer: 'var',
    },
    {
      question: 'What does JSON stand for?',
      options: ['JavaScript Object Notation', 'JavaScript Object Network', 'JavaScript Object Name'],
      correctAnswer: 'JavaScript Object Notation',
    },
    {
      question: 'Which of the following is not a valid JavaScript data type?',
      options: ['Number', 'Array', 'Dictionary'],
      correctAnswer: 'Dictionary',
    },
    {
      question: 'What is the output of the following code: console.log(3 === "3");?',
      options: ['true', 'false', 'undefined'],
      correctAnswer: 'false',
    },
    {
      question: 'Which method is used to add new elements to the end of an array in JavaScript?',
      options: ['push()', 'add()', 'append()'],
      correctAnswer: 'push()',
    },
    // Add more sample questions here
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state variable

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        goToNextQuestion();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (selectedOptions) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOptions.includes(correctAnswer);
    if (isCorrect) {
      setScore(score + 1);
    }
    goToNextQuestion();
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    setTimer(60); // Reset the timer for the next question
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true); // Update state to indicate quiz has been submitted
  };

  return (
    <div>
      {!quizStarted ? (
        <div>
          <h2>Enter Your Information</h2>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : questions && questions.length > 0 ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onAnswerClick={handleAnswerClick}
          />
          <p>Time remaining: {timer} seconds</p>
          <div>
            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleSubmitQuiz}>Submit</button>
          )}
        </div>
      ) : (
        <div>No questions available</div>
      )}
      {/* Display result if quiz has been submitted */}
      {submitted && (
        <div>
          <h2>Quiz Completed</h2>
          <p>Name: {username}</p>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
