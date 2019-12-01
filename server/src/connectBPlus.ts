const sql = require('mssql');

const pool1 = new sql.ConnectionPool({
     user: 'business',
     password: 'system',
     server: '192.168.2.12', // You can use 'localhost\\instance' to connect to named instance
     //server: '147.50.42.162',
     database: 'GEL'

   });
   pool1.connect(async (err: any) => {
     // ...
     if (err) throw err;
     /*const results = await pool1.request() 
       .query("select * from GEL.dbo.EMPFILE");
       console.log(results);*/
       console.log('MSSQL of B+ is Connected!');
   });
export default pool1;
