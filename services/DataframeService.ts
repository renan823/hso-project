import { DataFrame } from "danfojs-node";
import { readFile } from "fs/promises";
import { parse } from "papaparse";

const path = "./uploads/";

enum ClearModesEnum {
    whitespaces = "",
    null = "",
}

class DataframeService {
    static async create (filename: string) {
        const content = await readFile(`${path}${filename}`, "utf-8");

        try {
            const data = parse(content, { header: true });

            const dataframe = new DataFrame(data);

            return { success: true, dataframe };
        } catch (error) {
            return { success: false, message: "Erro na conversão do arquivo" };
        }
    }

    static async applyFilter (dataframe: DataFrame) {
        return dataframe;
    }

    static async clear (dataframe: DataFrame, targets: [string]) {
        return dataframe;
    }
}

export default DataframeService;