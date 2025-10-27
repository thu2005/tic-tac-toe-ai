# 🎮 Tic-Tac-Toe AI

An intelligent tic-tac-toe game with AI opponent (using **minimax algorithm** with **alpha-beta pruning**), beautiful UI, and detailed performance tracking.

## ✨ Features

- **2 Difficulty Levels**: Easy (random) and Hard (minimax with alpha-beta pruning)
- **Score Tracking**: Wins/Losses/Draws with streak tracking
- **Performance Metrics**: Positions evaluated and AI thinking time
- **Clean UI**: Pastel blue theme with responsive design
- **Local Storage**: Automatically saves your scores

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to play.

## 🎯 How to Play

1. **Make Your Move**: Click on any empty square to place your X
2. **AI Response**: The AI will automatically place its O
3. **Win Conditions**: Get 3 in a row (horizontally, vertically, or diagonally) to win
4. **Game Tracking**: Your wins, losses, and draws are automatically tracked
5. **Switch Difficulty**: Change between Easy and Hard mode anytime
6. **Reset Options**: Reset the current game or clear all scores

## 🧠 AI Difficulty Levels

### Easy Mode
- **Algorithm**: Random move selection
- **Strategy**: Chooses available squares randomly
- **Performance**: 0 positions evaluated, instant moves
- **Difficulty**: Beatable - good for casual play

### Hard Mode
- **Algorithm**: Minimax with alpha-beta pruning optimization
- **Strategy**: Evaluates game outcomes while pruning irrelevant branches for efficiency
- **Performance**: Displays positions evaluated (typically 50-200 nodes, 50%+ reduction vs basic minimax)
- **Difficulty**: Unbeatable - the AI will never lose, only win or draw

## 📁 Project Structure

```
src/
├── App.jsx                 # Main game logic and state management
├── components/
│   ├── Board.jsx           # Game board component
│   ├── Square.jsx          # Individual square component
│   └── GameInfo.jsx        # Status display, scores, and controls
├── utils/
│   ├── gameLogic.js        # Game rules and winner calculation
│   ├── ai.js               # AI algorithms (minimax + alpha-beta pruning + random)
│   └── storage.js          # localStorage utilities
└── App.css                 # Styling and animations
```

## 🎨 Tech Stack

- **React**: Hooks-based functional components
- **CSS3**: Gradients, animations, and responsive design
- **localStorage API**: Persistent score tracking
- **Performance API**: AI thinking time measurement

## 🏆 Performance Metrics

The game displays real-time performance metrics:
- **Positions Evaluated**: Number of game states analyzed by the AI
- **Thinking Time**: Time taken by AI to make a decision (in milliseconds)
- **Step Counter**: Total moves made in the current game

