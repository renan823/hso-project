import FileService from "@/services/FileService";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        const { files, amount } = await FileService.count();

        return NextResponse.json({ success: true, files, amount });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Erro na leitura dos arquivos "});
    }
}