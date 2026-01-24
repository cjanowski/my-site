'use client'

import { motion } from 'framer-motion'

interface CircuitTraceProps {
    width?: number;
    height?: number;
    color?: string;
    className?: string;
    style?: 'straight' | 'corner-left' | 'corner-right' | 't-junction' | 'complex';
    delay?: number;
}

export default function CircuitTrace({
    width = 100,
    height = 50,
    color = '#b8860b', // Copper
    className = '',
    style = 'straight',
    delay = 0
}: CircuitTraceProps) {

    // Define path based on style
    let pathD = ''

    switch (style) {
        case 'straight':
            pathD = `M0,${height / 2} L${width},${height / 2}`
            break
        case 'corner-left':
            pathD = `M${width},0 L${width},${height / 2} L0,${height / 2}`
            break
        case 'corner-right':
            pathD = `M0,0 L0,${height / 2} L${width},${height / 2}`
            break
        case 'complex':
            pathD = `M0,${height / 2} L${width * 0.2},${height / 2} L${width * 0.3},${height * 0.2} L${width * 0.7},${height * 0.2} L${width * 0.8},${height / 2} L${width},${height / 2}`
            break
        default:
            pathD = `M0,${height / 2} L${width},${height / 2}`
    }

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
            >
                {/* Base Copper Trace */}
                <path
                    d={pathD}
                    stroke={color}
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Animated Electron Flow */}
                <motion.path
                    d={pathD}
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: delay
                    }}
                    className="drop-shadow-[0_0_3px_rgba(184,134,11,0.8)]"
                />

                {/* Solder Points at ends */}
                <circle cx={style === 'corner-left' ? width : 0} cy={style === 'corner-left' ? 0 : (style === 'corner-right' ? 0 : height / 2)} r="3" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <circle cx={style === 'corner-left' ? 0 : width} cy={height / 2} r="3" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
            </svg>
        </div>
    )
}
