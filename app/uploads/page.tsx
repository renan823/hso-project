"use client"

import ApiService from "@/services/ApiService";
import { allowedExtensios } from "@/utils/allowedExtensios";
import { FormEvent, useState } from "react";

export default function Uploads () {
    const [selectedFile, setSelectedFile] = useState<File | null>()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedFile) {
            const data = new FormData();
            data.append("file", selectedFile);

            const result = await ApiService.post("/files/upload", data);

            if (result.success) {
                console.log("ok");
            } else {
                console.log("oops");
            }

            setSelectedFile(null);
        }
    }

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Escolha o arquivo </label>
                    <h2>Extensões aceitas: { allowedExtensios }</h2>
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    )
}