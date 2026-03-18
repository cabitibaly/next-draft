"use client"

import gsap from "gsap"
import { useRef, useState } from "react"


function Service() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const firstRef = useRef<HTMLDivElement>(null)
    const secondRef = useRef<HTMLDivElement>(null)
    const thirdRef = useRef<HTMLDivElement>(null)
    
    const onMouseEnter = (index: number) => {
        const refs = [firstRef, secondRef, thirdRef]
        setActiveIndex(index)

        refs.forEach((ref, i) => {
            gsap.to(ref.current, {
                width: i === index ? "80%" : "10%",
                ease: "power4.inOut",
                duration: 0.5,
            })
        })
    }

    const onMouseLeave = () => {
        gsap.to([firstRef.current, secondRef.current, thirdRef.current], {
            width: "33.333333%",
            ease: "power4.inOut",
            duration: 0.5,
        })

        setActiveIndex(null)
    }

    return (
        <div className='px-20 bg-[#111113] w-screen h-screen flex items-center justify-center gap-4'>
            <div onMouseEnter={() => onMouseEnter(0)} onMouseLeave={() => onMouseLeave()}  ref={firstRef} className='group border border-white p-4 w-1/3 h-3/5 overflow-hidden rounded-2xl flex items-end justify-center'>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                       whitespace-nowrap uppercase
                        ${activeIndex === 0 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-16"}
                    `}
                >
                    WEB DESIGN
                </div>
            </div>
            <div onMouseEnter={() => onMouseEnter(1)} onMouseLeave={() => onMouseLeave()} ref={secondRef} className='border border-white p-4 w-1/3 h-3/5 rounded-2xl overflow-hidden flex items-end justify-center'>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                       whitespace-nowrap uppercase
                        ${activeIndex === 1 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-28"}
                    `}
                >
                    Développement web
                </div>
            </div>
            <div onMouseEnter={() => onMouseEnter(2)} onMouseLeave={() => onMouseLeave()} ref={thirdRef} className='border border-white p-4 w-1/3 h-3/5 rounded-2xl overflow-hidden flex items-end justify-center'>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                       whitespace-nowrap uppercase
                        ${activeIndex === 2 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-32"}
                    `}
                >
                    Développement Mobile
                </div>
            </div>
        </div>
    )
}

export default Service
