"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Methode = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".item")
            
            items.forEach((item, index) => {
                if (index !== 0) {
                gsap.set(item, { yPercent: 100 })
                }
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: `+=${items.length * 100}%`,
                    scrub: 1,
                },
                defaults: { ease: "none" }
            })

            items.forEach((item, index) => {
                tl.to(item, {
                    scale: 0.9,
                    borderRadius: "20px",
                })

                if (items[index + 1]) {
                    tl.to(
                        items[index + 1],
                        {
                            yPercent: 0,
                        },
                        "<"
                    )
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="p-20 bg-[#111113] w-screen h-screen overflow-hidden relative flex flex-col items-center justify-start gap-20">
            <div className="w-4/5 h-3/5 flex shadow-xl overflow-hidden bg-red-400">

            </div>
            <div className="relative overflow-hidden w-full h-full flex items-center justify-center">                
                <div className="item absolute w-4/5 h-full flex shadow-xl overflow-hidden bg-stone-400">

                </div>                
                <div className="item absolute w-4/5 h-full flex shadow-xl overflow-hidden bg-purple-400">
                    
                </div>
                <div className="item absolute w-4/5 h-full flex shadow-xl overflow-hidden bg-teal-400">
                    
                </div>
            </div>
        </div>
    )
}

export default Methode