import * as express from 'express';
const connect = require('../db');
const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send({ id });
});

router.get('/feed', (req, res) => {
  res.send('Here get the feed');
});

router.get('/emp', (req, res) => {
    connect.query(
        "select PERSONALINFO.PRS_NO,EMPFILE.EMP_I_CARD,EMPFILE.EMP_INTL,EMPFILE.EMP_NAME, " + 
        "EMPFILE.EMP_SURNME,EMPFILE.EMP_GENDER, EMPFILE.EMP_MARITAL,EMPFILE.EMP_BIRTH, " +
        "PERSONALINFO.PRS_JBT,JOBTITLE.JBT_THAIDESC,PERSONALINFO.PRS_DEPT,DEPTTAB.DEPT_THAIDESC " +
        "from PERSONALINFO " +
        "inner join EMPFILE on EMPFILE.EMP_KEY = PERSONALINFO.PRS_EMP " +
        "inner join JOBTITLE on PERSONALINFO.PRS_JBT = JOBTITLE.JBT_KEY " +
        "inner join DEPTTAB on PERSONALINFO.PRS_DEPT = DEPTTAB.DEPT_KEY " +
        "order by PRS_NO",
        function(err: any, row: any, fields: any) {
          const listproject = JSON.parse(JSON.stringify(row, null, 4));
          console.log(listproject);
          res.send(listproject);
        }
      );
     //res.send('Hello employee');
});

module.exports = router;