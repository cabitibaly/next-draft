"use client"

import StackAnimation from '@/components/animation/stackAnimation'

interface ProjetTechStackProps {
    type: string
    technologies: string[]
}

const ProjetTechStack = ({ type, technologies }: ProjetTechStackProps) => {
    return (
        <div className="pb-24 w-1/2 h-full flex flex-col items-end justify-between gap-16 max-lg:items-center max-md:w-full max-md:h-3/5">
            <div className="w-3/4 flex flex-col items-start justify-start gap-4 max-xl:w-[85%] max-lg:w-full">
                <div className="overflow-hidden">
                    <div className="type-site text-xl text-blanc text-left font-space-grotesk font-bold uppercase max-md:text-xl">
                        {type}
                    </div>
                </div>
                <div className="line scale-x-0 border border-blanc w-full h-px" />
                <div className="flex items-center justify-start gap-3 flex-wrap">
                    {technologies.map((tech, i) => (
                        <div 
                            key={tech} 
                            className={`techno-${i + 1} opacity-0 flex items-center justify-center gap-3`}
                        >
                            <div className="text-sm text-blanc font-ibm-plex-mono font-semibold uppercase">
                                {tech}
                            </div>
                            {i < technologies.length - 1 && (
                                <div className='size-1 rounded-full bg-[#BBBBBB]' />
                            )}
                        </div>
                    ))}
                </div>
                <div className="line border border-blanc w-full h-px" />
            </div>
            <StackAnimation />
        </div>
    )
}

export default ProjetTechStack