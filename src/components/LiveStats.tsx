'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Activity, 
  Brain, 
  Trophy, 
  Cloud, 
  Zap, 
  BarChart3, 
  Globe, 
  Wifi,
  Eye,
  Users,
  Cpu,
  Thermometer
} from 'lucide-react'

// Types
interface WeatherData {
  temp: number
  condition: string
  location: string
  humidity: number
}

interface SportsScore {
  team1: string
  team2: string
  score1: number
  score2: number
  sport: string
  status: string
}

interface TokenData {
  used: number
  total: number
  percentage: number
}

// Mock data generators
const generateMockTokens = (): TokenData => ({
  used: Math.floor(Math.random() * 15000) + 8000,
  total: 25000,
  percentage: 0
})

const generateMockWeather = (): WeatherData => ({
  temp: Math.floor(Math.random() * 10) + 65,
  condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 4)],
  location: 'San Francisco, CA',
  humidity: Math.floor(Math.random() * 30) + 40
})

const generateMockSports = (): SportsScore[] => [
  {
    team1: 'Warriors',
    team2: 'Lakers',
    score1: Math.floor(Math.random() * 30) + 90,
    score2: Math.floor(Math.random() * 30) + 90,
    sport: 'NBA',
    status: 'Final'
  },
  {
    team1: '49ers',
    team2: 'Rams',
    score1: Math.floor(Math.random() * 20) + 14,
    score2: Math.floor(Math.random() * 20) + 14,
    sport: 'NFL',
    status: 'Q4'
  },
  {
    team1: 'Giants',
    team2: 'Dodgers',
    score1: Math.floor(Math.random() * 8) + 2,
    score2: Math.floor(Math.random() * 8) + 2,
    sport: 'MLB',
    status: '8th'
  }
]

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

// Circular Progress Component
const CircularProgress = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8,
  color = '#3B82F6'
}: { 
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          <AnimatedCounter value={percentage} />%
        </span>
      </div>
    </div>
  )
}

// Real-time metrics display
const RealTimeMetrics = () => {
  const [viewers, setViewers] = useState(42)
  const [cpuUsage, setCpuUsage] = useState(45)
  const [networkSpeed, setNetworkSpeed] = useState(125)

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(1, prev + Math.floor(Math.random() * 6) - 2))
      setCpuUsage(prev => Math.max(10, Math.min(90, prev + Math.floor(Math.random() * 10) - 5)))
      setNetworkSpeed(prev => Math.max(50, Math.min(200, prev + Math.floor(Math.random() * 20) - 10)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      <motion.div 
        className="glass-tile-subtle rounded-xl p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-800">
          <AnimatedCounter value={viewers} />
        </div>
        <p className="text-sm text-gray-600">Live Viewers</p>
      </motion.div>
      
      <motion.div 
        className="glass-tile-subtle rounded-xl p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <Cpu className="w-6 h-6 text-green-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-800">
          <AnimatedCounter value={cpuUsage} />%
        </div>
        <p className="text-sm text-gray-600">CPU Usage</p>
      </motion.div>
      
      <motion.div 
        className="glass-tile-subtle rounded-xl p-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <Wifi className="w-6 h-6 text-purple-500 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-800">
          <AnimatedCounter value={networkSpeed} />
        </div>
        <p className="text-sm text-gray-600">Mbps</p>
      </motion.div>
    </div>
  )
}

export default function LiveStats() {
  const [currentSportIndex, setCurrentSportIndex] = useState(0)
  const [tokenData, setTokenData] = useState(generateMockTokens())
  const [weatherData, setWeatherData] = useState(generateMockWeather())
  const [sportsData, setSportsData] = useState(generateMockSports())

  // Rotate sports scores every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSportIndex((prev) => (prev + 1) % sportsData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sportsData.length])

  // Update token data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenData(generateMockTokens())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Update weather every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(generateMockWeather())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Calculate token percentage
  useEffect(() => {
    setTokenData(prev => ({
      ...prev,
      percentage: Math.round((prev.used / prev.total) * 100)
    }))
  }, [tokenData.used, tokenData.total])

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
            <Activity className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Live Statistics
            </h2>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time data and interactive visualizations showcasing various metrics and statistics.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* OpenAI Token Usage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-tile rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-gray-800">AI Token Usage</h3>
            </div>
            
            <div className="flex justify-center mb-6">
              <CircularProgress 
                percentage={tokenData.percentage} 
                color="#3B82F6"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <AnimatedCounter value={tokenData.used} /> / {tokenData.total.toLocaleString()} tokens
              </p>
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-gray-500">Refreshes every 10s</span>
              </div>
            </div>
          </motion.div>

          {/* Sports Scores */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-tile rounded-2xl p-8"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-800">Live Sports</h3>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSportIndex}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium">{sportsData[currentSportIndex].sport}</p>
                  <p className="text-xs opacity-80">{sportsData[currentSportIndex].status}</p>
                </div>
                
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{sportsData[currentSportIndex].team1}</p>
                    <p className="text-2xl font-bold text-blue-600">{sportsData[currentSportIndex].score1}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 font-medium">VS</p>
                  </div>
                  
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{sportsData[currentSportIndex].team2}</p>
                    <p className="text-2xl font-bold text-purple-600">{sportsData[currentSportIndex].score2}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-4">
              <div className="flex gap-1">
                {sportsData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSportIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-tile rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Cloud className="w-6 h-6 text-sky-500" />
              <h3 className="text-xl font-bold text-gray-800">Weather</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-6xl font-bold bg-gradient-to-br from-orange-400 to-pink-500 bg-clip-text text-transparent"
              >
                <AnimatedCounter value={weatherData.temp} />°F
              </motion.div>
              
              <p className="text-lg font-medium text-gray-700">{weatherData.condition}</p>
              <p className="text-sm text-gray-500">{weatherData.location}</p>
              
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
                <Thermometer className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-600">
                  Humidity: <AnimatedCounter value={weatherData.humidity} />%
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Real-time Metrics
          </h3>
          <RealTimeMetrics />
        </motion.div>

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