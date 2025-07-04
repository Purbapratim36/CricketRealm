import React, { useState, useEffect, useRef } from 'react';
import './TriviaBattle.css';

const CRICKET_QUESTIONS = {
  easy: [
    {
      question: "Which country won the 2019 Cricket World Cup?",
      options: ["India", "Australia", "England", "New Zealand"],
      answer: "England"
    },
    {
      question: "What is the highest individual score in ODI cricket?",
      options: ["200", "264", "300", "400"],
      answer: "264"
    },
    {
      question: "Which player has scored the most international centuries?",
      options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Kumar Sangakkara"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "How many players are in a cricket team?",
      options: ["10", "11", "12", "9"],
      answer: "11"
    },
    {
      question: "What is the length of a cricket pitch?",
      options: ["20 yards", "22 yards", "24 yards", "18 yards"],
      answer: "22 yards"
    }
  ],
  medium: [
    {
      question: "Who has scored the fastest century in ODI cricket?",
      options: ["AB de Villiers", "Chris Gayle", "Shahid Afridi", "Corey Anderson"],
      answer: "AB de Villiers"
    },
    {
      question: "Which bowler has the best figures in an ODI innings?",
      options: ["Glenn McGrath", "Chaminda Vaas", "Muttiah Muralitharan", "Shane Warne"],
      answer: "Chaminda Vaas"
    },
    {
      question: "Who was the first bowler to take 500 Test wickets?",
      options: ["Shane Warne", "Muttiah Muralitharan", "Courtney Walsh", "Anil Kumble"],
      answer: "Courtney Walsh"
    },
    {
      question: "Which team won the 2021 T20 World Cup?",
      options: ["India", "England", "Australia", "New Zealand"],
      answer: "Australia"
    },
    {
      question: "Who holds the record for most runs in a single ODI World Cup?",
      options: ["Sachin Tendulkar", "Rohit Sharma", "Matthew Hayden", "Martin Guptill"],
      answer: "Rohit Sharma"
    }
  ],
  hard: [
    {
      question: "Who was the first batsman to score a double century in ODI cricket?",
      options: ["Sachin Tendulkar", "Virender Sehwag", "Rohit Sharma", "Chris Gayle"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Which team won the first ever T20 World Cup in 2007?",
      options: ["India", "Pakistan", "Australia", "South Africa"],
      answer: "India"
    },
    {
      question: "Who is the only player to score 10,000 runs and take 300 wickets in ODIs?",
      options: ["Jacques Kallis", "Sanath Jayasuriya", "Shahid Afridi", "Chris Gayle"],
      answer: "Sanath Jayasuriya"
    },
    {
      question: "Which bowler has the best economy rate in T20 internationals (min 1000 balls)?",
      options: ["Rashid Khan", "Sunil Narine", "Jasprit Bumrah", "Trent Boult"],
      answer: "Rashid Khan"
    },
    {
      question: "Who was the first wicketkeeper to effect 100 stumpings in ODIs?",
      options: ["Kumar Sangakkara", "Adam Gilchrist", "MS Dhoni", "Mark Boucher"],
      answer: "MS Dhoni"
    }
  ]
};

export default function TriviaBattle() {
  const [screen, setScreen] = useState('difficulty');
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeOut, setTimeOut] = useState(false);
  const timerRef = useRef(null);
  const TOTAL_ROUNDS = 5;

  useEffect(() => {
    if (screen === 'game' && difficulty) {
      if (CRICKET_QUESTIONS[difficulty]) {
        const selectedQuestions = [...CRICKET_QUESTIONS[difficulty]];
        const shuffled = [...selectedQuestions].sort(() => Math.random() - 0.5);
        const gameQuestions = shuffled.slice(0, TOTAL_ROUNDS);
        setQuestions(gameQuestions);
        setCurrentQuestionIndex(0);
        setTimeLeft(15);
      }
    }
  }, [screen, difficulty]);

  useEffect(() => {
    if (screen === 'game' && timeLeft > 0 && questions.length > 0 && !showAnswer) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showAnswer && screen === 'game' && questions.length > 0) {
      handleTimeOut();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, screen, showAnswer, questions]);

  const handleTimeOut = () => {
    setTimeOut(true);
    setShowAnswer(true);
  };

  const handleOptionClick = (option) => {
    if (showAnswer || questions.length === 0) return;

    clearTimeout(timerRef.current);
    setSelectedOption(option);
    setShowAnswer(true);

    if (option === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setTimeOut(false);
    if (currentQuestionIndex < TOTAL_ROUNDS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setTimeLeft(15);
    } else {
      setScreen('gameOver');
    }
  };

  const startGame = () => {
    if (!difficulty) return;
    setScreen('game');
    setScore(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setTimeLeft(15);
    setTimeOut(false);
  };

  const restartGame = () => {
    setScreen('difficulty');
    setDifficulty(null);
    setScore(0);
  };

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <div className="trivia-page">
      <h1 className="trivia-heading">Trivia Quiz</h1>
      {
        screen === 'difficulty' ? (
          <div className="difficulty-screen">
            <h2>Select Difficulty Level</h2>
            <div className="difficulty-options">
              <button className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`} onClick={() => setDifficulty('easy')}>Easy</button>
              <button className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`} onClick={() => setDifficulty('medium')}>Medium</button>
              <button className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`} onClick={() => setDifficulty('hard')}>Hard</button>
            </div>
            {difficulty && <button className="start-btn" onClick={startGame}>Start Game</button>}
          </div>
        ) : screen === 'gameOver' ? (
          <div className="game-over-content">
            <h2>Game Over!</h2>
            <p className="final-score">Your Score: <span>{score}</span> / {TOTAL_ROUNDS}</p>
            <button className="restart-btn" onClick={restartGame}>Play Again</button>
          </div>
        ) : (
          <div className="game-screen">
            {questions.length === 0 ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading questions...</p>
              </div>
            ) : !currentQuestion ? (
              <p>Error loading question</p>
            ) : (
              <>
                <div className="game-header">
                  <div className="score">Score: {score}</div>
                  <div className="round">Question: {currentQuestionIndex + 1}/{TOTAL_ROUNDS}</div>
                  <div className={`timer ${timeLeft <= 5 ? 'warning' : ''}`}>
                    Time: {timeLeft}s
                  </div>
                </div>
                <h2 className="question">{currentQuestion.question}</h2>
                <div className="options-container">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      className={`option-btn ${
                        showAnswer
                          ? option === currentQuestion.answer
                            ? 'correct'
                            : selectedOption === option
                            ? 'wrong'
                            : ''
                          : ''
                      }`}
                      onClick={() => handleOptionClick(option)}
                      disabled={showAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showAnswer && (
                  <div className="feedback">
                    {timeOut ? (
                      <p className="time-out">⏰ Time's up!</p>
                    ) : selectedOption === currentQuestion.answer ? (
                      <p className="correct">✅ Correct!</p>
                    ) : (
                      <p className="wrong">❌ Wrong answer</p>
                    )}
                    <p className="correct-answer">
                      Correct answer: <strong>{currentQuestion.answer}</strong>
                    </p>
                    <button className="next-btn" onClick={handleNext}>
                      {currentQuestionIndex < TOTAL_ROUNDS - 1 ? 'Next Question' : 'Finish Game'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )
      }
    </div>
  );
}
