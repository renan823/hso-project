import { writeFile } from "fs/promises";

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

    }
}

export default FileService;