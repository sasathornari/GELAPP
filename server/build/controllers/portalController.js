"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectGEL_1 = __importDefault(require("../connectGEL"));
//import pool3 from "../connectMySQL";
class PortalController {
    /*========================================================================*/
    /*-------- MyApp --------*/
    createNewPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectGEL_1.default.query("INSERT INTO my3plus.post_news set ?", [
                    req.body
                ]);
                console.log(result);
                res.json({ message: "Post News Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fileUploads(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connectGEL_1.default.query("INSERT INTO my3plus.fileupload set ?", [
                    req.body
                ]);
                console.log(result);
                res.json({ message: "Post News Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPostCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connectGEL_1.default.query("SELECT * FROM my3plus.post_category", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connectGEL_1.default.query("SELECT * FROM my3plus.post_news order by postId desc", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectGEL_1.default.query("SELECT * FROM my3plus.post_news where postId = " + [id], function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPostByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectGEL_1.default.query("SELECT * FROM my3plus.post_news where post_category like '%" + [id] + "%'", function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connectGEL_1.default.query("delete from my3plus.post_news where postId =" + [id], function (err, row) {
                    const listproject = JSON.parse(JSON.stringify(row, null, 4));
                    console.log(listproject);
                    res.json(listproject);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log([req.body]);
            try {
                const result = yield connectGEL_1.default.query("UPDATE my3plus.post_news set ? ", [req.body] + " where postId = " + [id]);
                console.log(result);
                res.json({ message: "update Project Success = " + [req.body] });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const portalController = new PortalController();
exports.default = portalController;
