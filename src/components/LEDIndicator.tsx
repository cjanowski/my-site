import React from 'react'

interface LEDProps {
    color?: 'red' | 'green' | 'blue' | 'amber';
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

    const getStatusClass = () => {
        // Determine base color class
        const colorKey = `led-${color}`

        // Determine state suffix
        let suffix = '-on'
        if (state === 'off') suffix = '-off'

        // Combine for final class
        let classes = `${colorKey}${suffix}`

        // Add animation classes
        if (state === 'pulse') classes += ' animate-led-pulse'
        if (state === 'blink') classes += ' animate-pulse' // Use standard pulse for blink effect

        return classes
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`led ${sizeClasses[size]} ${getStatusClass()}`}
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
