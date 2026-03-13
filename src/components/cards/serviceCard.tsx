"use client"
import Image from "next/image"
import Link from "next/link"
import { forwardRef } from "react"

interface ServiceProps {
    titre: string
    image: string
}

// eslint-disable-next-line react/display-name
const ServiceCard = forwardRef<HTMLDivElement, ServiceProps>(
    ({titre, image}, ref) => {
        return (
            <div ref={ref} className="border border-bleu-1/40 p-6 bg-bleu-9/10 backdrop-blur-[35px] rounded-xl w-full flex items-center justify-between gap-8 max-md:gap-4 max-md:flex-col">
                <div className="w-3/5 flex flex-col items-start justify-start gap-4 max-lg:gap-2 max-md:w-full">
                    <span className="text-3xl text-gris-12 text-left font-semibold max-lg:text-xl">{titre}</span>
                    <p className="text-2xl text-gris-12 text-left font-normal max-lg:text-base">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, quod sed, dolorem dolor voluptas, 
                        fugit quae quasi beatae hic esse ipsa vel veritatis quam totam unde pariatur similique laboriosam minus.
                    </p>
                    <Link
                        href={"/contact"} 
                        className="border border-transparent shadow-xl px-4 py-2 text-lg text-bleu-1 font-bold bg-bleu-9 rounded-full flex items-center justify-center transition duration-200 ease-in-out 
                        hover:bg-transparent hover:border-bleu-9 hover:text-bleu-9 max-md:w-full"
                    >
                        Prendre rendez-vous
                    </Link>
                </div>
                <div className="relative w-1/3 aspect-square rounded-2xl flex items-center justify-center gap-4 max-xl:w-2/5 max-md:w-full">
                    <Image src={image} fill alt="service-img"  className="size-full aspect-square rounded-2xl"/>
                </div>                    
            </div>
        )
    }
)

export default ServiceCard
