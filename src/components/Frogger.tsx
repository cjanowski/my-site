'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, RotateCcw, Trophy } from 'lucide-react'

const GRID_SIZE = 40
const GRID_COLS = 13
const GRID_ROWS = 13

type Position = { x: number; y: number }
type Vehicle = { x: number; width: number; speed: number }

export default function Frogger() {
    const [frogPos, setFrogPos] = useState<Position>({ x: 6, y: 12 })
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [highScore, setHighScore] = useState(0)
    const [vehicles, setVehicles] = useState<Vehicle[][]>([])
    const [logs, setLogs] = useState<Vehicle[][]>([])
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    const initializeObstacles = () => {
        // Cars on rows 7-10
        const newVehicles = [
            [{ x: 0, width: 2, speed: 0.05 }, { x: 6, width: 2, speed: 0.05 }],
            [{ x: 2, width: 3, speed: -0.07 }, { x: 9, width: 2, speed: -0.07 }],
            [{ x: 1, width: 2, speed: 0.06 }, { x: 7, width: 2, speed: 0.06 }],
            [{ x: 3, width: 3, speed: -0.08 }, { x: 10, width: 2, speed: -0.08 }],
        ]

        // Logs on rows 1-5
        const newLogs = [
            [{ x: 0, width: 3, speed: 0.04 }, { x: 7, width: 3, speed: 0.04 }],
            [{ x: 2, width: 4, speed: -0.05 }, { x: 9, width: 3, speed: -0.05 }],
            [{ x: 1, width: 3, speed: 0.045 }, { x: 8, width: 4, speed: 0.045 }],
            [{ x: 3, width: 3, speed: -0.055 }, { x: 10, width: 3, speed: -0.055 }],
            [{ x: 0, width: 4, speed: 0.05 }, { x: 6, width: 3, speed: 0.05 }],
        ]

        setVehicles(newVehicles)
        setLogs(newLogs)
    }

    const startGame = () => {
        setFrogPos({ x: 6, y: 12 })
        setScore(0)
        setLives(3)
        setGameOver(false)
        setIsPlaying(true)
        initializeObstacles()
    }

    const resetFrog = () => {
        setFrogPos({ x: 6, y: 12 })
        setLives(prev => prev - 1)
        if (lives <= 1) {
            setGameOver(true)
            setIsPlaying(false)
            if (score > highScore) {
                setHighScore(score)
            }
        }
    }

    const moveFrog = useCallback((dx: number, dy: number) => {
        if (!isPlaying || gameOver) return

        const newX = Math.max(0, Math.min(GRID_COLS - 1, frogPos.x + dx))
        const newY = Math.max(0, Math.min(GRID_ROWS - 1, frogPos.y + dy))

        setFrogPos({ x: newX, y: newY })

        // Score for moving forward
        if (dy < 0 && newY < frogPos.y) {
            setScore(prev => prev + 10)
        }

        // Win condition - reached the top
        if (newY === 0) {
            setScore(prev => prev + 100)
            setFrogPos({ x: 6, y: 12 })
        }
    }, [frogPos, isPlaying, gameOver])

    const checkCollisions = useCallback(() => {
        const row = frogPos.y

        // Check water (rows 1-5)
        if (row >= 1 && row <= 5) {
            const logRow = logs[row - 1]
            if (!logRow) return

            let onLog = false
            logRow.forEach(log => {
                const logStart = Math.floor(log.x)
                const logEnd = logStart + log.width
                if (frogPos.x >= logStart && frogPos.x < logEnd) {
                    onLog = true
                    // Move frog with log
                    setFrogPos(prev => {
                        let newX = prev.x + log.speed
                        if (newX < 0 || newX >= GRID_COLS) {
                            resetFrog()
                            return prev
                        }
                        return { ...prev, x: newX }
                    })
                }
            })

            if (!onLog) {
                resetFrog()
            }
        }

        // Check cars (rows 7-10)
        if (row >= 7 && row <= 10) {
            const vehicleRow = vehicles[row - 7]
            if (!vehicleRow) return

            vehicleRow.forEach(vehicle => {
                const vStart = Math.floor(vehicle.x)
                const vEnd = vStart + vehicle.width
                if (frogPos.x >= vStart && frogPos.x < vEnd) {
                    resetFrog()
                }
            })
        }
    }, [frogPos, vehicles, logs, lives])

    const updateObstacles = useCallback(() => {
        setVehicles(prev => prev.map(row =>
            row.map(vehicle => {
                let newX = vehicle.x + vehicle.speed
                if (vehicle.speed > 0 && newX > GRID_COLS) newX = -vehicle.width
                if (vehicle.speed < 0 && newX < -vehicle.width) newX = GRID_COLS
                return { ...vehicle, x: newX }
            })
        ))

        setLogs(prev => prev.map(row =>
            row.map(log => {
                let newX = log.x + log.speed
                if (log.speed > 0 && newX > GRID_COLS) newX = -log.width
                if (log.speed < 0 && newX < -log.width) newX = GRID_COLS
                return { ...log, x: newX }
            })
        ))
    }, [])

    useEffect(() => {
        if (isPlaying && !gameOver) {
            gameLoopRef.current = setInterval(() => {
                updateObstacles()
                checkCollisions()
            }, 50)
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current)
        }
    }, [isPlaying, gameOver, updateObstacles, checkCollisions])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isPlaying || gameOver) return

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault()
                    moveFrog(-1, 0)
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    moveFrog(1, 0)
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    moveFrog(0, -1)
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    moveFrog(0, 1)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [isPlaying, gameOver, moveFrog])

    const getRowColor = (row: number) => {
        if (row === 0) return 'from-green-600 to-green-700' // Goal
        if (row >= 1 && row <= 5) return 'from-blue-500 to-blue-600' // Water
        if (row === 6 || row === 11) return 'from-yellow-600 to-yellow-700' // Safe zones
        if (row >= 7 && row <= 10) return 'from-gray-700 to-gray-800' // Road
        return 'from-green-700 to-green-800' // Start
    }

    return (
        <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
            <div className="container-max section-padding relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                        Frogger
                    </h2>
                    <p className="text-xl text-gray-300">
                        Help the frog cross the road and river!
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
                            className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 border-4 border-emerald-500/50 shadow-2xl"
                            style={{
                                width: GRID_COLS * GRID_SIZE + 32,
                                height: GRID_ROWS * GRID_SIZE + 32,
                            }}
                        >
                            <div className="relative">
                                {/* Grid */}
                                {[...Array(GRID_ROWS)].map((_, row) => (
                                    <div key={row} className="flex">
                                        {[...Array(GRID_COLS)].map((_, col) => (
                                            <div
                                                key={`${row}-${col}`}
                                                className={`bg-gradient-to-br ${getRowColor(row)} border border-black/20`}
                                                style={{ width: GRID_SIZE, height: GRID_SIZE }}
                                            />
                                        ))}
                                    </div>
                                ))}

                                {/* Vehicles */}
                                {vehicles.map((row, rowIndex) =>
                                    row.map((vehicle, vIndex) => (
                                        <motion.div
                                            key={`vehicle-${rowIndex}-${vIndex}`}
                                            className="absolute bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg border-2 border-red-700"
                                            style={{
                                                left: Math.floor(vehicle.x) * GRID_SIZE + 16,
                                                top: (rowIndex + 7) * GRID_SIZE + 16,
                                                width: vehicle.width * GRID_SIZE,
                                                height: GRID_SIZE,
                                            }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                                                🚗
                                            </div>
                                        </motion.div>
                                    ))
                                )}

                                {/* Logs */}
                                {logs.map((row, rowIndex) =>
                                    row.map((log, lIndex) => (
                                        <motion.div
                                            key={`log-${rowIndex}-${lIndex}`}
                                            className="absolute bg-gradient-to-r from-amber-700 to-amber-900 rounded-lg shadow-lg border-2 border-amber-950"
                                            style={{
                                                left: Math.floor(log.x) * GRID_SIZE + 16,
                                                top: (rowIndex + 1) * GRID_SIZE + 16,
                                                width: log.width * GRID_SIZE,
                                                height: GRID_SIZE,
                                            }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                                                🪵
                                            </div>
                                        </motion.div>
                                    ))
                                )}

                                {/* Frog */}
                                <motion.div
                                    className="absolute bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl border-2 border-green-700 flex items-center justify-center text-2xl"
                                    style={{
                                        left: Math.floor(frogPos.x) * GRID_SIZE + 16,
                                        top: frogPos.y * GRID_SIZE + 16,
                                        width: GRID_SIZE,
                                        height: GRID_SIZE,
                                    }}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                    }}
                                >
                                    🐸
                                </motion.div>
                            </div>

                            {gameOver && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg"
                                >
                                    <div className="text-center">
                                        <h3 className="text-4xl font-bold text-red-400 mb-4">Game Over!</h3>
                                        <p className="text-2xl text-white mb-2">Score: {score}</p>
                                        <p className="text-xl text-gray-300 mb-6">High Score: {highScore}</p>
                                        <button
                                            onClick={startGame}
                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
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
                                    <span className="font-bold text-green-400">{score}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Lives:</span>
                                    <span className="font-bold text-red-400">{'❤️'.repeat(lives)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">High Score:</span>
                                    <span className="font-bold text-yellow-400 flex items-center gap-1">
                                        <Trophy className="w-4 h-4" />
                                        {highScore}
                                    </span>
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
                                        onClick={startGame}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Restart
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-3">How to Play</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>🎯 Reach the green goal at the top</p>
                                <p>🪵 Jump on logs to cross water</p>
                                <p>🚗 Avoid cars on the road</p>
                                <p>⬆️⬇️⬅️➡️ Arrow keys to move</p>
                                <p>💚 +10 points per forward move</p>
                                <p>🏆 +100 points for reaching goal</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-green-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
