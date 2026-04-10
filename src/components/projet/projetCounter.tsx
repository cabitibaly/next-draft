"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"

interface ProjetCounterProps {
    index: number
    total: number
    className?: string
}

export type ProjetCounterRef = {
    digit1: HTMLDivElement
    digit2: HTMLDivElement
    digit3: HTMLDivElement
    digit4: HTMLDivElement
    slash: HTMLDivElement
}

const ProjetCounter = forwardRef<ProjetCounterRef, ProjetCounterProps>(({ index, total, className = "" }, ref) => {
    const digit1Ref = useRef<HTMLDivElement>(null)
    const digit2Ref = useRef<HTMLDivElement>(null)
    const digit3Ref = useRef<HTMLDivElement>(null)
    const digit4Ref = useRef<HTMLDivElement>(null)
    const slashRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        digit1: digit1Ref.current!,
        digit2: digit2Ref.current!,
        digit3: digit3Ref.current!,
        digit4: digit4Ref.current!,
        slash: slashRef.current!
    }))

    return (
        <div className={`flex items-center justify-center overflow-hidden ${className}`}>
            <div ref={digit1Ref} className="text-9xl text-blanc font-space-grotesk font-medium max-lg:text-7xl max-sm:text-5xl">0</div>
            <div ref={digit2Ref} className="text-9xl text-blanc font-space-grotesk font-medium max-lg:text-7xl max-sm:text-5xl">{index + 1}</div>
            <div ref={slashRef} className="text-9xl text-blanc font-space-grotesk font-medium max-lg:text-7xl max-sm:text-5xl">/</div>
            <div ref={digit3Ref} className="text-9xl text-blanc font-space-grotesk font-medium max-lg:text-7xl max-sm:text-5xl">0</div>
            <div ref={digit4Ref} className="text-9xl text-blanc font-space-grotesk font-medium max-lg:text-7xl max-sm:text-5xl">{total}</div>
        </div>
    )
})

ProjetCounter.displayName = 'ProjetCounter'

export default ProjetCounter