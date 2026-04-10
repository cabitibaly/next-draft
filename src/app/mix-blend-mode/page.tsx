"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP)

const texts = ["Black", "White", "Red"]

const MixBlendMode = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const blackRef = useRef<HTMLDivElement>(null)
    const whiteRef = useRef<HTMLDivElement>(null)
    const redRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)    
    const [percentage, setPercentage] = useState<number>(0)

    useEffect(() => {
        const drops = gsap.utils.toArray<HTMLElement>(".raindrop");
        
        const shuffled = drops.sort(() => Math.random() - 0.5);
        
        const tl = gsap.timeline({ repeat: -1 });

        shuffled.forEach((drop) => {
            tl.fromTo(
                drop,
                { y: 0, opacity: 0 },
                {
                    y: "100vh",         
                    opacity: 1,
                    duration: gsap.utils.random(1.5, 2.5),
                    ease: "linear",
                }
            );
        });

        return () => {tl.kill();}
    }, []);

    useGSAP(() => {

        const colors = [blackRef.current, whiteRef.current, redRef.current]

        colors.forEach((color, index) => {
            if (!color) return

            ScrollTrigger.create({
                trigger: color,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index)
            })
        })

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                setPercentage(Math.round(self.progress * 100))
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }

    }, []) 
    
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current, 
                { y: 64, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
        })

        return () => ctx.revert()
    }, [activeIndex])

    return (
        <section ref={sectionRef} className="relative w-screen min-h-screen">
            <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-transparent mix-blend-difference flex items-center justify-center">                  
                <div className="w-full h-full grid grid-cols-12 mix-blend-difference max-md:grid-cols-8">
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-none"></div>
                </div>
            </div>
            <div ref={blackRef} className="w-screen h-screen bg-[#111113] flex items-center justify-center">
            </div>
            <div ref={whiteRef} className="w-screen h-screen bg-[#EEEEFA] flex items-center justify-center">                
            </div>
            <div ref={redRef} className="w-screen h-screen bg-[#FF0000] flex items-center justify-center">
            </div>
            <div className="z-2 relative w-screen h-screen bg-green-500 flex items-center justify-center">
            </div>

            <div className='absolute z-1 bg-transparent inset-0 w-full h-full mix-blend-difference'>
                <div className='p-4 sticky top-1/2 -translate-y-1/2 w-full flex items-center justify-between max-[900px]:top-4 max-[900px]:translate-y-0 max-[900px]:justify-end'>
                    <div className="overflow-hidden">
                        <div ref={textRef} className='text-lg text-white max-[900px]:hidden'>{texts[activeIndex]}</div>
                    </div>                    
                    <div className='text-lg text-white'>{percentage}%</div>
                </div>
            </div>
        </section>
    )
}

export default MixBlendMode
