Interactive Quiz Platform

Overview

A modern, interactive quiz application built with React and Material-UI that tests users' knowledge in web development topics (HTML, CSS, and JavaScript). Features include lifelines, coin rewards, and progress tracking.

Features

Core Functionality

🎯 Multiple Subject Areas

HTML

CSS

JavaScript

Quiz Features

⏱️ Timed Questions (30-second timer)

💰 Coin Reward System

🎯 Multiple Choice Questions

📊 Progress Tracking

Lifelines System

50:50 (Eliminates two wrong answers) - Cost: 20 coins

Hint (Shows helpful hint) - Cost: 30 coins

Extra Time (+15 seconds) - Cost: 15 coins

User Experience

🎨 Professional UI with Material-UI

✨ Smooth Animations with Framer Motion

🎉 Confetti Celebration for Correct Answers

📱 Fully Responsive Design

Data Persistence

💾 IndexedDB for storing quiz attempts

📊 Quiz History Tracking

Technical Stack

React

Material-UI

Framer Motion

Canvas Confetti

IndexedDB

Lucide Icons

Project Structure

Key Components

Quiz Data (quiz-data.js)

Defines subject areas (HTML, CSS, JavaScript)

Contains questions, options, and correct answers

Defines lifeline costs and functionality

Database Management (indexedDB.js)

Handles quiz attempt storage

Manages quiz history

Provides data persistence

Main Application (App.jsx)

Manages quiz state

Handles user interactions

Implements lifeline logic

Controls quiz flow

Features in Detail

1. Quiz Flow

Subject selection

Timed questions

Immediate feedback

Score tracking

History recording

2. Lifeline System

50:50: Eliminates two incorrect options

Hint: Provides a helpful clue

Extra Time: Adds 15 seconds to timer

3. Scoring System

Points for correct answers

Coin rewards

Performance tracking

4. User Interface

Clean, modern design

Responsive layout

Animated transitions

Progress indicators

Installation

Clone the repository:

git clone https://github.com/yourusername/quiz-platform.git

Install dependencies:

cd quiz-platform
npm install

Start the development server:

npm run dev

Usage

Starting a Quiz

Select a subject

Read questions carefully

Answer within time limit

Use lifelines strategically

Using Lifelines

50:50: Eliminates two wrong answers

Hint: Shows helpful hint

Extra Time: Adds 15 seconds

Scoring

Earn coins for correct answers

Use coins for lifelines

Track progress in history

Contributing

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License

This project is licensed under the MIT License.

Future Enhancements

Additional subject areas

More question types

Social sharing features

Leaderboard system

Achievement badges

