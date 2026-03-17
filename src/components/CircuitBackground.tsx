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
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#FCFCFC]">
            {/* Elegant abstract gradient blobs for clear glass aesthetic */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-[100px] bg-primary-500/[0.12] blur-[100px]"
            />

            <motion.div
                animate={{
                    x: [0, -70, 50, 0],
                    y: [0, 50, -30, 0],
                    scale: [1, 1.1, 1.2, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[30%] right-[-5%] w-[45vw] h-[45vw] rounded-[100px] bg-secondary-500/[0.08] blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 50, 0],
                    scale: [1, 1.2, 1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-[100px] bg-accent-500/[0.08] blur-[120px]"
            />

            {/* A perfectly clear finish without noise or grids */}
            <div className="absolute inset-0 bg-white/[0.02]" />
        </div>
    )
}
