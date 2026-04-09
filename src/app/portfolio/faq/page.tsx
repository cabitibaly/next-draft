"use client"

import FaqCard from "@/components/portfolio/cards/faqCard"

const Faq = () => {    

    return (
        <div className="p-28 bg-[#111113] w-screen min-h-screen flex flex-col items-center justify-start">
            <FaqCard />
            <FaqCard />
            <FaqCard />
            <div className="w-full flex-col items-center justify-start">
                <div className="w-full border-t border-white py-6 collapse rounded-none">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-4xl text-white font-medium uppercase">How do I create an account?</div>
                    <div className="collapse-content text-base text-left text-white font-normal uppercase">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                </div>
                <div className="w-full border-t border-white py-6 collapse rounded-none">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-4xl text-white font-medium uppercase">How do I create an account?</div>
                    <div className="collapse-content text-base text-left text-white font-normal uppercase">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                </div>
                <div className="w-full border-t border-white py-6 collapse rounded-none">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-4xl text-white font-medium uppercase">How do I create an account?</div>
                    <div className="collapse-content text-base text-left text-white font-normal uppercase">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                </div>
            </div>
        </div>
    )
}

export default Faq