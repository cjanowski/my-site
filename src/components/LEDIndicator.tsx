import React from 'react'

interface LEDProps {
    color?: 'red' | 'green' | 'blue' | 'amber' | 'purple';
    state?: 'off' | 'on' | 'pulse' | 'blink';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    className?: string;
}

export default function LEDIndicator({
    color = 'green',
    state = 'on',
    size = 'md',
    label,
    className = ''
}: LEDProps) {

    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    }

    const colorStateMap = {
        red: {
            off: 'led-red-off',
            on: 'led-red-on',
            pulse: 'led-red-on animate-led-pulse',
            blink: 'led-red-on animate-pulse'
        },
        green: {
            off: 'led-green-off',
            on: 'led-green-on',
            pulse: 'led-green-on animate-led-pulse',
            blink: 'led-green-on animate-pulse'
        },
        blue: {
            off: 'led-blue-off',
            on: 'led-blue-on',
            pulse: 'led-blue-on animate-led-pulse',
            blink: 'led-blue-on animate-pulse'
        },
        amber: {
            off: 'led-amber-off',
            on: 'led-amber-on',
            pulse: 'led-amber-on animate-led-pulse',
            blink: 'led-amber-on animate-pulse'
        },
        purple: {
            off: 'led-purple-off',
            on: 'led-purple-on',
            pulse: 'led-purple-on animate-led-pulse',
            blink: 'led-purple-on animate-pulse'
        }
    }

    // Fallback if color/state combo invalid (though types prevent this generally)
    const baseColorClass = colorStateMap[color]?.[state] || 'led-green-on'

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`led ${sizeClasses[size]} ${baseColorClass}`}
                aria-hidden="true"
            />
            {label && (
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {label}
                </span>
            )}
        </div>
    )
}
