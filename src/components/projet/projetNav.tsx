"use client"

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface ProjetNavProps {
    activeIndex: number
    images: string[]
    texts: string[]
    colors: string[]
}

const ProjetNav = ({ activeIndex, images, texts, colors }: ProjetNavProps) => {
    const titleRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!titleRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            tl.fromTo(
                titleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            )
        })

        return () => ctx.revert()
    }, { dependencies: [activeIndex] })

    return (
        <div className="
            fixed left-1/2 -translate-1/2 -bottom-6 z-10 py-1 w-1/3 h-20 flex items-center justify-between gap-4 overflow-hidden rounded-2xl transition-colors after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xl
            max-xl:w-2/5 max-lg:w-1/2 max-md:w-3/4 max-xs:w-[95%]
        ">
            <div className="h-full flex items-center gap-2">
                <div className="relative z-50 ml-1 w-24! h-full overflow-hidden rounded-xl">
                    <Image key={activeIndex} src={images[activeIndex]} alt='story' fill className='object-cover' />
                </div>
                <div className="h-full flex flex-col items-start justify-center">
                    <div className="z-1 flex items-center justify-center max-md:left-4">
                        <div className="text-base text-neutral-400 font-ibm-plex-mono font-medium">0</div>
                        <div className="text-base text-neutral-400 font-ibm-plex-mono font-medium">{activeIndex + 1}</div>
                        <div className="text-base text-neutral-400 font-ibm-plex-mono font-medium">/</div>
                        <div className="text-base text-neutral-400 font-ibm-plex-mono font-medium">0</div>
                        <div className="text-base text-neutral-400 font-ibm-plex-mono font-medium">{images.length}</div>
                    </div>
                    <div className="z-1 overflow-hidden">
                        <div 
                            ref={titleRef} 
                            className="text-base text-blanc font-ibm-plex-mono font-medium uppercase max-xs:text-xs"
                        >
                            {texts[activeIndex]}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                key={activeIndex} 
                className={`mr-4 z-1 size-10 rounded-full aspect-square duration-500 ease-in-out ${colors[activeIndex]} transition-colors`} 
            />
        </div>
    )
}

export default ProjetNav