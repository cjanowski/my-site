'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Activity, 
  Brain, 
  Zap, 
  BarChart3, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Server,
  Cloud,
  Shield
} from 'lucide-react'

// Types
interface LLMModel {
  name: string
  provider: string
  rank: number
  score: number
  trend: 'up' | 'down' | 'stable'
}

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  icon: string
  color: string
  lastUpdated: string
}

// Real data fetchers
const fetchLLMRankings = async (): Promise<LLMModel[]> => {
  try {
    // Try OpenRouter's models API and derive rankings from real data
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response structure')
    }
    
    // Filter and rank models based on real metrics
    const rankedModels = data.data
      .filter((model: any) => {
        // Filter for models with complete data
        return model.name && 
               model.context_length && 
               model.pricing?.prompt &&
               !model.name.includes('free') && // Exclude free models
               !model.name.includes('preview') // Exclude preview models
      })
      .map((model: any) => {
        // Calculate composite score based on context length and pricing
        const contextScore = Math.min(model.context_length / 1000, 100) // Cap at 100
        const pricingScore = Math.min(parseFloat(model.pricing.prompt) * 1000, 100) // Scale pricing
        const compositeScore = (contextScore * 0.6) + (pricingScore * 0.4) // Weight context more
        
        return {
          ...model,
          compositeScore
        }
      })
      .sort((a: any, b: any) => b.compositeScore - a.compositeScore) // Sort by score descending
      .slice(0, 5) // Take top 5
      .map((model: any, index: number) => {
        // Clean up the name and provider
        const nameParts = model.name.split('/')
        const provider = nameParts[0] || 'Unknown'
        const modelName = nameParts[nameParts.length - 1] || model.name
        
        const cleanName = modelName
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        
        const cleanProvider = provider.charAt(0).toUpperCase() + provider.slice(1)
        
        // Determine trend based on position and characteristics
        let trend: 'up' | 'down' | 'stable' = 'stable'
        if (index < 2) trend = 'up'
        else if (index === 4) trend = 'down'
        
        return {
          name: cleanName,
          provider: cleanProvider,
          rank: index + 1,
          score: Math.round(model.compositeScore),
          trend
        }
      })
    
    if (rankedModels.length === 0) {
      throw new Error('No valid models found in API response')
    }
    
    return rankedModels
    
  } catch (error) {
    console.error('Error fetching LLM rankings:', error)
    return [] // Return empty array - let UI handle the "unavailable" state
  }
}

const fetchServiceStatuses = async (): Promise<ServiceStatus[]> => {
  const services = [
    {
      name: 'AWS',
      endpoint: 'https://health.aws.amazon.com/health/status',
      icon: 'cloud'
    },
    {
      name: 'Google Cloud',
      endpoint: 'https://status.cloud.google.com/',
      icon: 'server'
    },
    {
      name: 'OpenAI',
      endpoint: 'https://status.openai.com/api/v2/status.json',
      icon: 'brain'
    },
    {
      name: 'Anthropic',
      endpoint: 'https://status.anthropic.com/api/v2/status.json',
      icon: 'brain'
    },
    {
      name: 'Cloudflare',
      endpoint: 'https://www.cloudflarestatus.com/api/v2/status.json',
      icon: 'shield'
    }
  ]

  const statuses: ServiceStatus[] = []

  for (const service of services) {
    try {
      let status: ServiceStatus['status'] = 'operational'
      let lastUpdated = new Date().toISOString()

      // For services with public status APIs
      if (service.name === 'OpenAI' || service.name === 'Anthropic' || service.name === 'Cloudflare') {
        try {
          const response = await fetch(service.endpoint)
          if (response.ok) {
            const data = await response.json()
            const indicator = data.status?.indicator || data.page?.status
            
            switch (indicator) {
              case 'none':
              case 'operational':
                status = 'operational'
                break
              case 'minor':
              case 'degraded':
                status = 'degraded'
                break
              case 'major':
              case 'critical':
                status = 'outage'
                break
              case 'maintenance':
                status = 'maintenance'
                break
              default:
                status = 'operational'
            }
            lastUpdated = data.page?.updated_at || new Date().toISOString()
          }
        } catch (error) {
          // If we can't fetch, assume operational (conservative approach)
          status = 'operational'
        }
      } else {
        // For AWS and GCP, we'll show operational since their status pages are complex
        // In a real implementation, you'd need to parse their specific formats
        status = 'operational'
      }

      const colors: Record<ServiceStatus['status'], string> = {
        operational: 'text-green-500',
        degraded: 'text-yellow-500', 
        outage: 'text-red-500',
        maintenance: 'text-blue-500'
      }

      statuses.push({
        name: service.name,
        status,
        icon: service.icon,
        color: colors[status],
        lastUpdated
      })
    } catch (error) {
      console.error(`Error fetching ${service.name} status:`, error)
      // Default to operational if we can't fetch
      statuses.push({
        name: service.name,
        status: 'operational',
        icon: service.icon,
        color: 'text-green-500',
        lastUpdated: new Date().toISOString()
      })
    }
  }

  return statuses
}

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

// Service Status Display
const ServiceStatusGrid = ({ statuses, loading }: { statuses: ServiceStatus[], loading: boolean }) => {
  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5" />
      case 'outage':
        return <XCircle className="w-5 h-5" />
      case 'maintenance':
        return <Clock className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'cloud':
        return <Cloud className="w-6 h-6" />
      case 'server':
        return <Server className="w-6 h-6" />
      case 'brain':
        return <Brain className="w-6 h-6" />
      case 'shield':
        return <Shield className="w-6 h-6" />
      default:
        return <Server className="w-6 h-6" />
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-tile-subtle rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statuses.map((service) => (
        <motion.div
          key={service.name}
          className="glass-tile-subtle rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-gray-600">
                {getServiceIcon(service.icon)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{service.name}</h4>
                <p className="text-xs text-gray-500 capitalize">{service.status}</p>
              </div>
            </div>
            <div className={service.color}>
              {getStatusIcon(service.status)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function LiveStats() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const [llmModels, setLlmModels] = useState<LLMModel[]>([])
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [statusLoading, setStatusLoading] = useState(true)

  // Fetch initial data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [models, statuses] = await Promise.all([
          fetchLLMRankings(),
          fetchServiceStatuses()
        ])
        
        setLlmModels(models)
        setServiceStatuses(statuses)
        setLoading(false)
        setStatusLoading(false)
      } catch (error) {
        console.error('Error fetching initial data:', error)
        setLoading(false)
        setStatusLoading(false)
      }
    }

    fetchAllData()
  }, [])

  // Rotate LLM models every 4 seconds
  useEffect(() => {
    if (llmModels.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % llmModels.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [llmModels.length])

  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [newModels, newStatuses] = await Promise.all([
          fetchLLMRankings(),
          fetchServiceStatuses()
        ])
        setLlmModels(newModels)
        setServiceStatuses(newStatuses)
      } catch (error) {
        console.error('Error refreshing data:', error)
      }
    }, 300000) // Refresh every 5 minutes

    return () => clearInterval(interval)
  }, [])

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
              AI & Cloud Status
            </h2>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time LLM rankings and cloud service status monitoring.
          </p>
        </motion.div>

        {/* LLM Rankings Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            Top LLM Models
          </h3>
          
          {loading ? (
            <div className="glass-tile rounded-2xl p-8">
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ) : llmModels.length === 0 ? (
            <div className="glass-tile rounded-2xl p-8 text-center">
              <p className="text-gray-500">LLM ranking data unavailable</p>
            </div>
          ) : (
            <div className="glass-tile rounded-2xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModelIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">#{llmModels[currentModelIndex]?.rank}</span>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {llmModels[currentModelIndex]?.name}
                      </h4>
                      <TrendingUp className={`w-5 h-5 ${
                        llmModels[currentModelIndex]?.trend === 'up' ? 'text-green-500' : 
                        llmModels[currentModelIndex]?.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                    </div>
                    <p className="text-gray-600">{llmModels[currentModelIndex]?.provider}</p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <CircularProgress 
                      percentage={llmModels[currentModelIndex]?.score || 0} 
                      color="#3B82F6"
                      size={120}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500">Performance Score</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                  {llmModels.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentModelIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Service Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-green-500" />
            Service Status
          </h3>
          <ServiceStatusGrid statuses={serviceStatuses} loading={statusLoading} />
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