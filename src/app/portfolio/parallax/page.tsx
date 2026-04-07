"use client"

import Image from "next/image"
import { useGSAP } from "@gsap/react"
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef, useState } from "react"

const images = [
    "/story-1.webp",
    "/story-2.webp",
    "/story-3.webp",
    "/story-4.webp",
    "/story-5.webp",
]

const texts = [
    "Plateforme de support technique",
    "Gestion des tickets simplifiée",
    "Suivi en temps réel",
    "Support client optimisé",
    "Analyse et reporting avancé",
]

const colors = [
    "bg-[#338DFF]",
    "bg-[#FFA500]",
    "bg-[#00C2FF]",
    "bg-[#FFA500]",
    "bg-[#00C2FF]",
]

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Parallax = () => {
    const navRef = useRef<HTMLDivElement>(null)    
    const titleRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [color, setColor] = useState(colors[0])

    useGSAP(() => {        

        gsap.utils.toArray<HTMLDivElement>(".parallax-container").forEach((container, index) => {
            const img = container.querySelector("img")

            gsap.fromTo(
                img, 
                {
                    yPercent: -20
                },
                {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            )

            ScrollTrigger.create({
                trigger: container,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    setActiveIndex(index)
                },
                onEnterBack: () => {                    
                    setActiveIndex(index)
                }
            })
        })        
    })

    useEffect(() => {
        if (!titleRef.current) return

        gsap.set(titleRef.current, { y: 20, opacity: 0 })

        const tl = gsap.timeline()

        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.inOut"
        })

    }, [activeIndex])

    return (
        <div className='bg-[#111113] py-0 w-screen min-h-screen flex flex-col items-center justify-center'>
            {
                images.map((image, index) => (
                    <div key={index} className="parallax-container overflow-hidden w-full h-[150svh] flex items-center justify-center">
                        <div className="parallax-image-wrapper relative w-full h-full after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xl">
                            <Image src={image} alt='story' fill className='object-cover' />
                        </div>
                    </div>
                ))
            }

            <div 
                ref={navRef} 
                className="
                    fixed bottom-6 z-40 py-1 w-1/3 h-20 flex items-center justify-between gap-4 overflow-hidden rounded-2xl transition-colors after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xl
                    max-xl:w-2/5 max-lg:w-1/2 max-md:w-3/4 max-xs:w-full
                "
            >
                <div className="h-full flex items-center gap-2">
                    <div className="relative z-50 ml-1 w-24! h-full overflow-hidden rounded-xl">
                        <Image key={activeIndex} src={images[activeIndex]} alt='story' fill className='object-cover' />
                    </div>
                    <div className="h-full flex flex-col items-start justify-center">
                        <div className="z-1 flex items-center justify-center max-md:left-4">
                            <div className="text-base text-neutral-400 font-space-grotesk font-medium">0</div>
                            <div className="text-base text-neutral-400 font-space-grotesk font-medium">{activeIndex + 1}</div>
                            <div className="text-base text-neutral-400 font-space-grotesk font-medium">/</div>
                            <div className="text-base text-neutral-400 font-space-grotesk font-medium">0</div>
                            <div className="text-base text-neutral-400 font-space-grotesk font-medium">{images.length}</div>
                        </div>
                        <div className="z-1 overflow-hidden">
                            <div ref={titleRef} className="mix-blend-difference text-base text-white font-medium uppercase max-xs:text-xs">{texts[activeIndex]}</div>                        
                        </div>
                    </div>
                </div>
                <div key={activeIndex} className={`mr-1 z-1 size-10 rounded-full aspect-square duration-500 ease-in-out ${colors[activeIndex]} transition-colors`}>

                </div>
            </div>
        </div>
    )
}

export default Parallax