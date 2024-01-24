import { allowedExtensios } from "@/utils/allowedExtensios";
import { readdir, writeFile } from "fs/promises";

const path = "./uploads/";

class FileService {

    static async upload (file: File) {

        if (file) {
            const filename = new Date().toISOString().split(".")[0];

            let size = file.name.split(".").length;
            const extension = file.name.split(".")[size-1];

            if (!allowedExtensios.includes(extension)) {
                return { success: false, message: "Extensão de arquivo inválida" };
            }

            const bytes = await file.arrayBuffer();

            const buffer = Buffer.from(bytes);

            await writeFile(`${path}${filename}.${extension}`, buffer);

            return { success: true, message: "Arquivo salvo" };
        } else {
            return { success: false, message: "Nenhum arquivo enviado" };
        }
    }

    static async delete (filename: String) {
        return;
    }

    static async count () {
        try {
            const files = await readdir(path);

            const sortedByDay: Record<string, number> = {};

            files.forEach((file) => {
                const [year, month, day] = file.split("T")[0].split("-");

                const date = `${day}/${month}/${year}`;

                sortedByDay.hasOwnProperty(date) ?  sortedByDay[date] += 1 : sortedByDay[date] = 1;
            })

            return { success: true, files: sortedByDay, amount: files.length};
        } catch (error) {
            return { success: false, message: "Erro na leitura dos arquivos" };
        }
    }

    static async fetchAll () {
        try {
            const files = await readdir(path);

            return { files };
        } catch (error) {
            return { success: false, message: "Erro na leitura dos arquivos" };
        }
    }
}

export default FileService;