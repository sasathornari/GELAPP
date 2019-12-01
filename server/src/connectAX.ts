const sql = require('mssql');

const pool2 = new sql.ConnectionPool({
    user: 'GELIntra',
    password: 'w,jgxHowi',
    server: '192.168.99.5', // You can use 'localhost\\instance' to connect to named instance server: '192.168.99.5', HGSVDB01
    //server: '147.50.42.162',
    database: 'GEL12'
    
  });
  pool2.connect(async (err: any) => {
    // ...
    if (err) throw err;
    /*const results = await pool1.request() 
      .query("select * from GEL.dbo.EMPFILE");
      console.log(results);*/
      console.log('MSSQL of AX-ERP is Connected!');
  });
export default pool2;
