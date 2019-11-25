import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';


admin.initializeApp(functions.config().firebase);

const connect = require('./db');
const app = express();
const router = express.Router()

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100'
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  }
// Enable preflight requests for all routes
app.options('*', cors(corsOptions));
// Automatically allow cross-origin requests
//app.use(cors({ origin: true }));
app.set('port', process.env.PORT || 3005);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    next();
  });

router.get('/', (req, res) => {
    res.send('Router OK');
})

router.get('/emp', cors(corsOptions),async (req, res) => {
    try {
        const result = await connect.query(
            "select PERSONALINFO.PRS_NO,EMPFILE.EMP_I_CARD,EMPFILE.EMP_INTL,EMPFILE.EMP_NAME, " + 
            "EMPFILE.EMP_SURNME,EMPFILE.EMP_GENDER, EMPFILE.EMP_MARITAL,EMPFILE.EMP_BIRTH, " +
            "PERSONALINFO.PRS_JBT,JOBTITLE.JBT_THAIDESC,PERSONALINFO.PRS_DEPT,DEPTTAB.DEPT_THAIDESC " +
            "from PERSONALINFO " +
            "inner join EMPFILE on EMPFILE.EMP_KEY = PERSONALINFO.PRS_EMP " +
            "inner join JOBTITLE on PERSONALINFO.PRS_JBT = JOBTITLE.JBT_KEY " +
            "inner join DEPTTAB on PERSONALINFO.PRS_DEPT = DEPTTAB.DEPT_KEY " +
            "order by PRS_NO"
          );
          console.log(result);
          res.json(result);
          //res.send('result');
    } catch (error) {
        res.status(500).send(error);
    }
    
});


app.use('/', router)
exports.api = functions.https.onRequest(app);


