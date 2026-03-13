"use client"
import Image from "next/image"
import Link from "next/link"
import NavigationLink from "./navigationLink"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const Navbar = () => {  
    const [isOpen, setIsOpen] = useState(false)  
    const menuRef = useRef<HTMLDivElement>(null)
    const bouttonRef = useRef<HTMLButtonElement>(null)
    const crossRef = useRef<HTMLButtonElement>(null)
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        if(isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

    }, [isOpen])

    useEffect(() => {
        const btn = bouttonRef.current
        const menu = menuRef.current
        const cross = crossRef.current

        if (!btn || !menu || !cross) return

        const tl = gsap.timeline({paused: true, reversed: true})
        
            tl.to("#bubble-nav", {
                scale: 24,
                duration: 0.3,
                ease: "sine.inOut"
            }).to(menu, {
                scaleX: 1,
                duration: 0.1
            }).fromTo(
                "#text-1",
                {opacity: 0, y: 20, duration: 0.4, display: "none"},
                {opacity: 1, y: 0, duration: 0.4, display: "block"},
            ).fromTo(
                "#text-2",
                {opacity: 0, y: 20, duration: 0.4, display: "none"},
                {opacity: 1, y: 0, duration: 0.4, display: "block"},
            ).fromTo(
                "#text-3",
                {opacity: 0, y: 20, duration: 0.4, display: "none"},
                {opacity: 1, y: 0, duration: 0.4, display: "block"},
            ).fromTo(
                "#text-4",
                {opacity: 0, y: 20, duration: 0.4, display: "none"},
                {opacity: 1, y: 0, duration: 0.4, display: "block"},
            ).fromTo(
                "#text-5",
                {opacity: 0, y: 20, duration: 0.4, display: "none"},
                {opacity: 1, y: 0, duration: 0.4, display: "block"},
            )
            
        const open = () => tl.play()
        const close = () => tl.reverse()

        btn.addEventListener("click", open)
        cross.addEventListener("click", close)

        return () => {
            btn.removeEventListener("click", open)
            cross.removeEventListener("click", close)
        }

    }, [])

    useEffect(() => {
        const nav = navRef.current

        if (!nav) return

        gsap.fromTo(
            nav,
            {scale: 0, opacity: 0, transformOrigin: "center center"},
            {scale: 1, opacity: 1, transformOrigin: "center center", duration: 1, ease: "power2.inOut"}
        )

    }, [])

    return (
        <>
            <nav
                ref={navRef} 
                className="
                    scale-0 border border-bleu-1/40 bg-gris-8/10 backdrop-blur-[35px] px-8 py-3 fixed z-50 top-12 left-1/2 -translate-1/2
                    w-4/5 rounded-full flex items-center justify-between gap-8 max-lg:w-[90%] max-md:w-full max-md:top-0 max-md:translate-0 max-md:left-0
                    max-md:rounded-none max-md:py-4 max-md:border-x-0 max-md:border-t-0
                "
            >        
                <div className="relative flex items-center justify-center aspect-5-1 w-[150px] max-896:w-[115px]">
                    <Image src={"/powertech.png"} fill alt="logo powertech" className="w-full aspect-5-1" />
                </div>
                <ul className="flex items-center justify-between gap-8 max-896:gap-6 max-md:hidden">
                    <NavigationLink index="1" name="Accueil" href="/" />
                    <NavigationLink index="2" name="Services" href="/services" />
                    <NavigationLink index="3" name="Projets" href="/projets" />
                    <NavigationLink index="4" name="À propos" href="/a-propos" />
                    <NavigationLink index="5" name="Contact" href="/contact" />
                </ul>
                <button ref={bouttonRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer hidden items-center justify-center max-md:flex">                
                    <Menu strokeWidth={1.5} className="stroke-gris-12 size-8 max-md:block" />
                </button>            
                
            </nav>
            <div className=" fixed inset-0 overflow-hidden z-[60] pointer-events-none">
                <div id="bubble-nav" className="scale-0 absolute top-0 right-3 rounded-full size-20 bg-gris-1 pointer-events-auto flex items-center justify-center">                        
                </div>
            </div>
            <div ref={menuRef} className={`overflow-x-auto scale-x-0 p-4 fixed z-[70] top-0 left-0 w-screen h-screen bg-gris-1 flex flex-col items-center justify-between gap-4 min-md:hidden`}>
                <div className="w-full flex justify-end">
                    <button ref={crossRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                        <X strokeWidth={1} className="stroke-gris-12 size-16"/>
                    </button>                                                
                </div>
                <ul className="w-full min-h-[400px] flex flex-col items-center justify-start gap-10">
                    <NavigationLink index="1" name="Accueil" href="/" />
                    <NavigationLink index="2" name="Services" href="/services" />
                    <NavigationLink index="3" name="Projets" href="/projets" />
                    <NavigationLink index="4" name="À propos" href="/a-propos" />
                    <NavigationLink index="5" name="Contact" href="/contact" />
                </ul>
                <div className="w-full flex items-center justify-between gap-6 flex-wrap">
                    <Link href={"/"} className="text-lg text-gris-8 font-normal">
                        Facebook
                    </Link>
                    <Link href={"/"} className="text-lg text-gris-8 font-normal">
                        WhatsApp
                    </Link>
                    <Link href={"/"} className="text-lg text-gris-8 font-normal">
                        TikTok
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
