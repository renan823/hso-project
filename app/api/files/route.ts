import FileService from "@/services/FileService";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const files = await FileService.fetchAll();

        return NextResponse.json({ success: true, files });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Erro na leitura dos arquivos "});
    }
}