import { readdir, writeFile } from "fs/promises";

const extensios = ["csv"];
const path = "./uploads/";

class FileService {
    static async upload (file: File) {

        const filename = new Date().toISOString().split(".")[0];

        let size = file.name.split(".").length;
        const extension = file.name.split(".")[size-1];

        if (!extensios.includes(extension)) {
            throw new Error("Extensão de arquivo inválida");
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        await writeFile(`${path}${filename}.${extension}`, buffer);
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

            return { files: sortedByDay, amount: files.length };
        } catch (error) {
            throw new Error("Erro na leitura dos arquivos");
        }
    }

    static async fetchAll () {
        try {
            const files = await readdir(path);

            return files;
        } catch (error) {
            throw new Error("Erro na leitura dos arquivos");
        }
    }
}

export default FileService;