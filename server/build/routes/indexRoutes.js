"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controllers/indexController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // GET DATA EMPLOYEE
        this.router.get('/emp', indexController_1.default.listAllEmployees);
        this.router.get('/emp/:id', indexController_1.default.getEmpId);
        this.router.get('/emp2dept/:id', indexController_1.default.getEmpByDept);
        this.router.get('/dept', indexController_1.default.getAllDepartment);
        this.router.get('/dept/:id', indexController_1.default.getDepartmentById);
        // FRONTEND GET DATA OF APPLICATION
        this.router.get('/user/:id,:pass', indexController_1.default.getUsername);
        this.router.get('/userapp/:id,:pass', indexController_1.default.getUsernameApp);
        this.router.get('/user/:id', indexController_1.default.getProfile);
        // BACKEND GET DATA OF WEBSITE        
        this.router.get('/projectAX', indexController_1.default.getProjectInAX);
        this.router.get('/projectAX/:id', indexController_1.default.getIDAX);
        this.router.get('/projectGroupAX/:group', indexController_1.default.getGroupAX);
        this.router.get('/project_group', indexController_1.default.listGroupProject);
        //phpMyadmin
        //this.router.get('/api/admin', indexController.getProjectAdmin);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
