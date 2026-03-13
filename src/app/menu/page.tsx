"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Menu = () => {
    const menuBurgerRef = useRef<HTMLDivElement>(null)
    // const crossRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)    
    const [isMove, setIsMove] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)
    const menu1Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const menuBurger = menuBurgerRef.current
        // const cross = crossRef.current
        const menu = menuRef.current

        if (!menuBurger  || !menu) return

        const tl = gsap.timeline({paused: true, reversed: true})

        tl.to("#middle", {
            scaleX: 0,
            duration: .3,
            ease: "power1.inOut"
        }).to("#top", {
            scaleX: 0,
            duration: .3,
            ease: "power1.inOut"
        }).to("#bottom", {
            scaleX: 0,
            duration: .3,
            ease: "power1.inOut"
        }).to(menu, {      
            scaleX: 1,
            transformOrigin: "left right",
            delay: .3,
            duration: 0.8,
            ease: 'power3.out',
            display: 'flex'
        }).to("#left-cross", {
            scaleX: 1,
            rotation: 45,
            duration: .3,
            ease: "power1.inOut"
        }).to("#right-cross", {
            scaleX: 1,
            rotation: -45,
            duration: .3,
            ease: "power1.inOut"
        });

        const openMenu = () => tl.play()
        // const closeMenu = () => tl.reverse()

        menuBurger.addEventListener("click", openMenu)
        // cross.addEventListener("click", closeMenu)

        return () => {
            menuBurger.removeEventListener("click", openMenu)
            // cross.removeEventListener("click", closeMenu)
        }

    }, [])

    useEffect(() => {
        const btn = btnRef.current
        const menu1 = menu1Ref.current

        if (!btn || !menu1) return

        const tl = gsap.timeline({paused: true, reversed: true})
        
            tl.to("#bubble", {
                scale: 24,
                duration: 0.5,
                ease: "sine.inOut"
            }).to("#menu", {
                scaleX: 1,
                duration: 0.1
            }).fromTo(
                "#text-1",
                {opacity: 0, y: 20, duration: 0.5, display: "none"},
                {opacity: 1, y: 0, duration: 0.5, display: "block"},
            ).fromTo(
                "#text-2",
                {opacity: 0, y: 20, duration: 0.5, display: "none"},
                {opacity: 1, y: 0, duration: 0.5, display: "block"},
            ).fromTo(
                "#text-3",
                {opacity: 0, y: 20, duration: 0.5, display: "none"},
                {opacity: 1, y: 0, duration: 0.5, display: "block"},
            )
            
        const open = () => tl.play()
        const close = () => tl.reverse()

        btn.addEventListener("click", open)
        menu1.addEventListener("click", close)

        return () => {
            btn.removeEventListener("click", open)
            menu1.removeEventListener("click", close)
        }

    }, [])

    return (
        <section className='overflow-hidden'>
            <nav className="overflow-hidden fixed top-0 left-0 z-40 w-full flex items-center justify-between py-4 px-16 bg-transparent">
                <Image src="/logo.png" alt="logo" width={150} height={50} className="cursor-pointer" />
                <div ref={menuBurgerRef} className="cursor-pointer rounded-lg px-4 py-2 flex items-center justify-center flex-col gap-4">
                  <hr id="top" className="w-24 text-white" />
                  <hr id="middle" className="w-24 text-white" />
                  <hr id="bottom" className="w-24 text-white" />
                </div>
            </nav>
            <div style={{background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hand.png')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className="overflow-hidden bg-blue-200 w-screen h-screen flex flex-col items-center justify-center gap-20">                
                <div className="fixed inset-0 overflow-hidden z-20 pointer-events-none">
                    <div id="bubble" onClick={() => setIsMove(!isMove)} className="scale-0 absolute top-5 right-20 rounded-full size-20 bg-red-400 pointer-events-auto flex items-center justify-center">                        
                    </div>
                </div>
                <div ref={menu1Ref} id='menu' className='scale-x-0 p-16 bg-transparent fixed top-0 left-0 z-50 w-screen h-screen flex flex-col items-center justify-center gap-10'>
                    <div className='min-h-48 flex flex-col items-center justify-start gap-6'>
                        <span id='text-1' className='text-5xl text-gray-50 font-light'>Accueil</span>
                        <span id='text-2' className='text-5xl text-gray-50 font-light'>Service</span>
                        <span id='text-3' className='text-5xl text-gray-50 font-light'>Projet</span>                        
                    </div>                    
                </div>
                <button ref={btnRef} className="px-8 py-2 w-40 bg-vert rounded-lg text-white text-2xl cursor-pointer flex items-center justify-center">left</button>
            </div>
        </section>
    )
}

export default Menu
