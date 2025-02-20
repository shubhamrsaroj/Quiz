import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  LinearProgress
} from '@mui/material'
import {
  Lightbulb,
  Timer,
  EmojiEvents,
  Help,
  Delete,
  RestartAlt
} from '@mui/icons-material'
import './App.css'
import { saveAttempt, getAttempts } from './utils/indexedDB'

const subjects = {
  html: {
    name: "HTML",
    icon: "🌐",
    color: "#FF5733",
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0,
        coins: 10,
        hint: "It's related to marking up text for the web"
      },
      {
        id: 2,
        question: "Which HTML element is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correctAnswer: 1,
        coins: 15,
        hint: "Think about 'unordered' abbreviation"
      },
      {
        id: 3,
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctAnswer: 2,
        coins: 10,
        hint: "It's a self-closing tag with two letters"
      },
      {
        id: 4,
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: ["title", "alt", "src", "description"],
        correctAnswer: 1,
        coins: 20,
        hint: "It's used for accessibility and when images fail to load"
      },
      {
        id: 5,
        question: "What is the correct HTML for creating a hyperlink?",
        options: [
          "<a url='http://example.com'>Link</a>",
          "<a href='http://example.com'>Link</a>",
          "<link href='http://example.com'>Link</link>",
          "<hyperlink>http://example.com</hyperlink>"
        ],
        correctAnswer: 1,
        coins: 15,
        hint: "The 'href' attribute is key here"
      },
      {
        id: 6,
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<header>"],
        correctAnswer: 2,
        coins: 20,
        hint: "It appears in the browser tab"
      },
      {
        id: 7,
        question: "What is the correct HTML for adding a background color?",
        options: [
          "<body bg='yellow'>",
          "<background>yellow</background>",
          "<body style='background-color: yellow'>",
          "<body color='yellow'>"
        ],
        correctAnswer: 2,
        coins: 25,
        hint: "It uses inline CSS styling"
      },
      {
        id: 8,
        question: "Choose the correct HTML element to define emphasized text",
        options: ["<italic>", "<i>", "<em>", "<stress>"],
        correctAnswer: 2,
        coins: 20,
        hint: "It's semantic and means 'emphasis'"
      },
      {
        id: 9,
        question: "What is the correct HTML for creating a checkbox?",
        options: [
          "<input type='check'>",
          "<checkbox>",
          "<input type='checkbox'>",
          "<check>"
        ],
        correctAnswer: 2,
        coins: 15,
        hint: "It's an input element with a specific type"
      },
      {
        id: 10,
        question: "Which HTML element is used to define the main content of a document?",
        options: ["<section>", "<content>", "<main>", "<article>"],
        correctAnswer: 2,
        coins: 30,
        hint: "It's a semantic element introduced in HTML5"
      }
    ]
  },
  css: {
    name: "CSS",
    icon: "🎨",
    color: "#2965f1",
    questions: [
      {
        id: 1,
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Computer Style Sheets",
          "Colorful Style Sheets"
        ],
        correctAnswer: 0,
        coins: 10,
        hint: "Think about how styles 'cascade' down"
      },
      {
        id: 2,
        question: "Which property is used to change the background color?",
        options: [
          "color",
          "bgcolor",
          "background-color",
          "background"
        ],
        correctAnswer: 2,
        coins: 15,
        hint: "It specifically targets the background's color"
      },
      {
        id: 3,
        question: "How do you select an element with id 'demo'?",
        options: [
          ".demo",
          "#demo",
          "*demo",
          "demo"
        ],
        correctAnswer: 1,
        coins: 20,
        hint: "Think about the symbol used for IDs in CSS"
      },
      {
        id: 4,
        question: "Which property is used to change the font of an element?",
        options: [
          "font-style",
          "text-style",
          "font-family",
          "text-family"
        ],
        correctAnswer: 2,
        coins: 15,
        hint: "It's related to the font's family name"
      },
      {
        id: 5,
        question: "How do you make a list not display bullet points?",
        options: [
          "list-style-type: none",
          "bulletpoints: none",
          "list: none",
          "list-style: no-bullet"
        ],
        correctAnswer: 0,
        coins: 25,
        hint: "It's about the style type of the list"
      },
      {
        id: 6,
        question: "Which property is used to create space between elements?",
        options: [
          "spacing",
          "margin",
          "padding",
          "border"
        ],
        correctAnswer: 1,
        coins: 20,
        hint: "It creates space outside the element"
      },
      {
        id: 7,
        question: "What property is used to create rounded corners?",
        options: [
          "border-radius",
          "corner-radius",
          "rounded-corners",
          "border-corner"
        ],
        correctAnswer: 0,
        coins: 15,
        hint: "It's about the radius of the border"
      },
      {
        id: 8,
        question: "How do you make text bold in CSS?",
        options: [
          "font-weight: bold",
          "text-weight: bold",
          "font: bold",
          "style: bold"
        ],
        correctAnswer: 0,
        coins: 20,
        hint: "It's about the weight of the font"
      },
      {
        id: 9,
        question: "Which value defines flexible sizes?",
        options: [
          "px",
          "rem",
          "fr",
          "%"
        ],
        correctAnswer: 2,
        coins: 30,
        hint: "Used in CSS Grid for fractional units"
      },
      {
        id: 10,
        question: "What property creates animation?",
        options: [
          "transition",
          "transform",
          "animation",
          "@keyframes"
        ],
        correctAnswer: 2,
        coins: 25,
        hint: "Used with @keyframes for complex animations"
      }
    ]
  },
  javascript: {
    name: "JavaScript",
    icon: "⚡",
    color: "#f0db4f",
    questions: [
      {
        id: 1,
        question: "What is JavaScript?",
        options: [
          "A markup language",
          "A programming language",
          "A styling language",
          "A database language"
        ],
        correctAnswer: 1,
        coins: 10,
        hint: "It adds interactivity to websites"
      },
      {
        id: 2,
        question: "Which operator is used for strict equality?",
        options: [
          "==",
          "===",
          "=",
          "!="
        ],
        correctAnswer: 1,
        coins: 20,
        hint: "It checks both value and type"
      },
      {
        id: 3,
        question: "What is the correct way to declare a variable?",
        options: [
          "variable x;",
          "var x;",
          "v x;",
          "x = var;"
        ],
        correctAnswer: 1,
        coins: 15,
        hint: "It's one of the older ways to declare variables"
      },
      {
        id: 4,
        question: "Which method adds an element to the end of an array?",
        options: [
          "push()",
          "append()",
          "add()",
          "insert()"
        ],
        correctAnswer: 0,
        coins: 20,
        hint: "Think about pushing something to the end"
      },
      {
        id: 5,
        question: "What is a callback function?",
        options: [
          "A function that calls itself",
          "A function passed as an argument",
          "A function that returns a value",
          "A function that calls another function"
        ],
        correctAnswer: 1,
        coins: 30,
        hint: "It's passed as a parameter to another function"
      },
      {
        id: 6,
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Online Network",
          "JavaScript Object Network",
          "JavaScript Online Notation"
        ],
        correctAnswer: 0,
        coins: 25,
        hint: "It's a way to format objects as text"
      },
      {
        id: 7,
        question: "Which method removes the first element of an array?",
        options: [
          "shift()",
          "unshift()",
          "pop()",
          "remove()"
        ],
        correctAnswer: 0,
        coins: 20,
        hint: "Think about shifting elements to the left"
      },
      {
        id: 8,
        question: "What is the purpose of 'use strict'?",
        options: [
          "To make code faster",
          "To enforce stricter parsing",
          "To use new features",
          "To prevent errors"
        ],
        correctAnswer: 1,
        coins: 30,
        hint: "It helps catch common coding mistakes"
      },
      {
        id: 9,
        question: "What is the 'this' keyword?",
        options: [
          "A variable",
          "A function",
          "A reference to the current object",
          "A data type"
        ],
        correctAnswer: 2,
        coins: 35,
        hint: "It refers to the object that owns the code"
      },
      {
        id: 10,
        question: "What is a Promise in JavaScript?",
        options: [
          "A guarantee of future value",
          "A function",
          "A data type",
          "An object method"
        ],
        correctAnswer: 0,
        coins: 40,
        hint: "It handles asynchronous operations"
      }
    ]
  }
}

const LIFELINES = {
  fiftyFifty: {
    name: "50:50",
    cost: 20,
    icon: <Delete />,
    description: "Removes two wrong answers"
  },
  hint: {
    name: "Hint",
    cost: 30,
    icon: <Lightbulb />,
    description: "Get a helpful hint"
  },
  extraTime: {
    name: "Extra Time",
    cost: 15,
    icon: <Timer />,
    description: "Add 15 seconds"
  }
}

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [attempts, setAttempts] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [availableLifelines, setAvailableLifelines] = useState({
    fiftyFifty: true,
    hint: true,
    extraTime: true
  })
  const [eliminatedOptions, setEliminatedOptions] = useState([])
  const [showHint, setShowHint] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })
  const [quizHistory, setQuizHistory] = useState([])

  useEffect(() => {
    if (timeLeft > 0 && selectedSubject && !showScore) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && selectedSubject) {
      handleTimeUp()
    }
  }, [timeLeft, selectedSubject, showScore])

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const attempts = await getAttempts()
        setQuizHistory(attempts)
      } catch (error) {
        console.error('Error loading quiz history:', error)
      }
    }
    loadHistory()
  }, [])

  const handleTimeUp = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < subjects[selectedSubject].questions.length) {
      setCurrentQuestion(nextQuestion)
      setTimeLeft(30)
    } else {
      finishQuiz()
    }
  }

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setTimeLeft(30)
  }

  const handleAnswer = (selectedAnswer) => {
    const currentQuiz = subjects[selectedSubject].questions[currentQuestion]
    const correct = selectedAnswer === currentQuiz.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
      setCoins(coins + currentQuiz.coins)
      // Trigger confetti for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [subjects[selectedSubject].color, '#ffffff']
      })
    }

    setTimeout(() => {
      setShowFeedback(false)
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < subjects[selectedSubject].questions.length) {
        setCurrentQuestion(nextQuestion)
        setTimeLeft(30)
      } else {
        finishQuiz()
      }
    }, 1000)
  }

  const finishQuiz = async () => {
    const attempt = {
      subject: subjects[selectedSubject].name,
      date: new Date().toLocaleString(),
      score,
      coins: coins,
      total: subjects[selectedSubject].questions.length
    }
    setAttempts([...attempts, attempt])
    setShowScore(true)

    try {
      // Save the attempt to IndexedDB
      await saveAttempt({
        subject: selectedSubject,
        score: score,
        coins: coins,
        timeSpent: 30 - timeLeft,
        correctAnswers: score,
        totalQuestions: subjects[selectedSubject].questions.length
      })

      // Reload the history
      const updatedHistory = await getAttempts()
      setQuizHistory(updatedHistory)

      // Update the current screen to show results
      setShowScore(true)
    } catch (error) {
      console.error('Error saving quiz attempt:', error)
    }
  }

  const restartQuiz = () => {
    setSelectedSubject(null)
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setTimeLeft(30)
  }

  const useLifeline = (lifeline) => {
    const currentQuiz = subjects[selectedSubject].questions[currentQuestion]
    
    if (coins < LIFELINES[lifeline].cost) {
      setSnackbar({
        open: true,
        message: 'Not enough coins!',
        severity: 'error'
      })
      return
    }

    setCoins(prev => prev - LIFELINES[lifeline].cost)
    setAvailableLifelines(prev => ({ ...prev, [lifeline]: false }))

    switch (lifeline) {
      case 'fiftyFifty':
        const wrongAnswers = currentQuiz.options
          .map((_, index) => index)
          .filter(index => index !== currentQuiz.correctAnswer)
        const toEliminate = wrongAnswers
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
        setEliminatedOptions(toEliminate)
        break
      
      case 'hint':
        setShowHint(true)
        break
      
      case 'extraTime':
        setTimeLeft(prev => prev + 15)
        break
    }
  }

  if (!selectedSubject) {
    return (
      <Box className="quiz-app">
        <motion.div 
          className="subject-selection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h3" gutterBottom>
            Choose Your Subject
          </Typography>
          
          <Card className="coins-display">
            <CardContent>
              <Typography variant="h5">
                <span className="coin">🪙</span> {coins}
              </Typography>
            </CardContent>
          </Card>

          <Box className="subjects-grid">
            {Object.entries(subjects).map(([key, subject]) => (
              <motion.div key={key}>
                <Card 
                  className="subject-card"
                  sx={{ 
                    bgcolor: subject.color,
                    color: 'white'
                  }}
                >
                  <CardContent>
                    <Typography variant="h2" className="subject-icon">
                      {subject.icon}
                    </Typography>
                    <Typography variant="h5">
                      {subject.name}
                    </Typography>
                    <Typography variant="body2">
                      Earn up to {subject.questions[0].coins} coins per question!
                    </Typography>
                    <Button 
                      variant="contained"
                      onClick={() => handleSubjectSelect(key)}
                      sx={{ mt: 2 }}
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    )
  }

  return (
    <Box className="quiz-app">
      <motion.div className="quiz-container">
        <Box className="quiz-header" sx={{ mb: 3 }}>
          <Typography variant="h5" className="subject-info">
            <span className="subject-icon">{subjects[selectedSubject].icon}</span>
            {subjects[selectedSubject].name}
          </Typography>
          
          <Box className="game-stats">
            <Card className="coins-display">
              <CardContent>
                <Typography>
                  <span className="coin">🪙</span> {coins}
                </Typography>
              </CardContent>
            </Card>

            <Box className="lifelines">
              {Object.entries(LIFELINES).map(([key, lifeline]) => (
                <Tooltip 
                  key={key}
                  title={`${lifeline.name} (Cost: ${lifeline.cost} coins)`}
                >
                  <span>
                    <IconButton
                      color="primary"
                      disabled={!availableLifelines[key]}
                      onClick={() => useLifeline(key)}
                    >
                      {lifeline.icon}
                    </IconButton>
                  </span>
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>

        {showScore ? (
          <motion.div 
            className="score-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>Quiz Complete! 🎉</h2>
            <div className="final-score">
              <div className="score-text">
                Score: {score}/{subjects[selectedSubject].questions.length}
              </div>
              <div className="coins-earned">
                <span className="coin">🪙</span> {coins} coins earned!
              </div>
            </div>
            
            <motion.button 
              className="restart-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
            >
              Choose Another Subject
            </motion.button>

            <div className="attempts-history">
              <h3>Previous Attempts</h3>
              <div className="attempts-grid">
                {quizHistory.map((attempt, index) => (
                  <motion.div 
                    key={index}
                    className="attempt-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="attempt-subject">{attempt.subject}</div>
                    <div className="attempt-score">
                      Score: {attempt.score}/{attempt.total}
                    </div>
                    <div className="attempt-coins">
                      <span className="coin">🪙</span> {attempt.coins}
                    </div>
                    <div className="attempt-date">{attempt.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="question-container">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentQuestion) / subjects[selectedSubject].questions.length) * 100}%` 
              }}
            />
            
            <div className="quiz-info">
              <span>Question {currentQuestion + 1}/{subjects[selectedSubject].questions.length}</span>
              <motion.span 
                className="timer"
                animate={{ 
                  color: timeLeft < 10 ? "#ff4444" : "#333333" 
                }}
              >
                ⏱️ {timeLeft}s
              </motion.span>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentQuestion}
                className="question-section"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
              >
                <h3>{subjects[selectedSubject].questions[currentQuestion].question}</h3>
                <div className="reward-info">
                  Reward: <span className="coin">🪙</span> 
                  {subjects[selectedSubject].questions[currentQuestion].coins} coins
                </div>
                <div className="options-container">
                  {subjects[selectedSubject].questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`option-button ${
                        showFeedback && index === subjects[selectedSubject].questions[currentQuestion].correctAnswer
                          ? 'correct'
                          : ''
                      }`}
                      onClick={() => handleAnswer(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={showFeedback}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <Dialog open={showHint} onClose={() => setShowHint(false)}>
          <DialogTitle>Hint</DialogTitle>
          <DialogContent>
            <Typography>
              {subjects[selectedSubject].questions[currentQuestion].hint}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowHint(false)}>Got it!</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  )
}

export default App
