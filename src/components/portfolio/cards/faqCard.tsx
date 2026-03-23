"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const FaqCard = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const answerRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        const container = containerRef.current
        const answer = answerRef.current

        if (!container || !answer) return

        let xTo = gsap.quickTo(answer, "x", { duration: 0.3, ease: "power3" })
        let yTo = gsap.quickTo(answer, "y", { duration: 0.3, ease: "power3" })

        const move = (e: MouseEvent) => {
            const rect = answer.getBoundingClientRect()

            xTo(e.clientX - rect.width / 2)
            yTo(e.clientY - rect.height / 2)
        }

        const enter = () => {
            document.body.style.cursor = "none"
            gsap.to(answer, { scale: 1, opacity: 1, duration: 0.3 })
        }

        const leave = () => {
            document.body.style.cursor = "auto"
            gsap.to(answer, { scale: 0, opacity: 0, duration: 0.2 })
        }

        container.addEventListener("mousemove", move)
        container.addEventListener("mouseenter", enter)
        container.addEventListener("mouseleave", leave)

        return () => {
            container.removeEventListener("mousemove", move)
            container.removeEventListener("mouseenter", enter)
            container.removeEventListener("mouseleave", leave)
        }
    }, [])

    return (
        <div ref={containerRef} className="relative group w-full py-8 border-t border-white flex items-center justify-start">
            <p className="text-4xl text-white font-medium uppercase">Lorem ipsum dolor sit amet, consectetur ?</p>
            <div className="absolute bottom-0 w-full h-full bg-gray-300/30 transform origin-bottom scale-y-0 transition-all duration-500 group-hover:scale-y-100"></div>
            <div ref={answerRef} className="pointer-events-none fixed top-0 left-0 z-50 px-8 py-4 max-w-[600px] bg-white text-black rounded-lg shadow-lg opacity-0 scale-0 flex flex-col items-center-start justify-center gap-4">
                <h3 className="text-3xl text-left text-black font-medium uppercase">Lorem ipsum dolor sit amet, consectetur ?</h3>
                <p className="text-base text-left text-black font-normal uppercase">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
        </div>
    )
}

export default FaqCard
