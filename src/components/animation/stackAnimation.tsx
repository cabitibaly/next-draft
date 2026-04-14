"use client"

import gsap from "gsap"
import { ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"

const images = [
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164172/support_1_klgj6h.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164168/support_2_cfephq.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164171/support_3_voek9c.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164174/support_4_nt7bjw.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164169/support_5_rl8vul.webp",
]

const StackAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef<boolean>(false)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

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
        <div ref={containerRef} className="stack w-3/4 opacity-0 aspect-[1.56] relative flex items-center justify-center max-xl:w-[85%] max-md:w-3/5">
            <PhotoProvider
                toolbarRender={({ onScale, scale }) => {
                    return (
                    <>
                        <ZoomIn strokeWidth={1.25} className="size-5" onClick={() => onScale(scale + 1)} />
                        <ZoomOut strokeWidth={1.25} className="size-5" onClick={() => onScale(scale - 1)} />
                    </>
                    );
                }}
            >
                <PhotoView src={images[0]}>
                    <div className="img-0 opacity-0 absolute -top-12 w-[80%] h-full rounded-2xl overflow-hidden blur-[6px]">
                        <Image src={images[0]} alt='story' fill className='object-cover' />
                    </div>
                </PhotoView>
                <PhotoView src={images[1]}>
                    <div className="img-1 absolute -top-12 w-[80%] h-full rounded-2xl overflow-hidden blur-[6px]">
                        <Image src={images[1]} alt='story' fill className='object-cover' />
                    </div>
                </PhotoView>
                <PhotoView src={images[2]}>
                    <div className="img-2 absolute -top-6 w-[80%] h-full rounded-2xl overflow-hidden blur-xs">
                        <Image src={images[2]} alt='story' fill className='object-cover' />
                    </div>
                </PhotoView>
                <PhotoView src={images[3]}>
                    <div className="img-3 absolute top-0 w-[90%] h-full rounded-2xl overflow-hidden blur-none">
                        <Image src={images[3]} alt='story' fill className='object-cover' />
                    </div> 
                </PhotoView>
                <PhotoView src={images[4]}>
                    <div className="img-4 absolute top-0 w-full h-full rounded-2xl overflow-hidden blur-none">
                        <Image src={images[4]} alt='story' fill className='object-cover' />
                    </div> 
                </PhotoView>
            </PhotoProvider>                   
        </div>
    )
}

export default StackAnimation
