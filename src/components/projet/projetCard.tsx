"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import ProjetInfo, { ProjetInfoRef } from './projetInfo'
import ProjetTechStack from './projetTechStack'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ProjetCardProps {
    image: string
    index: number
    total: number
    title: string
    description: string
    type: string
    technologies: string[]
}

gsap.registerPlugin(ScrollTrigger)

const ProjetCard = ({
    image,
    index,
    total,
    title,
    description,
    type,
    technologies
}: ProjetCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<ProjetInfoRef>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            const digit1 = counterRef.current?.counter.digit1
            const digit2 = counterRef.current?.counter.digit2
            const digit3 = counterRef.current?.counter.digit3
            const digit4 = counterRef.current?.counter.digit4
            const slash = counterRef.current?.counter.slash

            gsap.set(digit1!, { y: 128 })
            gsap.set(digit2!, { y: -128 })
            gsap.set(digit3!, { y: -128 })
            gsap.set(digit4!, { y: 128 })
            gsap.set(".line", { scaleX: 0, transformOrigin: "left" })
            gsap.set(".projet-title", { y: 128 })
            gsap.set(".type-site", { y: 24 })
            gsap.set([".techno-1", ".techno-2", ".techno-3"], { x: 10, opacity: 0 })
            gsap.set(".stack", { scale: 0.7, opacity: 0 })            

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",   // déclenche quand la section entre
                    end: "top 30%",
                    toggleActions: "play none none reverse",                
                },                
            })

            tl.to(digit1!, { y: 0, duration: 1.5, ease: "power4.inOut" }, "0")
            tl.to(digit2!, { y: 0, duration: 1.5, ease: "power4.inOut" }, "0")
            tl.to(digit3!, { y: 0, duration: 1.5, ease: "power4.inOut" }, "0")
            tl.to(digit4!, { y: 0, duration: 1.5, ease: "power4.inOut" }, "0")
            tl.to(slash!, {rotation: 180, duration: 1.5, repeat: -1, ease: "power4.inOut" }, "0")

            tl.to(".type-site", {
                y: 0,
                duration: 1,
                ease: "power4.inOut",                
            }, "0")

            tl.to(".line", {
                scaleX: 1,
                duration: 1,
                ease: "power4.inOut"
            })

            tl.to(
                [".techno-1", ".techno-2", ".techno-3"],
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.inOut",
                    stagger: 0.2
                },
                "<"
            )

            tl.to(".projet-title", {
                y: 0,
                duration: 1,
                ease: "power4.inOut"
            }, "<0.5")

            tl.fromTo(".description",
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power4.inOut" },
                "<0.5"
            )

            tl.to(".stack", {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power4.inOut"
            }, "<0.5")

        }, containerRef)

        return () => ctx.revert()
    }, [])    

    return (
        <div 
            ref={containerRef} 
            className="relative parallax-container overflow-hidden w-full h-svh"
        >
            <div className="parallax-image-wrapper absolute z-0 w-full h-full after:content-[''] after:bg-dark-1/20 after:absolute after:w-full after:h-full after:backdrop-blur-xl">
                <Image src={image} alt='story' fill className='object-cover' />
            </div>
            <div className="absolute top-0 left-0 px-16 py-4 z-10 w-full h-full flex items-start justify-between max-md:px-4 max-md:flex-wrap max-md:gap-6">
                <ProjetInfo
                    ref={counterRef}
                    index={index}
                    total={total}
                    title={title}
                    description={description}
                />
                <ProjetTechStack 
                    type={type}
                    technologies={technologies}
                />
            </div>
        </div>
    )
}

ProjetCard.displayName = 'ProjetCard'

export default ProjetCard