import { Router } from 'express';
import uploadController from '../controllers/uploadController';


class UploadRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        // CREATE DATA 
        this.router.post('/', uploadController.saveImageUpload);

        // READ DATA PORTAL INTRANET OF GEL
        this.router.get('/', uploadController.getImageUpload);

        // UPDATE DATA

        // DELETE DATA

    }
}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router;