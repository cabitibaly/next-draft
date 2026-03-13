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

    // const nextSlide = () => {
    //     if (!containerRef.current) return

    //     const slides = Array.from(containerRef.current.children)

    //     const first = slides[0]
    //     const second = slides[1]
    //     const third = slides[2]

    //     isAnimating.current = true

    //     const tl = gsap.timeline({
    //         onComplete: () => {
    //             containerRef.current?.prepend(third)
    //             isAnimating.current = false
    //         }
    //     })

    //     tl.to(second, {
    //         zIndex: 2,
    //         width: "100%",
    //         top: "0px",
    //         filter: "blur(0px)",
    //         duration: 1,
    //         ease: "power4.inOut"
    //     }, 0)

    //     tl.to(first, {
    //         zIndex: 1,
    //         width: "90%",
    //         top: "-24px",
    //         filter: "blur(4px)",
    //         duration: 1,
    //         ease: "power4.inOut"
    //     }, 0)

    //     tl.to(
    //         third,
    //         {            
    //             zIndex: 0,
    //             width: "80%",
    //             top: "-48px",
    //             filter: "blur(6px)",
    //             duration: 1,
    //             ease: "power4.inOut"
    //         },
    //         0
    //     )
    // }

    const nextSlide = () => {
        if (!containerRef.current || isAnimating.current) return

        const slides = [...containerRef.current.children]

        isAnimating.current = true

        const positions = [
            { zIndex: 1, width: "80%", top: "-48px", filter: "blur(6px)", opacity: 1 },
            { zIndex: 2, width: "90%", top: "-24px", filter: "blur(4px)", opacity: 1 },
            { zIndex: 3, width: "100%", top: "0px", filter: "blur(0px)", opacity: 1 }
        ]

        const tl = gsap.timeline({
            onComplete: () => {
                containerRef.current?.prepend(slides[slides.length - 1])
                isAnimating.current = false
            }
        })

        slides.forEach((slide, index) => {

            if (index < positions.length) {
                tl.to(
                    slide,
                    {
                        ...positions[index],
                        duration: 1,
                        ease: "power4.inOut"
                    },
                    0
                )
            } else {
                tl.to(
                    slide,
                    {
                        opacity: 0,
                        duration: 1,
                        ease: "power4.inOut"
                    },
                    0
                )
            }

        })
    }

    useEffect(() => {

        autoplayRef.current = setInterval(() => {
            nextSlide()
        }, 2000)

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }

    }, [])

    return (
        <div className="relative w-screen h-screen overflow-hidden flex flex-col">                
            <div className="z-10 relative w-full h-full after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xl">
                <Image src={"/story-4.webp"} alt='story' fill className='object-cover' />
            </div>
            <div className="z-20 p-8 absolute top-0 left-0 w-full h-full flex flex-col items-end justify-end max-md:items-center">
                <div ref={containerRef} className="w-[30%] aspect-[1.56] relative flex items-center justify-center max-lg:w-2/5 max-md:w-3/5">                    
                    <div className="img-0 opacity-0 absolute -top-12 w-[80%] h-full rounded-2xl overflow-hidden blur-[6px]">
                        <Image src={"/story-1.webp"} alt='story' fill className='object-cover' />
                    </div>
                    <div className="img-1 absolute -top-12 w-[80%] h-full rounded-2xl overflow-hidden blur-[6px]">
                        <Image src={"/story-2.webp"} alt='story' fill className='object-cover' />
                    </div>
                    <div className="img-2 absolute -top-6 w-[80%] h-full rounded-2xl overflow-hidden blur-[4px]">
                        <Image src={"/story-3.webp"} alt='story' fill className='object-cover' />
                    </div>
                    <div className="img-3 absolute top-0 w-[90%] h-full rounded-2xl overflow-hidden blur-none">
                        <Image src={"/story-4.webp"} alt='story' fill className='object-cover' />
                    </div>                    
                    <div className="img-3 absolute top-0 w-[100%] h-full rounded-2xl overflow-hidden blur-none">
                        <Image src={"/story-5.webp"} alt='story' fill className='object-cover' />
                    </div>                    
                </div>
            </div>
            <button
                onClick={nextSlide}
                className="z-30 cursor-pointer absolute bottom-10 left-32 bg-black text-white px-4 py-2 max-md:hidden"
            >
                Next
            </button>
        </div>
    )
}