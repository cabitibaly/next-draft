"use client"
import Navbar from "@/components/navigation/navbar"
import ServiceSection from "@/components/serviceSection"
import gsap from "gsap"
import { useEffect, useRef } from "react"

const Pwt = () => {
    const heroTextRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const heroText = heroTextRef.current

        if (!heroText) return

        gsap.fromTo(
            heroText,
            {scale: 0, opacity: 0, transformOrigin: "center center"},
            {scale: 1, opacity: 1, transformOrigin: "center center", delay: 1, duration: 1, ease: "power2.inOut"}
        )

    }, [])
    
    return (
        <>
            <div style={{background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hand.png')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className="overflow-hidden bg-blue-200 w-screen h-screen flex flex-col items-center justify-center gap-20">                
                <Navbar />
                <div className="fixed inset-0 overflow-hidden z-20 pointer-events-none">
                    <div id="bubble" className="scale-0 absolute top-5 right-20 rounded-full size-20 bg-red-400 pointer-events-auto flex items-center justify-center">                        
                    </div>
                </div>
                <div ref={heroTextRef} className="scale-0 w-3/4 flex items-center justify-center">
                    <h1 className="text-white text-center text-2xl md:text-8xl">
                        TRANSFORMING
                        FINANCIAL LANDSCAPES
                        INTO REAL ESTATE
                    </h1>
                </div>
            </div>
            <ServiceSection />
        </>
    )
}

export default Pwt
