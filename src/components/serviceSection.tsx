"use client"
import { useEffect, useRef } from "react"
import ServiceCard from "./cards/serviceCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
    {
        titre: "Développement web et mobile",
        image: "/asus.jpg"
    },
    {
        titre: "Audit et conception de réseau",
        image: "/asus.jpg"
    },
    {
        titre: "Maintenance informatique",
        image: "/asus.jpg"
    }
]

const ServiceSection = () => {
    const sercicesCardRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const servicesCards = sercicesCardRef.current

        if (!servicesCards) return

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

        servicesCards.forEach((card, index) => {
            if (!card) return

            gsap.fromTo(
                card,
                {scale: 0, opacity: 0, transformOrigin: "center center"},
                {
                    scale: 1, 
                    opacity: 1, 
                    transformOrigin: "center center", 
                    delay: index * 0.2,
                    duration: 0.8, 
                    ease: "power2.inOut",  
                    stagger: 0.2,                  
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                        toggleActions: "play none none reverse",                        
                    }
                }
            )
        })

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    }, [])

    return (
        <section className="relative overflow-hidden bubble-bg px-[100px] py-16 w-screen flex flex-col items-center justify-start gap-12 max-896:px-4 max-md:py-8">
            <h2 className="text-5xl text-gris-12 text-center font-medium">Nos Services</h2>
            <div className="w-full flex flex-col items-center justify-start gap-8 max-md:gap-8">
                {
                    services.map((service, index) => (
                        <ServiceCard 
                            ref={el => {sercicesCardRef.current[index] = el}}
                            key={index} 
                            titre={service.titre} 
                            image={service.image} 
                        />
                    ))
                }                            
            </div>
        </section>
    )
}

export default ServiceSection
