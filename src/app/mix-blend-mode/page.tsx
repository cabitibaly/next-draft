"use client"

import gsap from "gsap";
import { useEffect } from "react";

const MixBlendMode = () => {

    useEffect(() => {
        const drops = gsap.utils.toArray<HTMLElement>(".raindrop");
        
        const shuffled = drops.sort(() => Math.random() - 0.5);
        
        const tl = gsap.timeline({ repeat: -1 });

        shuffled.forEach((drop) => {
            tl.fromTo(
                drop,
                { y: 0, opacity: 0 },
                {
                    y: "100vh",         
                    opacity: 1,
                    duration: gsap.utils.random(1.5, 2.5),
                    ease: "linear",
                }
            );
        });

        return () => {tl.kill();}
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-transparent mix-blend-difference flex items-center justify-center">                  
                <div className="w-full h-full grid grid-cols-12 mix-blend-difference max-md:grid-cols-8">
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30 max-md:hidden"></div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30">
                        <div className="raindrop opacity-0 absolute top-0 right-0 w-0.5 h-2.5 bg-white"></div>
                    </div>
                    <div className="overflow-hidden relative h-screen border-r-[0.75px] border-[#8C8C8C]/30"></div>
                    <div className="overflow-hidden relative h-screen border-none"></div>
                </div>
            </div>
            <div className="w-screen h-screen bg-[#111113] flex items-center justify-center">
                {/* <div className="relative bg-red-300 h-40 flex items-center justify-center">
                    <h1 className="text-white text-4xl mix-blend-difference">
                        HELLO
                    </h1>
                </div> */}
            </div>
            <div className="w-screen h-screen bg-[#EEEEFA] flex items-center justify-center">
                
            </div>
            <div className="w-screen h-screen bg-red-800 flex items-center justify-center">
                
            </div>
        </>
    )
}

export default MixBlendMode
