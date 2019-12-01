"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = __importDefault(require("../controllers/uploadController"));
class UploadRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // CREATE DATA 
        this.router.post('/', uploadController_1.default.saveImageUpload);
        // READ DATA PORTAL INTRANET OF GEL
        this.router.get('/', uploadController_1.default.getImageUpload);
        // UPDATE DATA
        // DELETE DATA
    }
}
const uploadRoutes = new UploadRoutes();
exports.default = uploadRoutes.router;
