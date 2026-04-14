"use client"

import ProjetCard from '@/components/projet/projetCard'
import ProjetNav from '@/components/projet/projetNav'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

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

const projects = images.map((image, i) => ({
    image,
    title: `Projet ${i + 1}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    type: "Type site",
    technologies: ["Next.Js", "GSAP", "Express.Js"],
}))

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ListeProjet = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [percentage, setPercentage] = useState<number>(0)  
    const sectionRef = useRef<HTMLElement>(null)

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

    useGSAP(() => {
        if (!sectionRef.current) return

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const percent = Math.round(self.progress * 100)
                setPercentage(percent)
            }
        })

        return () => trigger.kill()
    }, [])

    return (
        <section ref={sectionRef} className='relative w-screen min-h-screen'>            
            {projects.map((project, index) => (
                <ProjetCard
                    key={index}                    
                    index={index}
                    total={images.length}
                    {...project}
                />
            ))}
            <ProjetNav
                activeIndex={activeIndex}
                images={images}
                texts={texts}
                colors={colors}
            />
            <div className='pointer-events-none absolute z-1 bg-transparent inset-0 w-full h-full mix-blend-difference'>
                <div className='p-4 sticky top-1/2 -translate-y-1/2 w-full flex items-center justify-between max-[900px]:top-4 max-[900px]:translate-y-0 max-[900px]:justify-end'>
                    <div className='text-lg text-white max-[900px]:hidden'>Section {activeIndex + 1}</div>
                    <div className='text-lg text-white'>{percentage}%</div>
                </div>
            </div>
        </section>
    )
}

export default ListeProjet
