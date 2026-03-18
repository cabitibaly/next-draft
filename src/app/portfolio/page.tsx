"use client"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ArrowRight, Copyright, X } from "lucide-react"

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
    const textRef = useRef<HTMLSpanElement | null>(null)
    const linesRef = useRef<HTMLDivElement | null>(null)
    const rightRef = useRef<HTMLDivElement | null>(null)
    const leftRef = useRef<HTMLDivElement | null>(null)
    const menuBtnRef = useRef<HTMLDivElement | null>(null)
    const closeRef = useRef<HTMLDivElement | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null) 
    const menuLinesRef = useRef<(HTMLDivElement | null)[]>([])    

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

    const handleMouseEnter = () => {
        if (!textRef.current || !linesRef.current) return
        
        gsap.to(textRef.current, {
            x: -96,            
            opacity: 0,
            duration: 0.5,
            ease: "power4.out"
        })

        gsap.to(linesRef.current, {            
            scaleX: 1,
            transformOrigin: "right",
            duration: 0.5,            
            ease: "power4.out"
        })
    
    }

    const handleMouseLeave = () => {
        if (!textRef.current || !linesRef.current) return

        gsap.to(textRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out"
        })

        gsap.to(linesRef.current, {            
            scaleX: 0.4,
            transformOrigin: "right",
            duration: 0.5,            
            ease: "power4.out"
        })
    }

    useEffect(() => {
        const close = closeRef.current
        const menuBtn = menuBtnRef.current
        const left = leftRef.current
        const right = rightRef.current
        const menu = menuRef.current
        const menuLines = menuLinesRef.current

        if (!close || !menuBtn || !left || !right || !menu || !menuLines) return

        gsap.set([left, right], { scaleY: 0 })
        gsap.set(menu, { display: "none" })
        gsap.set(menuLinesRef.current, { scaleX: 0 })
        gsap.set([".menu_text", ".right-title"], { y: 72 })
        gsap.set([".menu_arrow", ".right-paragraph"], { opacity: 0 })
        gsap.set(".bottom-text", { y: 32 })

        const tl = gsap.timeline({ paused: true, reversed: true });

        tl.to(menu, {
            display: "flex",
            duration: 1,
            ease: "power4.inOut"
        }, 0)

        tl.to(right, {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 1,
            ease: "power4.inOut"
        }, 0)

        tl.to(left, {
            scaleY: 1,
            duration: 1,
            transformOrigin: "top",
            ease: "power4.inOut"
        }, 0)

        menuLines.forEach((line, index) => {
            tl.to([line, ], {
                scaleX: 1,
                duration: 1.25,
                transformOrigin: "left",
                ease: "expo.in",
            }, index * 0.1)                            
        
        })

        tl.to([".menu_text", ".right-title"], {
            y: 0,
            duration: 1,
            ease: "expo.inOut"
        }, 0.5)

        tl.to([".menu_arrow", ".right-paragraph"], {
            opacity: 1,
            duration: 1.5,
            ease: "expo.inOut"
        }, 0.5)

        tl.to(".bottom-text", {
            y: 0,
            duration: 1,
            ease: "expo.inOut"
        }, 0.8)

        const openMenu = () => tl.play()
        const closeMenu = () => tl.reverse()

        menuBtn.addEventListener("click", openMenu)
        close.addEventListener("click", closeMenu)

        return () => {
            menuBtn.removeEventListener("click", openMenu)
            close.removeEventListener("click", closeMenu)
        }

    }, [])

    return (
        <div className="relative w-screen h-screen overflow-hidden flex flex-col"> 
            <div ref={menuBtnRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cursor-pointer overflow-hidden z-30 absolute top-8 right-8 py-1.5 px-3 w-[108px] h-9 bg-[#111113] rounded-[4px] flex items-center justify-end gap-3 border border-dashed border-transparent group transition-all duration-500 ease-out hover:border-[#111113] hover:bg-white">
                <span ref={textRef} className="absolute left-3 text-base font-normal text-white">Menu</span>
                <div ref={linesRef} className="transform origin-right scale-x-40 w-full flex flex-col items-center justify-center gap-1.5">
                    <div className="w-full h-[1px] bg-white transition-all duration-500 group-hover:invert-100"></div>
                    <div className="w-full h-[1px] bg-white transition-all duration-500 group-hover:invert-100"></div>
                </div>
            </div> 
            <div ref={menuRef} className={`fixed top-0 left-0 z-50 w-full h-full items-center justify-center max-lg:flex-col`}>
                <div ref={leftRef} className="w-1/2 scale-y-0 h-full bg-[#F1F1EA] grid grid-rows-4 max-lg:w-full max-lg:h-1/2 max-sm:h-2/5">
                    <div className="p-8 relative w-full flex items-center justify-between group">
                        <div className="z-10 overflow-hidden flex items-center justify-center transform translate-x-0 origin-left transition-all duration-500 group-hover:translate-x-8">
                            <div className="menu_text text-black text-7xl font-medium uppercase max-lg:text-4xl max-sm:text-2xl">Accueil</div>
                        </div> 
                        <div className="z-10 menu_arrow border border-[#111113] rounded-full size-14 bg-transparent flex items-center justify-center max-lg:size-10 max-sm:size-7">
                            <ArrowRight strokeWidth={0.75} color="#111113" className="size-9 -rotate-45 transition-all ease-in-out duration-500 group-hover:rotate-0 max-lg:size-7 max-sm:size-4" />
                        </div>                       
                        <div ref={e => {menuLinesRef.current[0] = e}} className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111113]" />
                        <div className="z-0 absolute left-0 bottom-0 w-full h-full bg-black/10 scale-y-0 transform origin-bottom transition-all duration-500 group-hover:scale-y-100" />
                    </div>
                    <div className="p-8 relative w-full flex items-center justify-between group">                        
                        <div className="overflow-hidden flex items-center justify-center transform translate-x-0 origin-left transition-all duration-500 group-hover:translate-x-8">
                            <div className="menu_text text-black text-7xl font-medium uppercase max-lg:text-4xl max-sm:text-2xl">Projets</div>
                        </div>
                        <div className="z-10 menu_arrow border border-[#111113] rounded-full size-14 bg-transparent flex items-center justify-center max-lg:size-10 max-sm:size-7">
                            <ArrowRight strokeWidth={0.75} color="#111113" className="size-9 -rotate-45 transition-all ease-in-out duration-500 group-hover:rotate-0 max-lg:size-7 max-sm:size-4" />
                        </div>
                        <div className="z-0 absolute left-0 bottom-0 w-full h-full bg-black/10 scale-y-0 transform origin-bottom transition-all duration-500 group-hover:scale-y-100" />
                        <div ref={e => {menuLinesRef.current[1] = e}} className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111113]" />
                    </div>
                    <div className="p-8 relative w-full flex items-center justify-between group">                        
                        <div className="overflow-hidden flex items-center justify-center transform translate-x-0 origin-left transition-all duration-500 group-hover:translate-x-8">
                            <div className="menu_text text-black text-7xl font-medium uppercase max-lg:text-4xl max-sm:text-2xl">A-propos</div>
                        </div>
                        <div className="z-10 menu_arrow border border-[#111113] rounded-full size-14 bg-transparent flex items-center justify-center max-lg:size-10 max-sm:size-7">
                            <ArrowRight strokeWidth={0.75} color="#111113" className="size-9 -rotate-45 transition-all ease-in-out duration-500 group-hover:rotate-0 max-lg:size-7 max-sm:size-4" />
                        </div>
                        <div className="z-0 absolute left-0 bottom-0 w-full h-full bg-black/10 scale-y-0 transform origin-bottom transition-all duration-500 group-hover:scale-y-100" />
                        <div ref={e => {menuLinesRef.current[2] = e}} className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111113]" />
                    </div>
                    <div className="p-8 relative w-full flex items-center justify-between group">                        
                        <div className="overflow-hidden flex items-center justify-center transform translate-x-0 origin-left transition-all duration-500 group-hover:translate-x-8">
                            <div className="menu_text text-black text-7xl font-medium uppercase max-lg:text-4xl max-sm:text-2xl">Contact</div>
                        </div>
                        <div className="z-10 menu_arrow border border-[#111113] rounded-full size-14 bg-transparent flex items-center justify-center max-lg:size-10 max-sm:size-7">
                            <ArrowRight strokeWidth={0.75} color="#111113" className="size-9 -rotate-45 transition-all ease-in-out duration-500 group-hover:rotate-0 max-lg:size-7 max-sm:size-4" />
                        </div>
                        <div className="z-0 absolute left-0 bottom-0 w-full h-full bg-black/10 scale-y-0 transform origin-bottom transition-all duration-500 group-hover:scale-y-100" />
                        <div ref={e => {menuLinesRef.current[3] = e}} className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111113]" />
                    </div>
                </div>
                <div ref={rightRef} className="relative p-6 w-1/2 scale-y-0 h-full bg-[#111113] flex flex-col items-center justify-center gap-10 max-lg:gap-5 max-lg:w-full max-lg:h-1/2 max-sm:h-3/5">
                    <div ref={closeRef} className="cursor-pointer overflow-hidden z-30 absolute top-8 right-8 py-1.5 px-3 w-[108px] h-9 bg-transparent rounded-[4px] flex items-center justify-end gap-3 border border-dashed border-white">
                        <span className="absolute left-3 text-base font-normal text-white">Fermer</span>
                        <X strokeWidth={1} size={24} color="#EEEEF0" />
                    </div>
                    <div className="px-20 w-full flex flex-col items-start justify-center gap-5 max-lg:gap-3 max-md:px-4">
                        <div className="overflow-hidden flex items-center justify-start">
                            <div className="right-title text-4xl text-white font-medium uppercase max-lg:text-2xl">Contact</div>
                        </div>
                        <div className="right-paragraph flex flex-col items-start justify-center gap-1">
                            <p className="text-lg text-white font-medium max-lg:text-base">EMAIL : contact@clement.alexandre.dev</p>
                            <p className="text-lg text-white font-medium max-lg:text-base">TEL : +33 (0)6 00 00 00 00</p>
                        </div>
                    </div>
                    <div className="px-20 w-full flex flex-col items-start justify-center gap-5 max-lg:gap-3 max-md:px-4">
                        <div className="overflow-hidden flex items-center justify-start">
                            <div className="right-title text-4xl text-white font-medium uppercase max-lg:text-2xl">Localisation</div>
                        </div>
                        <div className="right-paragraph flex flex-col items-start justify-center gap-1">
                            <p className="text-lg text-white font-medium uppercase max-lg:text-base">Bobo-Dioulasso,</p>
                            <p className="text-lg text-white font-medium uppercase max-lg:text-base">Burkina Faso, Afrique-Ouest</p>
                        </div>
                    </div>
                    <div className="px-6 absolute bottom-6 w-full flex items-center justify-between gap-4">
                        <div className="overflow-hidden flex items-center justify-center">
                            <div className="bottom-text flex items-center justify-center gap-1">
                                <Copyright strokeWidth={1} size={20} color="#EEEEF0" />
                                <span className="text-base text-white font-medium hidden max-md:block">2026</span>
                                <span className="text-base text-white font-medium max-md:hidden">2026, tous les droits réservés</span>
                            </div>                            
                        </div>
                        <div className="overflow-hidden flex items-center justify-center">
                            <div className="bottom-text text-base text-white font-medium">11:37:06 AM, UTC </div>
                        </div>
                    </div>
                </div>
            </div>              
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