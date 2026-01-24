'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Power, Terminal, AlertTriangle, Maximize2, Volume2 } from 'lucide-react'
import LEDIndicator from './LEDIndicator'
import Script from 'next/script'

declare global {
    interface Window {
        Dos: any;
    }
}

export default function DoomContainer() {
    const [isPowerOn, setIsPowerOn] = useState(false)
    const [isBooting, setIsBooting] = useState(false)
    const [showGame, setShowGame] = useState(false)
    const containerRef = useRef<HTMLCanvasElement>(null)

    const handlePowerToggle = () => {
        if (isPowerOn) {
            setIsPowerOn(false)
            setShowGame(false)
            setIsBooting(false)
        } else {
            setIsPowerOn(true)
            setIsBooting(true)

            // Boot sequence simulation
            setTimeout(() => {
                setIsBooting(false)
                setShowGame(true)
            }, 3000)
        }
    }

    return (
        <section className="py-24 section-padding relative overflow-hidden flex flex-col items-center">

            {/* Section Header */}
            <div className="mb-12 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-mono mb-4 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>LEGACY_PROTOCOL_DETECTED</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">System Diagnostics</h2>
                <p className="text-gray-500 font-mono text-sm">/usr/bin/retro_module --force</p>
            </div>

            {/* CRT Monitor Container */}
            <div className="relative z-10 max-w-4xl w-full mx-4">

                {/* Monitor Casing */}
                <div className="bg-[#e0e0e0] p-4 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,0.2)] border-b-8 border-r-8 border-[#c0c0c0] relative">

                    {/* Ventilation Grills */}
                    <div className="absolute top-4 right-8 flex gap-2 opacity-20">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-6 bg-black rounded-full" />)}
                    </div>

                    {/* Screen Bezel */}
                    <div className="bg-[#2a2a2a] p-4 sm:p-6 rounded-2xl shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">

                        {/* The CRT Screen */}
                        <div className="aspect-[4/3] bg-black relative rounded-lg overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">

                            {/* Screen Content */}
                            <AnimatePresence mode="wait">
                                {!isPowerOn ? (
                                    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
                                        <div className="w-full h-[2px] bg-white opacity-20" />
                                    </div>
                                ) : isBooting ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-blue-900 text-white p-8 font-mono text-xs sm:text-sm leading-tight overflow-hidden"
                                    >
                                        <div className="space-y-1">
                                            <p>BIOS DATE 01/24/96 14:22:56 VER 1.0.2</p>
                                            <p>CPU: INTEL 486 DX2-66</p>
                                            <p>640K RAM SYSTEM ... OK</p>
                                            <p>EXTENDED MEMORY ... OK</p>
                                            <p>CACHE MEMORY ... OK</p>
                                            <br />
                                            <p>INITIALIZING VIDEO ADAPTER ... DONE</p>
                                            <p>LOADING SOUND BLASTER AS HARDWARE AT 220 IRQ 5 DMA 1</p>
                                            <br />
                                            <p>C:\&gt; MOUNT C /GAMES</p>
                                            <p>C:\&gt; CD DOOM</p>
                                            <p>C:\GAMES\DOOM\&gt; DOOM.EXE</p>
                                            <motion.div
                                                animate={{ opacity: [0, 1] }}
                                                transition={{ repeat: Infinity, duration: 0.5 }}
                                                className="inline-block w-2 h-4 bg-white align-middle ml-1"
                                            />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full h-full bg-black relative"
                                    >
                                        <canvas ref={containerRef} className="w-full h-full block" />
                                        <Script
                                            src="https://js-dos.com/6.22/current/js-dos.js"
                                            onLoad={() => {
                                                if (window.Dos && containerRef.current) {
                                                    window.Dos(containerRef.current, {
                                                        style: "none",
                                                        center: false,
                                                    }).run('/doom.jsdos');
                                                }
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CRT Effects Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                {/* Curve Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-lg" />

                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />

                                {/* Screen Flicker */}
                                <motion.div
                                    className="absolute inset-0 bg-white/5 mix-blend-overlay"
                                    animate={{ opacity: [0.03, 0.06, 0.03] }}
                                    transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Vignette */}
                                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
                            </div>
                        </div>

                        {/* Monitor Controls */}
                        <div className="mt-4 flex items-center justify-between px-2">
                            <div className="flex items-center gap-4">
                                <LEDIndicator color="green" state={isPowerOn ? 'on' : 'off'} size="sm" label="PWR" />
                                <LEDIndicator color="red" state={showGame ? 'blink' : 'off'} size="sm" label="HDD" />
                            </div>

                            <div className="flex gap-2">
                                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Sony Trinitron</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Master Control Panel */}
                <div className="mt-8 flex justify-center">
                    <div className="p-4 rounded-xl bg-gray-900 border border-gray-700 flex items-center gap-6 shadow-2xl">
                        <button
                            onClick={handlePowerToggle}
                            className={`
                group relative px-6 py-6 rounded-lg transition-all duration-200 border-2
                ${isPowerOn
                                    ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'}
              `}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Power className={`w-8 h-8 ${isPowerOn ? 'text-red-500' : 'text-gray-400'}`} />
                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                    {isPowerOn ? 'SHUTDOWN' : 'INIT_SYS'}
                                </span>
                            </div>
                        </button>

                        <div className="h-12 w-px bg-gray-700" />

                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                                <Terminal className="w-4 h-4" />
                                <span>Override Status: <span className={isPowerOn ? "text-green-400" : "text-gray-600"}>{isPowerOn ? "GRANTED" : "LOCKED"}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                                <Volume2 className="w-4 h-4" />
                                <span>Audio Protocol: <span className="text-gray-500">ENABLED</span></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Decorative Wires */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 flex gap-4 opacity-50 pointer-events-none">
                <div className="w-2 h-40 bg-gray-800 rounded-full" />
                <div className="w-3 h-40 bg-black rounded-full" />
                <div className="w-2 h-40 bg-gray-700 rounded-full" />
            </div>
        </section>
    )
}
