"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portalController_1 = __importDefault(require("../controllers/portalController"));
class PortalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // CREATE DATA 
        this.router.post('/post-create', portalController_1.default.createNewPost);
        this.router.post('/fileupload', portalController_1.default.fileUploads);
        // READ DATA PORTAL INTRANET OF GEL
        this.router.get('/cate', portalController_1.default.getPostCategory);
        this.router.get('/post', portalController_1.default.getAllPost);
        this.router.get('/post/:id', portalController_1.default.getPostById);
        this.router.get('/post/cate/:id', portalController_1.default.getPostByCategory);
        // UPDATE DATA
        this.router.put('/post-update/:id', portalController_1.default.updatPost);
        // DELETE DATA
        this.router.delete('/post/:id', portalController_1.default.deletePost);
    }
}
const portalRoutes = new PortalRoutes();
exports.default = portalRoutes.router;
