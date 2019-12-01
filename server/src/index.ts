import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRoutes from './routes/indexRoutes';
import portalRoutes from './routes/portalRoutes';
import projectRoutes from './routes/projectRoutes';
import uploadRoutes from './routes/uploadRoutes';


class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
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
            origin: (origin: any, callback: any) => {
              if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
              } else {
                callback(new Error('Origin not allowed by CORS'));
              }
            }
          }
        
        this.app.set('port', process.env.PORT || 3005);
        this.app.use(morgan('dev'));
        this.app.options('*', cors(corsOptions));
        //this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(function(req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");            
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Accept', 'application/json, text/plain');
            next();
          });
    }

    routes(): void {
        this.app.use('/api', indexRoutes);
        this.app.use('/api/portal', portalRoutes);
        this.app.use('/api/project', projectRoutes);
        this.app.use('/api/upload', uploadRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'),() => {
            console.log('Server on port ', this.app.get('port'));
            console.log('Start connection.........\n');
        });
    }

}

const server = new Server();
server.start();