'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Power, Terminal, AlertTriangle, Volume2, Gamepad2 } from 'lucide-react'

export default function DoomContainer() {
    const [isPowerOn, setIsPowerOn] = useState(false)
    const [isBooting, setIsBooting] = useState(false)
    const [showGame, setShowGame] = useState(false)

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
        <section id="doom" className="py-24 section-padding relative overflow-hidden flex flex-col items-center z-10 bg-white/20 backdrop-blur-sm">

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center mb-16 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle bg-primary-50 text-primary-700 text-xs font-semibold tracking-wider mb-4">
                    <Gamepad2 className="w-4 h-4" />
                    <span>HIDDEN_EASTER_EGG</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-center">
                    Retro <span className="gradient-text">Gaming Area</span>
                </h2>
                <p className="text-gray-500 font-medium mt-4">/usr/bin/retro_module --force</p>
            </motion.div>

            {/* Premium Glass Container for Monitor */}
            <div className="relative z-10 max-w-4xl w-full mx-4 glass-panel p-6 sm:p-10 shadow-glass-heavy">

                {/* Monitor Casing (Keeping CRT feel but cleaner) */}
                <div className="bg-[#EAEAEA] p-4 sm:p-8 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.05),inset_0_2px_10px_rgba(255,255,255,1)] border border-white relative">

                    {/* Ventilation Grills */}
                    <div className="absolute top-4 right-8 flex gap-2 opacity-10">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-6 bg-gray-500 rounded-full" />)}
                    </div>

                    {/* Screen Bezel */}
                    <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-3xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] relative overflow-hidden ring-1 ring-white/10">

                        {/* The CRT Screen */}
                        <div className="aspect-[4/3] bg-black relative rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">

                            {/* CRT Effects Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                {/* Curve Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-lg" />
                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />
                                {/* Vignette */}
                                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
                            </div>

                            {/* Screen Content */}
                            <AnimatePresence mode="wait">
                                {!isPowerOn ? (
                                    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
                                        <div className="w-full h-[1px] bg-white opacity-10" />
                                    </div>
                                ) : isBooting ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-blue-900 text-white p-8 font-mono text-xs sm:text-sm leading-tight overflow-hidden z-10"
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
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full h-full flex items-center justify-center overflow-hidden bg-black z-10 relative"
                                    >
                                        <iframe
                                            src="https://archive.org/embed/msdos_DOOM_1993"
                                            className="w-full h-full border-0 absolute inset-0 z-30"
                                            allowFullScreen
                                            allow="autoplay; gamepad"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Monitor Branding */}
                        <div className="mt-3 flex items-center justify-center">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">Sony Trinitron</span>
                        </div>

                    </div>
                </div>

                {/* Master Control Panel */}
                <div className="mt-8 flex justify-center">
                    <div className="p-4 sm:p-6 rounded-[24px] bg-white/50 backdrop-blur-md border border-white/60 flex flex-wrap justify-center items-center gap-4 sm:gap-8 shadow-sm">

                        <button
                            onClick={handlePowerToggle}
                            className={`
                                group relative px-6 py-4 rounded-2xl transition-all duration-300 font-medium
                                ${isPowerOn
                                    ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm shadow-red-500/10'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'}
                            `}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Power className={`w-6 h-6 ${isPowerOn ? 'text-red-500' : 'text-gray-400 group-hover:text-primary-500 transition-colors'}`} />
                                <span className="text-xs uppercase tracking-wider font-bold">
                                    {isPowerOn ? 'SHUTDOWN' : 'INIT_SYS'}
                                </span>
                            </div>
                        </button>

                        <div className="hidden sm:block h-12 w-px bg-gray-200" />

                        <div className="space-y-3 bg-white/60 p-4 rounded-xl border border-white/80">
                            <div className="flex items-center gap-3 text-sm text-gray-600 font-mono">
                                <Terminal className="w-4 h-4 text-primary-500" />
                                <span>Status: <span className={isPowerOn ? "text-green-600 font-bold" : "text-gray-500"}>{isPowerOn ? "GRANTED" : "LOCKED"}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 font-mono">
                                <Volume2 className="w-4 h-4 text-secondary-500" />
                                <span>Audio: <span className="font-bold text-gray-700">ENABLED</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
