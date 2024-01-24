import FileService from "@/services/FileService";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const data = await req.formData();

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: "Nenhuma arquivo enviado" });
    }

    const result = await FileService.upload(file);

    return NextResponse.json(result);
}