'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Code,
  Brain,
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
  const [currentSolution, setCurrentSolution] = useState('Hello')
  const [showError, setShowError] = useState(false)

  const binaryWords = [
    { binary: '01001000 01100101 01101100 01101100 01101111', text: 'Hello' },
    { binary: '01010111 01101111 01110010 01101100 01100100', text: 'World' },
    { binary: '01000011 01101111 01100100 01100101', text: 'Code' },
    { binary: '01000100 01100001 01110100 01100001', text: 'Data' },
    { binary: '01001010 01100001 01110110 01100001', text: 'Java' }
  ]


  const generateNewBinary = () => {
    const randomWord = binaryWords[Math.floor(Math.random() * binaryWords.length)]
    setBinary(randomWord.binary)
    setCurrentSolution(randomWord.text)
    setSolved(false)
    setUserInput('')
    setShowError(false)
  }

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === currentSolution.toLowerCase()) {
      setSolved(true)
      setShowError(false)
      onComplete()
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
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
      <div className="flex gap-2 mb-3">
        <button
          onClick={generateNewBinary}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          New Challenge
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
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
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          ❌ Try again! That's not quite right.
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
  const [showError, setShowError] = useState(false)

  const getSortedSolution = (nums: number[]) => {
    return [...nums].sort((a, b) => a - b).join(',')
  }

  const shuffleNumbers = () => {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    setNumbers(shuffled)
    setSolved(false)
    setUserSolution('')
    setShowError(false)
  }

  const checkAnswer = () => {
    const correctSolution = getSortedSolution(numbers)
    // Allow flexible input: remove spaces and compare
    const normalizedInput = userSolution.trim().replace(/\s+/g, '')
    if (normalizedInput === correctSolution) {
      setSolved(true)
      setShowError(false)
      onComplete()
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
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
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
          placeholder="Enter sorted numbers (e.g., 1,2,3,4)"
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
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          ❌ Not quite right! Try again.
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
  const [currentSolution, setCurrentSolution] = useState('8')
  const [showError, setShowError] = useState(false)

  const patternData = [
    { sequence: [1, 1, 2, 3, 5], answer: '8', type: 'Fibonacci' },
    { sequence: [2, 4, 8, 16], answer: '32', type: 'Powers of 2' },
    { sequence: [1, 4, 9, 16], answer: '25', type: 'Perfect squares' },
    { sequence: [3, 6, 12, 24], answer: '48', type: 'Double each time' },
    { sequence: [5, 10, 20, 40], answer: '80', type: 'Double each time' }
  ]

  const generateNewPattern = () => {
    const randomPatternData = patternData[Math.floor(Math.random() * patternData.length)]
    setPattern(randomPatternData.sequence)
    setCurrentSolution(randomPatternData.answer)
    setSolved(false)
    setUserSolution('')
    setShowError(false)
  }

  const checkAnswer = () => {
    if (userSolution.trim() === currentSolution) {
      setSolved(true)
      setShowError(false)
      onComplete()
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
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
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
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
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          ❌ Wrong answer! Keep thinking.
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
  const [showError, setShowError] = useState(false)

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
    setUserAnswer('')
    setShowError(false)
  }

  const checkAnswer = () => {
    // More flexible matching: normalize both answer and user input
    const normalizeText = (text: string) => text.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
    if (normalizeText(userAnswer) === normalizeText(riddle.answer)) {
      setSolved(true)
      setShowError(false)
      onComplete()
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
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
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
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
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          ❌ Wrong answer! Try again.
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
            Completed: {completed.length}/4 puzzles
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