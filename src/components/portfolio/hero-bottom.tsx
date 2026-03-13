"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const images = [
    "/story-1.webp",
    "/story-2.webp",
    "/story-3.webp",
    "/story-4.webp",
    "/story-5.webp",
]

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef<boolean>(false)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    function nextSlide() {

        if (isAnimating.current) return

        const slides = containerRef.current?.children
        if (!slides || slides.length < 2) return

        const current = slides[0] as HTMLElement
        const next = slides[1] as HTMLElement

        isAnimating.current = true

        gsap.set(next, {
            zIndex: 2,
            clipPath: "polygon(100% 0%,100% 0%,100% 100%,100% 100%)"
        })

        const tl = gsap.timeline({
            onComplete: () => {
                containerRef.current?.appendChild(current)

                gsap.set(current, {
                    zIndex: 0,
                    scale: 1,
                    rotate: 0
                })

                gsap.set(next, { zIndex: 1 })

                isAnimating.current = false
            }
        })

        tl.to(next, {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            duration: 1,
            ease: "power4.inOut"
        })

        tl.fromTo(
            current,
            { scale: 1, rotate: 0 },
            {
                scale: 2,
                rotate: -8,
                duration: 1,
                ease: "power4.inOut",
            },
            0
        )

        tl.fromTo(
            next,
            { scale: 2, rotate: 8 },
            {
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: "power4.inOut",
            },
            0
        )
    }

    function prevSlide() {

        if (isAnimating.current) return

        const slides = containerRef.current?.children
        if (!slides || slides.length < 2) return

        const last = slides[slides.length - 1] as HTMLElement
        const current = slides[0] as HTMLElement

        isAnimating.current = true

        containerRef.current?.prepend(last)        

        gsap.set(last, {
            zIndex: 2,
            clipPath: "polygon(0% 0%,0% 0%,0% 100%,0% 100%)",
            scale: 1.2,
            rotate: -8
        })

        const tl = gsap.timeline({
            onComplete: () => {

                gsap.set(last, { zIndex: 1 })
                gsap.set(current, { zIndex: 0 })

                isAnimating.current = false
            }
        })

        tl.to(last, {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "power3.inOut"
        })

        tl.to(
            current,
            {
                scale: 1.2,
                rotate: 8,
                duration: 0.8,
                ease: "power3.inOut"
            },
            0
        )
    }

    // AUTOPLAY
    useEffect(() => {

        autoplayRef.current = setInterval(() => {
            nextSlide()
        }, 4000)

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }

    }, [])

    // Reset autoplay si clic
    function handleClick() {

        if (autoplayRef.current) {
            clearInterval(autoplayRef.current)
        }

        nextSlide()

        autoplayRef.current = setInterval(() => {
            nextSlide()
        }, 4000)
    }

    return (

      <div className="relative w-screen h-screen overflow-hidden flex flex-col">
        <div className="w-full bg-black h-1/2"></div>
        <div ref={containerRef} className="relative overflow-hidden inset-0 h-1/2">

            {images.map((src, i) => (
                <div
                    key={i}
                    className="absolute inset-0"
                    style={{ zIndex: i === 0 ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt="story"
                        fill
                        className="object-cover"
                    />
                </div>
            ))}

        </div>

        <button
            onClick={prevSlide}
            className="z-10 absolute bottom-10 left-10 bg-black text-white px-4 py-2"
        >
            Prev
        </button>
        <button
            onClick={handleClick}
            className="z-10 absolute bottom-10 left-32 bg-black text-white px-4 py-2"
        >
            Next
        </button>

      </div>
    )
}