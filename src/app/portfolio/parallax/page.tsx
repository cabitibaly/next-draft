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

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Parallax = () => {
    const navRef = useRef<HTMLDivElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useGSAP(() => {
        const colors =["#111113", "#fb2c36", "#737373", "#fb64b6", "#05df72"]

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
                        markers: true,
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

            <div ref={navRef} className="fixed bottom-6 z-40 py-1 w-1/3 h-24 flex items-center justify-start overflow-hidden rounded-2xl transition-colors after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xl">
                <div className="relative z-50 ml-1 w-1/5 h-full overflow-hidden rounded-xl">
                    <Image key={activeIndex} src={images[activeIndex]} alt='story' fill className='object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Parallax