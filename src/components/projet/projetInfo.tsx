"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import ProjetCounter, { ProjetCounterRef } from "./projetCounter"

interface ProjetInfoProps {
    index: number
    total: number
    title: string
    description: string
}

export type ProjetInfoRef = {
    counter: ProjetCounterRef
}

const ProjetInfo = forwardRef<ProjetInfoRef, ProjetInfoProps>(({ index, total, title, description }, ref) => {
    const counterRef = useRef<ProjetCounterRef>(null)

    useImperativeHandle(ref, () => ({
        counter: counterRef.current!
    }))

    return (
        <div className="pb-24 w-1/2 h-full flex flex-col items-start justify-between gap-6 max-md:pb-0 max-md:w-full max-md:h-auto">
            <ProjetCounter
                ref={counterRef} 
                index={index} 
                total={total}                
                className="left-16 top-4 z-20 max-md:left-4" 
            />
            <div className="w-4/5 flex flex-col items-start justify-start gap-4 max-lg:w-[95%] max-md:w-full">
                <div className="overflow-hidden">
                    <div className="projet-title text-7xl text-blanc font-space-grotesk font-medium uppercase max-lg:text-5xl">
                        {title}
                    </div>
                </div>
                <p className="description text-base text-blanc text-left font-ibm-plex-mono font-bold uppercase max-lg:text-sm max-xs:text-xs">
                    {description}
                </p>
            </div>
        </div>
    )
})

ProjetInfo.displayName = 'ProjetInfo'

export default ProjetInfo