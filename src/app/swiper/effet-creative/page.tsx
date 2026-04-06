"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';

const EffetCreative = () => {
    return (
        <section className="px-16 w-screen h-svh bg-[#111113] flex items-center justify-center max-md:px-4">
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                loop={true}
                slidesPerView={'auto'}
                modules={[EffectCreative]}                
                centeredSlides={true}
                className="border border-red-300 w-full h-1/2 flex items-center justify-center"
            >
                <SwiperSlide className='w-full! h-full! flex items-center justify-center'>
                    <div className='w-full h-full flex'>
                        <div className='w-1/2 h-full flex items-center justify-center bg-pink-400'> Pink</div>
                        <div className='w-1/2 h-full flex items-center justify-center bg-emerald-400'>Emerald</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='bg-yellow-400 w-full! h-full! flex items-center justify-center'>Slide 2</SwiperSlide>
                <SwiperSlide className='bg-green-400 w-full! h-full! flex items-center justify-center'>Slide 3</SwiperSlide>
                <SwiperSlide className='bg-purple-400 w-full! h-full! flex items-center justify-center'>Slide 4</SwiperSlide>
            </Swiper>
        </section>
    )
}

export default EffetCreative
