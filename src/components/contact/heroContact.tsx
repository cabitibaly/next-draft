"use client"
import { Client, ClientAction } from "@/types/client";
import gsap from "gsap"
import { useEffect, useReducer, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { Toast } from "primereact/toast";
import { ThreeDots } from "react-loader-spinner";

const clientReducer = (state: Client, action: ClientAction): Client => {
    switch (action.type) {
        case "SET_NOM":
            return { ...state, nom: action.payload };
        case "SET_PRENOM":
            return { ...state, prenom: action.payload };
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_TELEPHONE":
            return { ...state, telephone: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        default:
            return state;
    }
};

const HeroContact = () => {
    const heroTextRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const localisationRef = useRef<HTMLDivElement>(null)
    const toast = useRef<Toast>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [client, dispatch] = useReducer(clientReducer, {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        description: ""
    })

    useEffect(() => {
        const heroText = heroTextRef.current
        const form = formRef.current
        const localisation = localisationRef.current

        if (!heroText || !form || !localisation) return

        const tl = gsap.timeline()

        tl.to(
            heroText,
            {scale: 1, transformOrigin: "center center", delay: 1, duration: 1, ease: "power2.inOut"}
        ).to(
            form,
            {scale: 1, transformOrigin: "center center", duration: 0.5, ease: "power2.inOut"}
        ).to(
            localisation,
            {scale: 1, transformOrigin: "center center", duration: 0.5, ease: "power2.inOut"}
        )


    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()        

        const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const userID = process.env.NEXT_PUBLIC_PUBLIC_KEY;

        setIsLoading(true)
        
        try {

            const emailParams = {
                name: `${client.nom} ${client.prenom}`,
                email: client.email,
                message: client.description,
                telephone: client.telephone,
            }

            const res = await emailjs.send(
                serviceID!,
                templateID!,
                emailParams,
                {publicKey: userID!}
            )

            if(res.status === 200) {
                toast?.current?.show({
                    severity:'success', 
                    summary: 'Success', 
                    detail:'Email envoyé avec succès',
                    life: 3000
                });  
                
                reset()
            }
            
        } catch (err) {
            toast?.current?.show({
                severity: "error",
                summary: "Erreur",
                detail: "Une erreur est survenue lors de l'envoi de l'email",
                life: 3000
            })
            console.log(err)
        } finally {
            setIsLoading(false)
        }

    }

    const reset = () => {
        dispatch({type: "SET_NOM", payload: ""})
        dispatch({type: "SET_PRENOM", payload: ""})
        dispatch({type: "SET_EMAIL", payload: ""})
        dispatch({type: "SET_TELEPHONE", payload: ""})
        dispatch({type: "SET_DESCRIPTION", payload: ""})
    }

    return (
        <section className="contact-bg overflow-hidden px-[100px] pt-36 pb-28 relative w-screen min-h-screen flex flex-col items-center justify-center gap-4 max-lg:pt-48 max-896:p-4 max-md:pt-28">
            <Toast ref={toast} />
            <div className="w-full flex flex-col items-center justify-center gap-10">
                <h1 ref={heroTextRef} className="scale-0 w-4/5 text-5xl text-gris-1 font-semibold text-center max-lg:w-full max-md:text-4xl">
                    Un <span className="text-bleu-9">projet</span>, une <span className="text-bleu-9">question</span> ? Nous sommes disponibles.
                </h1>
                <div className="w-full flex items-center justify-center gap-8 max-lg:flex-wrap-reverse">
                    <div ref={localisationRef} className="scale-0 w-1/2 flex flex-col items-center justify-start gap-4 max-lg:flex-row max-lg:w-full max-md:flex-col max-md:justify-center">
                        <div className="w-full flex flex-col items-start justify-center gap-1 max-md:items-center">
                            <span className="text-xl text-gray-300 font-medium">Email</span>
                            <span className="text-2xl text-bleu-1 font-medium">powertechsarl22@gmail.com</span>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-1 max-md:items-center">
                            <span className="text-xl text-gray-300 font-medium">Localisation</span>
                            <span className="text-2xl text-bleu-1 font-medium">Bobo-Dioulasso, secteur 22</span>
                        </div>
                    </div>
                    <form ref={formRef} onSubmit={(e) => handleSubmit(e)} className="scale-0 border border-bleu-1/40 p-4 bg-bleu-8/10 backdrop-blur-[35px] rounded-3xl w-1/2 flex flex-col items-center justify-center gap-5 max-lg:w-full">
                        <div className="w-full flex flex-col items-start justify-center gap-2">                            
                            <input value={client.nom} onChange={e => dispatch({type: "SET_NOM", payload: e.target.value})} id="nom" type="text" className="border border-bleu-1/40 px-4 py-2 bg-transparent w-full rounded-lg outline-none text-bleu-1 text-base font-normal focus:border-bleu-9 focus:ring-1 focus:ring-bleu-9 placeholder:text-gray-300" placeholder="Nom..." required />
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">                            
                            <input value={client.prenom} onChange={e => dispatch({type: "SET_PRENOM", payload: e.target.value})} id="prenom" type="text" className="border border-bleu-1/40 px-4 py-2 bg-transparent w-full rounded-lg outline-none text-bleu-1 text-base font-normal focus:border-bleu-9 focus:ring-1 focus:ring-bleu-9 placeholder:text-gray-300" placeholder="Prénom..." />
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">                            
                            <input value={client.email} onChange={e => dispatch({type: "SET_EMAIL", payload: e.target.value})} id="email" type="email" className="border border-bleu-1/40 px-4 py-2 bg-transparent w-full rounded-lg outline-none text-bleu-1 text-base font-normal focus:border-bleu-9 focus:ring-1 focus:ring-bleu-9 placeholder:text-gray-300" placeholder="Email..." required />
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">                            
                            <input value={client.telephone} onChange={e => dispatch({type: "SET_TELEPHONE", payload: e.target.value})} id="telephone" type="text" className="border border-bleu-1/40 px-4 py-2 bg-transparent w-full rounded-lg outline-none text-bleu-1 text-base font-normal focus:border-bleu-9 focus:ring-1 focus:ring-bleu-9 placeholder:text-gray-300" placeholder="Téléphone..." required />
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">                            
                            <textarea value={client.description} onChange={e => dispatch({type: "SET_DESCRIPTION", payload: e.target.value})} name="desc" id="desc" className=" resize-none border border-bleu-1/40 px-4 py-2 bg-transparent w-full h-28 rounded-lg outline-none text-bleu-1 text-base font-normal focus:border-bleu-9 focus:ring-1 focus:ring-bleu-9 placeholder:text-gray-300" placeholder="Description du projet..." required></textarea>
                        </div>
                        <button
                            disabled={isLoading}
                            className="border border-transparent shadow-xl px-4 py-2 text-lg text-bleu-1 font-bold bg-bleu-9 rounded-full flex items-center justify-center transition duration-200 ease-in-out 
                            hover:bg-transparent hover:border-bleu-9 hover:text-bleu-9 max-md:w-full"
                        >                            
                            {
                                isLoading ? 
                                    <ThreeDots
                                        visible={true}
                                        height="24"
                                        width="24"
                                        color="#F5F9FF"                                        
                                        ariaLabel="three-dots-loading"
                                    />
                                :
                                    "Soumettre la demande"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default HeroContact