import React, { ReactNode } from 'react'

interface ComponentChipProps {
    children: ReactNode;
    label?: string;
    id?: string;
    className?: string;
    pins?: 'none' | 'left-right' | 'top-bottom' | 'all';
}

export default function ComponentChip({
    children,
    label = 'IC-7400',
    id,
    className = '',
    pins = 'none'
}: ComponentChipProps) {

    return (
        <div className={`relative group ${className}`}>

            {/* Decorative Pins - Top/Bottom */}
            {(pins === 'top-bottom' || pins === 'all') && (
                <>
                    <div className="absolute -top-1 left-4 right-4 h-1 flex justify-between space-x-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={`pin-t-${i}`} className="w-2 h-full bg-gray-400 rounded-t-sm shadow-sm" />
                        ))}
                    </div>
                    <div className="absolute -bottom-1 left-4 right-4 h-1 flex justify-between space-x-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={`pin-b-${i}`} className="w-2 h-full bg-gray-400 rounded-b-sm shadow-sm" />
                        ))}
                    </div>
                </>
            )}

            {/* Decorative Pins - Left/Right */}
            {(pins === 'left-right' || pins === 'all') && (
                <>
                    <div className="absolute top-4 bottom-4 -left-1 w-1 flex flex-col justify-between space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={`pin-l-${i}`} className="h-4 w-full bg-gray-400 rounded-l-sm shadow-sm" />
                        ))}
                    </div>
                    <div className="absolute top-4 bottom-4 -right-1 w-1 flex flex-col justify-between space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={`pin-r-${i}`} className="h-4 w-full bg-gray-400 rounded-r-sm shadow-sm" />
                        ))}
                    </div>
                </>
            )}

            {/* Main Chip Body */}
            <div className="component-chip p-1 w-full h-full relative z-10 transition-transform duration-300 hover:-translate-y-1">
                {/* Inner Glass Surface */}
                <div className="w-full h-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-sm p-4 overflow-hidden relative">

                    {/* Chip Label/ID */}
                    {(label || id) && (
                        <div className="absolute top-2 right-2 flex flex-col items-end pointer-events-none">
                            {label && <span className="component-chip-text font-bold">{label}</span>}
                            {id && <span className="component-chip-text text-[10px]">{id}</span>}
                        </div>
                    )}

                    {/* Orientation Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/60 rounded-b-lg border-b border-l border-r border-gray-700/50" />

                    {/* Content */}
                    <div className="relative z-10">
                        {children}
                    </div>

                    {/* Surface Texture/Shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    )
}
