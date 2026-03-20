"use client"

import gsap from "gsap"
import Image from "next/image"
import { useRef, useState } from "react"


function Service() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const firstRef = useRef<HTMLDivElement>(null)
    const secondRef = useRef<HTMLDivElement>(null)
    const thirdRef = useRef<HTMLDivElement>(null)
    const detailRef1 = useRef<HTMLDivElement>(null)
    const detailRef2 = useRef<HTMLDivElement>(null)
    const detailRef3 = useRef<HTMLDivElement>(null)
    
    const onMouseEnter = (index: number) => {
        const refs = [firstRef, secondRef, thirdRef]
        const images = [".img-1", ".img-2", ".img-3"]
        const details = [".detail-1", ".detail-2", ".detail-3"]
        setActiveIndex(index)

        refs.forEach((ref, i) => {
            gsap.to(ref.current, {
                width: i === index ? "80%" : "10%",
                ease: "power4.inOut",
                duration: 0.5,
            }) 
            
            if (i === index ) {
                gsap.to(details[i], {
                    delay: 0.3,
                    zIndex: 20,
                    scaleX: 1,
                    transformOrigin: "left",
                    ease: "power4.inOut",
                    duration: 0.5,
                })

                gsap.fromTo(`${details[i]} .right-side`, 
                    {
                        opacity: 0,
                        scale: 0
                    },
                    {
                        delay: 0.5,
                        opacity: 1,
                        scale: 1,
                        ease: "power4.inOut",
                        duration: 0.5,
                    }
                )
            } else {
                gsap.to(details[i], {
                    delay: 0.3,
                    zIndex: 0,
                    scaleX: 0,
                    transformOrigin: "left",
                    ease: "power4.inOut",
                    duration: 0.5,
                })
            }
        })

        images.forEach((img, i) => {
            gsap.to(img, {
                opacity: 0,
                ease: "power4.inOut",
                duration: 0.5,
                onComplete: () => {
                    i === index ? document.querySelector(img)?.classList.add("hidden") : ""
                }
            })
        })



        // details.forEach((detail, i) => {
        //     gsap.to(detail, {
        //         delay: 0.3,
        //         zIndex: i === index ? 20 : 0,
        //         scaleX: i === index ? 1 : 0,
        //         transformOrigin: "left",
        //         ease: "power4.inOut",
        //         duration: 0.5,
        //     })
        // })
    }


    const onMouseLeave = () => {
        gsap.to([firstRef.current, secondRef.current, thirdRef.current], {
            width: "33.333333%",
            ease: "power4.inOut",
            duration: 0.5,
        })

        gsap.to([".img-1", ".img-2", ".img-3"], {
            display: "flex",
            opacity: 1,
            ease: "power4.inOut",
            duration: 0.5,
        })

        gsap.to([".left-side", ".right-side"], {
            opacity: 0,
        })

        gsap.to([".detail-1", ".detail-2", ".detail-3"], {
            zIndex: 0,
            scaleX: 0,
            transformOrigin: "left",
            ease: "power4.inOut",
            duration: 0.5,
        })        

        setActiveIndex(null)
    }

    return (
        <div className='px-20 bg-[#111113] w-screen h-screen flex items-center justify-center gap-4'>
            <div onMouseEnter={() => onMouseEnter(0)} onMouseLeave={() => onMouseLeave()}  ref={firstRef} className='relative group border border-white p-4 w-1/3 h-3/5 overflow-hidden rounded-2xl flex flex-col items-center justify-end'>
                <div className="detail-1 absolute bottom-0 bg-[#111113] z-0 p-4 w-full h-full border border-red-400 scale-x-0 flex items-center jusfiy-center gap-4">
                    <div className="left-side border border-amber-300 w-3/5 h-full  opacity-1">

                    </div>
                    <div className="right-side relative w-2/5 h-full">                        
                        <Image src={"/service-img-1.png"} alt="service-img" fill className="object-cover" />
                    </div>
                </div>                
                <div className="img-1 relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                    <Image src={"/service-img-1.png"} alt="service-img" fill className="object-cover" />
                </div>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                        whitespace-nowrap uppercase group-hover:scale-0 z-10
                        ${activeIndex === 0 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-16"}
                    `}
                >
                    WEB DESIGN
                </div>             
            </div>
            <div onMouseEnter={() => onMouseEnter(1)} onMouseLeave={() => onMouseLeave()} ref={secondRef} className='relative group border border-white p-4 w-1/3 h-3/5 rounded-2xl overflow-hidden flex flex-col items-center justify-end'>
                <div className="detail-2 absolute bottom-0 bg-[#111113] z-0 w-full h-full border border-red-400 scale-x-0">
                </div>
                <div className="img-2 relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                    <Image src={"/service-img-2.png"} alt="service-img" fill className="object-cover" />
                </div>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                       whitespace-nowrap uppercase group-hover:scale-0
                        ${activeIndex === 1 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-28"}
                    `}
                >
                    Développement web
                </div>
            </div>
            <div onMouseEnter={() => onMouseEnter(2)} onMouseLeave={() => onMouseLeave()} ref={thirdRef} className='relative group border border-white p-4 w-1/3 h-3/5 rounded-2xl overflow-hidden flex flex-col items-center justify-end'>
                <div className="detail-3 absolute bottom-0 bg-[#111113] z-0 w-full h-full border border-red-400 scale-x-0">
                </div>
                <div className="img-3 relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                    <Image src={"/service-img-3.png"} alt="service-img" fill className="object-cover" />
                </div>
                <div
                    className={`
                        text-xl text-white transition-all duration-500
                       whitespace-nowrap uppercase group-hover:scale-0
                        ${activeIndex === 2 || activeIndex === null ? "rotate-0" : "-rotate-90 -translate-y-32"}
                    `}
                >
                    Développement Mobile
                </div>
            </div>
        </div>
    )
}

export default Service
