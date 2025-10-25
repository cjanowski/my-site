'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { RotateCw, Play, Pause, RotateCcw } from 'lucide-react'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const CELL_SIZE = 30

type Tetromino = number[][]
type Position = { x: number; y: number }

const TETROMINOS: { [key: string]: { shape: Tetromino; color: string } } = {
  I: { shape: [[1, 1, 1, 1]], color: 'from-cyan-400 to-cyan-600' },
  O: { shape: [[1, 1], [1, 1]], color: 'from-yellow-400 to-yellow-600' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'from-purple-400 to-purple-600' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'from-green-400 to-green-600' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'from-red-400 to-red-600' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'from-blue-400 to-blue-600' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'from-orange-400 to-orange-600' },
}

const createEmptyBoard = (): (string | null)[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null))

export default function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState<{ shape: Tetromino; color: string } | null>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomPiece = () => {
    const pieces = Object.values(TETROMINOS)
    return pieces[Math.floor(Math.random() * pieces.length)]
  }

  const checkCollision = useCallback((piece: Tetromino, pos: Position, gameBoard: (string | null)[][]): boolean => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const newY = pos.y + y
          const newX = pos.x + x
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && gameBoard[newY][newX])
          ) {
            return true
          }
        }
      }
    }
    return false
  }, [])

  const rotatePiece = (piece: Tetromino): Tetromino => {
    const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse())
    return rotated
  }

  const mergePiece = useCallback(() => {
    if (!currentPiece) return

    const newBoard = board.map(row => [...row])
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = position.y + y
          const boardX = position.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color
          }
        }
      })
    })

    // Check for completed lines
    let linesCleared = 0
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== null)) {
        newBoard.splice(y, 1)
        newBoard.unshift(Array(BOARD_WIDTH).fill(null))
        linesCleared++
        y++ // Check the same row again
      }
    }

    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared)
      setScore(prev => prev + linesCleared * 100 * level)
      setLevel(Math.floor((lines + linesCleared) / 10) + 1)
    }

    setBoard(newBoard)

    // Spawn new piece
    const newPiece = getRandomPiece()
    const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }

    if (checkCollision(newPiece.shape, startPos, newBoard)) {
      setGameOver(true)
      setIsPlaying(false)
    } else {
      setCurrentPiece(newPiece)
      setPosition(startPos)
    }
  }, [currentPiece, position, board, level, lines, checkCollision])

  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused) return

    const newPos = { x: position.x, y: position.y + 1 }
    if (checkCollision(currentPiece.shape, newPos, board)) {
      mergePiece()
    } else {
      setPosition(newPos)
    }
  }, [currentPiece, position, board, isPaused, checkCollision, mergePiece])

  const moveHorizontal = (direction: number) => {
    if (!currentPiece || isPaused) return

    const newPos = { x: position.x + direction, y: position.y }
    if (!checkCollision(currentPiece.shape, newPos, board)) {
      setPosition(newPos)
    }
  }

  const rotate = () => {
    if (!currentPiece || isPaused) return

    const rotated = rotatePiece(currentPiece.shape)
    if (!checkCollision(rotated, position, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotated })
    }
  }

  const hardDrop = () => {
    if (!currentPiece || isPaused) return

    let newPos = { ...position }
    while (!checkCollision(currentPiece.shape, { x: newPos.x, y: newPos.y + 1 }, board)) {
      newPos.y++
    }
    setPosition(newPos)
    setTimeout(mergePiece, 50)
  }

  const startGame = () => {
    setBoard(createEmptyBoard())
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setIsPaused(false)
    setIsPlaying(true)
    const piece = getRandomPiece()
    setCurrentPiece(piece)
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 })
  }

  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      gameLoopRef.current = setInterval(moveDown, Math.max(100, 1000 - (level - 1) * 100))
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [isPlaying, isPaused, gameOver, moveDown, level])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused || gameOver) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          moveHorizontal(-1)
          break
        case 'ArrowRight':
          e.preventDefault()
          moveHorizontal(1)
          break
        case 'ArrowDown':
          e.preventDefault()
          moveDown()
          break
        case 'ArrowUp':
          e.preventDefault()
          rotate()
          break
        case ' ':
          e.preventDefault()
          hardDrop()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isPaused, gameOver, moveDown])

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row])

    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y
            const boardX = position.x + x
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color
            }
          }
        })
      })
    }

    return displayBoard
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Tetris
          </h2>
          <p className="text-xl text-gray-300">
            Classic block-stacking puzzle game
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 border-4 border-purple-500/50 shadow-2xl"
              style={{
                width: BOARD_WIDTH * CELL_SIZE + 32,
                height: BOARD_HEIGHT * CELL_SIZE + 32,
              }}
            >
              <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)` }}>
                {renderBoard().map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] rounded-sm transition-all duration-100 ${
                        cell
                          ? `bg-gradient-to-br ${cell} shadow-lg`
                          : 'bg-gray-800/30'
                      }`}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    />
                  ))
                )}
              </div>

              {gameOver && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg"
                >
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-red-400 mb-4">Game Over!</h3>
                    <p className="text-2xl text-white mb-6">Score: {score}</p>
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Play Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Controls & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Stats</h3>
              <div className="space-y-3 text-white">
                <div className="flex justify-between">
                  <span className="text-gray-300">Score:</span>
                  <span className="font-bold text-cyan-400">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Level:</span>
                  <span className="font-bold text-purple-400">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Lines:</span>
                  <span className="font-bold text-pink-400">{lines}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Controls</h3>
              <div className="space-y-4">
                {!isPlaying ? (
                  <button
                    onClick={startGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Game
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                )}
                <button
                  onClick={startGame}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Restart
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">How to Play</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>← → : Move left/right</p>
                <p>↑ : Rotate piece</p>
                <p>↓ : Move down faster</p>
                <p>Space : Hard drop</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
