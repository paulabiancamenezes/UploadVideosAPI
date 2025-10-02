import { Request, Response } from 'express';
import uploadService from 'src/services/fileService.js';

const uploadFile = async (req: Request, res: Response) => {
    try{
        if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo encontrado." });
    }
    const fileData = await uploadService.savefile(req.file);
     return res.status(200).json({
        message: "Arquivo enviado com sucesso!",
        file: fileData,
    });

    }catch(error: any){
        return res.status(500).json({ error: `Ocorreu um erro ao enviar arquivo ${error.message}` });
    }
};

const getFile = async (req: Request, res: Response) => {
    try{
    const getData = await uploadService.getFiles();
    if (getData?.length === 0) {
        return res.status(404).json({ error: "Nenhum arquivo encontrado." });
    }
    return res.status(200).json({
        message: "Arquivos localizados:",
        file: getData,
    });
    }catch(error: any){
        return res.status(500).json({ error: `Ocorreu um erro ao localizar os arquivos ${error.message}` });
    }
};

const downloadFile = async (req: Request, res: Response) =>{
    try{
        const filename = req.params.filename;
        const pathFile = await uploadService.getFilePath(filename)
        res.download(pathFile);
    }catch(error: any){
        res.status(500).json({ error: `Ocorreu um erro ao baixar o arquivo ${error.message}` });
    }
}

export default {
    uploadFile,
    getFile,
    downloadFile
};