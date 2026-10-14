"use client"
import { ChevronDown, Search } from 'lucide-react';
import React, { useState } from 'react'
import { DayPicker } from "react-day-picker";
import { fr } from "react-day-picker/locale";

const departements = [
  "Direction Générale",
  "Ressources Humaines",
  "Comptabilité",
  "Finance",
  "Commercial",
  "Marketing",
  "Communication",
  "Service Client",
  "Informatique (IT)",
  "Juridique",
  "Achats",
  "Logistique",
  "Production",
  "Recherche et Développement (R&D)",
  "Services Généraux"
];

const convertToDate = (time: string): Date => {
    if (!time) return new Date();

    const [hour, minute] = time.split(":").map(Number);
    
    const date = new Date();
    date.setHours(hour, minute, 0);

    return date;
}

const Daisy = () => {
    const [date, setDate] = useState<Date | undefined>();
    const [time, setTime] = useState<string>("");
    const [etat, setEtat] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [recherche, setRecherche] = useState<string>("");

    const departementsFiltered = departements.filter((departement) => departement.toLowerCase().includes(recherche.toLowerCase()));

    console.log(convertToDate(time));

    return (
        <div className="bg-black w-screen h-screen flex flex-col items-center justify-center gap-4">
            <button popoverTarget="rdp-popover" className="cursor-pointer border border-gris-8/20 bg-gris-11/20 px-3 py-3 w-1/4 text-base text-gris-4 font-normal rounded-xl flex items-center justify-start" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {date ? date.toLocaleDateString() : "Pick a date"}
            </button>            
            <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                <DayPicker 
                    className="react-day-picker" 
                    locale={fr}  
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    style={{
                        border: "1px solid #5F606A",
                        backgroundColor: "#EEEEF0",
                        color: "#111113",                                                        
                    }}
                />
            </div>
            <div className="w-1/4 flex flex-col items-start justify-start gap-2">
                <label htmlFor="heure-fin" className="text-lg text-gris-8 font-medium">Heure de fin de garde</label>
                <input
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    id="heure-fin" 
                    type="time" 
                    className="border border-transparent bg-gris-11/20 rounded-xl w-full py-3 px-2 text-base text-gris-1 outline-0 focus:border-gris-8 focus:ring-gris-8 placeholder:text-gris-10" placeholder="Saisir l'heure de fin de garde..." 
                />
            </div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="relative border border-gris-8/20 bg-gris-11/20 w-1/4 py-2 px-3 rounded-xl flex items-center jusitfy-start"
            >
                <div className="w-full flex items-center justify-between gap-4">
                    <span className="cursor-default text-base text-gris-4 font-normal">{etat === "" ? "Etat visite" : etat}</span>
                    <div className={`size-6 flex items-center justify-center transition duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="stroke-gris-6 size-6 aspect-square" />
                    </div>
                    {    
                        isOpen &&
                            <div className="absolute left-0 overflow-auto z-50 top-full px-2 pb-2 border border-gris-8/20 bg-gris-12 rounded-xl w-full h-80 flex-col items-start justify-start">
                                <div className="sticky top-0 py-2 bg-gris-12 w-full flex justify-center items-center gap-6">
                                    <label htmlFor="recherche" className="sr-only">Recherche vigiles</label>
                                    <input 
                                        value={recherche} 
                                        onChange={(e) => setRecherche(e.target.value)} 
                                        type="text"
                                        onClick={(e) => e.stopPropagation()}
                                        className="border border-gris-8/20 rounded-sm w-full p-2 ps-9 text-base text-gris-1 outline-0 focus:border-gris-8 focus:ring-gris-8 placeholder:text-gris-10" placeholder="Recherche..." 
                                    />
                                    <div className="absolute top-0 inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
                                        <Search strokeWidth={1.5} size={20} color='#797B86' />
                                    </div>
                                </div>
                                {
                                    departementsFiltered.map((departement, index) => (
                                        <button 
                                            key={index} 
                                            type="button" 
                                            onClick={() => setEtat(departement)} 
                                            className={`cursor-pointer p-2 rounded-sm w-full text-left text-base text-gris-6 font-normal transition duration-200 hover:bg-gris-10/20 ${departement === etat ? "bg-gris-10/20" : ""}`}
                                        >
                                            {departement}
                                        </button>
                                    ))
                                }                                
                            </div>
                    }
                </div>
            </div>                        
        </div>
    )
}

export default Daisy
