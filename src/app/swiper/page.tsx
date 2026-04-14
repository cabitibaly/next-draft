"use client"
import { use, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const images = [
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164172/support_1_klgj6h.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164179/gs_1_xat3tk.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164131/sekosmetics_1_qvnh7f.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164180/pwt_1_cxpeyb.webp",
    "https://res.cloudinary.com/dadbkjo4m/image/upload/v1776164178/attendify_1_wdlkvd.webp",
]

const Home = () => {
    const [progressValue, setProgressValue] = useState(0);    
    const containerRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef<boolean>(false)      
    const swiperRef = useRef<SwiperType | null>(null)
    const directionRef = useRef<"next" | "prev" | "none">("none")  

    const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
        setProgressValue(1 - progress);        
    };                   

    const handleSlideChange = (swiper: SwiperType) => {            
        
        if(directionRef.current === "next") {            
            nextSlide(false)
            directionRef.current = "none"
            return         
        }
        if(directionRef.current === "prev") {            
            prevSlide()
            directionRef.current = "none"
            return
        }        

        nextSlide(swiper.realIndex === 0)
    }

    function nextSlide(firstRender = true) {

        if (firstRender) return

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

    return (
        <div className='bg-neutral-900 w-screen h-screen relative flex flex-col items-center justify-center'>  
            <div className='relative w-full h-1/2 bg-[#F1F1EA]'>
                <Image src={"/noise.png"} alt='story' fill className='object-cover' />
                <Image src={"/noise.png"} alt='story' fill className='absolute top-0 left-0 object-cover opacity-30' />
            </div>
            <div className='w-full h-1/2 relative overflow-hidden'>
                <div ref={containerRef} className='w-full h-full relative overflow-hidden'>
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full after:content-[''] after:absolute after:w-full after:h-full after:backdrop-blur-xs"
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
                <div className='nav-swiper z-10 bg-[#111113]/50 backdrop-blur-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='z-10 border border-white nav-swiper-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className='z-50 progress-bar'>
                            <div className='h-full bg-white rounded-full transition ease-linear' style={{ width: `${progressValue * 100}%` }}></div>
                        </div>
                    </div>
                    <Swiper
                        allowTouchMove={false}
                        spaceBetween={0}
                        centeredSlides={true}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={handleSlideChange}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,                            
                        }}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className="h-full w-full flex items-center justify-center overflow-hidden"
                        slidesPerView={'auto'}
                        onNavigationNext={() => nextSlide(false)}
                        onNavigationPrev={() => prevSlide()}                                                                       
                    >
                        {
                            images.map((src, i) => (
                                <SwiperSlide key={i} className=''>
                                    <Image src={src} alt='story' fill className='inner-slide object-cover' />
                                </SwiperSlide>
                            ))
                        }                        
                    </Swiper>
                </div>
                <div className='z-10 border border-gray-50/5 bg-[#111113]/50 overflow-hidden p-2 rounded-lg backdrop-blur-lg absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between gap-4'>
                    <button 
                        onClick={() => {
                            directionRef.current = "prev"
                            swiperRef.current?.slidePrev()
                        }} 
                        className="btn-prev"
                    >
                        <ArrowLeft strokeWidth={1.25} className='stroke-white size-6' />
                    </button>
                    <span className='text-xl text-white font-normal'>Projets</span>
                    <button 
                        onClick={() => {
                            directionRef.current = "next"
                            swiperRef.current?.slideNext()
                        }} 
                        className="btn-next"
                    >
                        <ArrowRight strokeWidth={1.25} className='stroke-white size-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home