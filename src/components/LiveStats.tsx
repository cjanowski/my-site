'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Code,
  Brain,
  Zap,
  Target,
  CheckCircle,
  Shuffle,
  Binary,
  Lightbulb
} from 'lucide-react'

// Binary Decoder Puzzle
const BinaryDecoder = ({ onComplete }: { onComplete: () => void }) => {
  const [binary, setBinary] = useState('01001000 01100101 01101100 01101100 01101111')
  const [userInput, setUserInput] = useState('')
  const [solved, setSolved] = useState(false)

  const solution = 'Hello'
  const binaryToText = (bin: string) => {
    return bin.split(' ')
      .map(byte => String.fromCharCode(parseInt(byte, 2)))
      .join('')
  }

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === solution.toLowerCase()) {
      setSolved(true)
      onComplete()
    }
  }

  return (
    <div className="glass-tile-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Binary className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-800">Binary Decoder</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Decode this binary message:
      </p>
      <div className="font-mono text-lg mb-4 p-3 bg-gray-100 rounded">
        {binary}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter decoded text"
          disabled={solved}
        />
        <button
          onClick={checkAnswer}
          disabled={solved}
          className={`px-4 py-2 rounded transition-colors ${
            solved
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {solved ? <CheckCircle className="w-4 h-4" /> : 'Check'}
        </button>
      </div>
      {solved && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm mt-2"
        >
          🎉 Correct! You decoded it!
        </motion.p>
      )}
    </div>
  )
}

// Sorting Algorithm Challenge
const SortingChallenge = ({ onComplete }: { onComplete: () => void }) => {
  const [numbers, setNumbers] = useState([5, 2, 8, 1, 9, 3])
  const [userSolution, setUserSolution] = useState('')
  const [solved, setSolved] = useState(false)

  const solution = '1,2,3,5,8,9'

  const shuffleNumbers = () => {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    setNumbers(shuffled)
    setSolved(false)
  }

  const checkAnswer = () => {
    if (userSolution.trim() === solution) {
      setSolved(true)
      onComplete()
    }
  }

  return (
    <div className="glass-tile-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className="w-5 h-5 text-purple-500" />
        <h3 className="font-semibold text-gray-800">Sorting Challenge</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Sort these numbers in ascending order:
      </p>
      <div className="font-mono text-lg mb-4 p-3 bg-gray-100 rounded flex gap-2">
        {numbers.map((num, i) => (
          <span key={i} className="bg-white px-2 py-1 rounded border">
            {num}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={shuffleNumbers}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          Shuffle
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
          placeholder="Enter sorted numbers (comma separated)"
          disabled={solved}
        />
        <button
          onClick={checkAnswer}
          disabled={solved}
          className={`px-4 py-2 rounded transition-colors ${
            solved
              ? 'bg-green-500 text-white'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          {solved ? <CheckCircle className="w-4 h-4" /> : 'Check'}
        </button>
      </div>
      {solved && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm mt-2"
        >
          🎉 Perfect sorting!
        </motion.p>
      )}
    </div>
  )
}

// Logic Pattern Challenge
const PatternChallenge = ({ onComplete }: { onComplete: () => void }) => {
  const [pattern, setPattern] = useState([1, 1, 2, 3, 5])
  const [userSolution, setUserSolution] = useState('')
  const [solved, setSolved] = useState(false)

  const solution = '8'

  const generateNewPattern = () => {
    const patterns = [
      [2, 4, 8, 16],
      [1, 4, 9, 16],
      [3, 6, 12, 24],
      [5, 10, 20, 40]
    ]
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
    setPattern(randomPattern)
    setSolved(false)
  }

  const checkAnswer = () => {
    if (userSolution.trim() === solution) {
      setSolved(true)
      onComplete()
    }
  }

  return (
    <div className="glass-tile-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-800">Pattern Challenge</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        What comes next in this sequence?
      </p>
      <div className="font-mono text-lg mb-4 p-3 bg-gray-100 rounded flex gap-2">
        {pattern.map((num, i) => (
          <span key={i} className="bg-white px-3 py-1 rounded border">
            {num}
          </span>
        ))}
        <span className="bg-blue-100 px-3 py-1 rounded border border-blue-300">
          ?
        </span>
      </div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={generateNewPattern}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          New Pattern
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
          placeholder="Enter next number"
          disabled={solved}
        />
        <button
          onClick={checkAnswer}
          disabled={solved}
          className={`px-4 py-2 rounded transition-colors ${
            solved
              ? 'bg-green-500 text-white'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          {solved ? <CheckCircle className="w-4 h-4" /> : 'Check'}
        </button>
      </div>
      {solved && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm mt-2"
        >
          🎉 Great pattern recognition!
        </motion.p>
      )}
    </div>
  )
}

// Code Riddle Challenge
const CodeRiddle = ({ onComplete }: { onComplete: () => void }) => {
  const [riddle, setRiddle] = useState({
    question: "What programming language is always running but has no legs?",
    answer: "javascript"
  })
  const [userAnswer, setUserAnswer] = useState('')
  const [solved, setSolved] = useState(false)

  const riddles = [
    { question: "What programming language is always running but has no legs?", answer: "javascript" },
    { question: "What do you call a developer who doesn't comment code?", answer: "unemployed" },
    { question: "Why do programmers prefer dark mode?", answer: "because light attracts bugs" },
    { question: "What's a programmer's favorite place?", answer: "stackoverflow" }
  ]

  const newRiddle = () => {
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)]
    setRiddle(randomRiddle)
    setSolved(false)
  }

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase().replace(/[^a-z]/g, '') === riddle.answer) {
      setSolved(true)
      onComplete()
    }
  }

  return (
    <div className="glass-tile-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-green-500" />
        <h3 className="font-semibold text-gray-800">Code Riddle</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {riddle.question}
      </p>
      <div className="flex gap-2 mb-3">
        <button
          onClick={newRiddle}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          New Riddle
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          placeholder="Enter your answer"
          disabled={solved}
        />
        <button
          onClick={checkAnswer}
          disabled={solved}
          className={`px-4 py-2 rounded transition-colors ${
            solved
              ? 'bg-green-500 text-white'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {solved ? <CheckCircle className="w-4 h-4" /> : 'Check'}
        </button>
      </div>
      {solved && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm mt-2"
        >
          🎉 That's correct!
        </motion.p>
      )}
    </div>
  )
}

export default function CodeChallenges() {
  const [completed, setCompleted] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  const handlePuzzleComplete = (puzzleName: string) => {
    if (!completed.includes(puzzleName)) {
      setCompleted([...completed, puzzleName])
    }
  }

  useEffect(() => {
    if (completed.length === 4) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [completed])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Puzzles
            </h2>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Test your problem-solving skills with fun interactive puzzles!
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Completed: {completed.length}/4 challenges
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <BinaryDecoder onComplete={() => handlePuzzleComplete('binary')} />
          <SortingChallenge onComplete={() => handlePuzzleComplete('sorting')} />
          <PatternChallenge onComplete={() => handlePuzzleComplete('pattern')} />
          <CodeRiddle onComplete={() => handlePuzzleComplete('riddle')} />
        </div>

        {/* Celebration */}
        {showCelebration && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-600">
              You've completed all the puzzles! You're a true puzzle master! 🏆
            </p>
          </motion.div>
        )}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
          />

          <motion.div
            animate={{
              x: [20, -20, 20],
              y: [10, -10, 10],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-cyan-200/20 to-pink-200/20 rounded-full blur-xl"
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-yellow-200/10 to-orange-200/10 rounded-full blur-lg"
          />
        </div>
      </div>
    </section>
  )
}