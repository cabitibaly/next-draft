"use client"

import { CloudUpload, File, X } from "lucide-react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

const Dropzone = () => {
    const [file, setFile] = useState<File[]>([])
    const {getRootProps, getInputProps, isDragGlobal } = 
        useDropzone({ 
            accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                "application/vnd.ms-excel": [".xls", ".csv"]
            },
            multiple: false,
            onDrop: (acceptedfiles) => {
                setFile(acceptedfiles)
            }
        });
    
    const octetToKiloBytes = (octets: number) => {
        if (!octets) return 0
        return Math.round((octets / 1024) * 100) / 100
    }

    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-4 p-4">
            <div className="flex items-center justify-center w-1/2">
                <label                    
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center w-full h-64 border border-dashed rounded-2xl cursor-pointer ${isDragGlobal ? "border-bleu-9 bg-bleu-1/10" : "border-gris-11"}`}
                >
                    <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <CloudUpload size={32} color="#5F606A" />
                        <p className="mb-1 text-gris-8 text-sm font-medium">Glisser ou choisissez un <span className="text-bleu-9">fichier</span> à téléverser</p>
                        <p className=" text-gris-8 text-sm font-medium">xlsx, xls ou csv</p>
                    </div>
                    <input {...getInputProps()} />
                </label>
            </div>
            <div className="p-2 bg-gris-11/10 rounded-2xl w-full flex items-center justify-between gap-2.5">
                <div className="flex items-center justify-center gap-2">
                    <File size={40}/>
                    <div className="flex flex-col items-start justify-center gap-0.5">
                        <span className="text-base text-gris-8 font-medium line-clamp-1">{file[0]?.name}</span>
                        <span className="text-base text-gris-8/70 font-medium">{octetToKiloBytes(file[0].size)} ko</span>
                    </div>
                </div>
                <button
                    onClick={() => setFile([])}
                    className="cursor-pointer"
                >
                    <X strokeWidth={2} className="size-5 stroke-gris-1"/>
                </button>            
            </div>
        </div>
    )
}

export default Dropzone
