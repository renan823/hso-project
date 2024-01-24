import FileService from "@/services/FileService";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const data = await req.formData();

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: "Nenhuma arquivo enviado" });
    }

    try {
        await FileService.upload(file);

        return NextResponse.json({ success: true, message: "Arquivo salvo" });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message || "Algo deu errado" })
    }
}