"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const portalRoutes_1 = __importDefault(require("./routes/portalRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const allowedOrigins = [
            'capacitor://localhost',
            'ionic://localhost',
            'http://localhost',
            'http://localhost:8080',
            'http://localhost:8100',
            'http://localhost:53703',
            'http://localhost:4200',
            'https://human.3stplus.co.th'
        ];
        // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
        const corsOptions = {
            origin: (origin, callback) => {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Origin not allowed by CORS'));
                }
            }
        };
        this.app.set('port', process.env.PORT || 3005);
        this.app.use(morgan_1.default('dev'));
        this.app.options('*', cors_1.default(corsOptions));
        //this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Accept', 'application/json, text/plain');
            next();
        });
    }
    routes() {
        this.app.use('/api', indexRoutes_1.default);
        this.app.use('/api/portal', portalRoutes_1.default);
        this.app.use('/api/project', projectRoutes_1.default);
        this.app.use('/api/upload', uploadRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
            console.log('Start connection.........\n');
        });
    }
}
const server = new Server();
server.start();
