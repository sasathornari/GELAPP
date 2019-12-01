import { Request, Response } from "express";

class UploadController {
    
    public async getImageUpload(req: Request, res: Response) {
        res.json({message: 'Get Image Upload !'});
    }

    public async saveImageUpload(req: Request, res: Response) {
        console.log([req.body]);
        res.json({message: [req.body]});
    }

}

const uploadController = new UploadController();
export default uploadController;