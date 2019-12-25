import { Router } from 'express';

import indexController from '../controllers/indexController';

class IndexRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        
      
        // GET DATA EMPLOYEE
        this.router.get('/emp', indexController.listAllEmployees);
        this.router.get('/emp/:id', indexController.getEmpId);
        this.router.get('/emp2dept/:id', indexController.getEmpByDept);
        this.router.get('/dept', indexController.getAllDepartment);
        this.router.get('/dept/:id', indexController.getDepartmentById);
        
        // FRONTEND GET DATA OF APPLICATION
        this.router.get('/user/:id,:pass', indexController.getUsername);
        this.router.get('/userapp/:id,:pass', indexController.getUsernameApp);
        this.router.get('/user/:id', indexController.getProfile);

        // BACKEND GET DATA OF WEBSITE        
        this.router.get('/projectAX', indexController.getProjectInAX);
        this.router.get('/projectAX/:id', indexController.getIDAX);
        this.router.get('/projectGroupAX/:group', indexController.getGroupAX);
        this.router.get('/project_group', indexController.listGroupProject);        
        
        
        
        
        //phpMyadmin
        //this.router.get('/api/admin', indexController.getProjectAdmin);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;