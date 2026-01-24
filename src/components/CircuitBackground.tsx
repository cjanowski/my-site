'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CircuitBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Base PCB Texture */}
            <div className="absolute inset-0 bg-pcb-green-900 pcb-texture opacity-80" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />

            {/* Animated Glow Orbs (faked components) */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pcb-green-500/10 blur-3xl"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-apple-blue-500/10 blur-3xl"
            />

            {/* Decorative Copper Traces (Background) */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <pattern id="trace-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                    <path d="M20,100 L80,100 L100,80 L100,20" stroke="#b8860b" strokeWidth="1" fill="none" />
                    <circle cx="20" cy="100" r="2" fill="#b8860b" />
                    <circle cx="100" cy="20" r="2" fill="#b8860b" />

                    <path d="M120,180 L150,180 L180,150" stroke="#b8860b" strokeWidth="1" fill="none" />
                    <circle cx="120" cy="180" r="2" fill="#b8860b" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#trace-pattern)" />
            </svg>

            {/* Grid Overlay */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    )
}
