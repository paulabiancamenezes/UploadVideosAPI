import { dirname, join } from "path";
import { fileURLToPath } from "url";
import  fs  from "fs";
import FileData from "../@types/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class uploadService{
    
    private uploadDir = join(__dirname, "../uploads");
    constructor(){
        if(!fs.existsSync(this.uploadDir)){
            fs.mkdirSync(this.uploadDir);
        }
    }

    async savefile(file: Express.Multer.File): Promise<FileData> {
        if(!file){
            throw new Error("Arquivo não encontrado");
        }
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB

        if(file.size > MAX_SIZE){
            throw new Error(`Arquivo muito grande. Tamanho máximo permitido: ${MAX_SIZE /(1024 * 1024)} MB. Tamanho atual: ${file.size / (1024 * 1024)} MB.`);
        }

        const nameFile = `${Date.now()}-${file.originalname}`;

        return {
            originalname: file.originalname,
            filename: nameFile,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path
        };
    }
    
    async getFiles() {
        const files = await fs.promises.readdir(this.uploadDir);
        const fileDetails = await Promise.all(
            files.map(async(filename) => {
                const filePath = join(this.uploadDir, filename);
                const stats = await fs.promises.stat(filePath);
                return {
                    filename,
                    size: stats.size,
                    createdAt: stats.birthtime,
                };
            })
        );
        return fileDetails;
    }

    async getFilePath(filename: any){
        return join(this.uploadDir, filename);
    }
}

export default new uploadService();