import * as mysql from 'mysql';

// connection localhost
const pool = mysql.createPool({
     host: '192.168.99.206',
     //host: '147.50.42.162',
     user: 'foo',
     password: '0tvpkdi^hwxmew,',
     database: 'my3plus'
});

pool.getConnection((err, connection) => {
     if (err) throw err; connection.release(); 
     console.log('MySQL of GEL in localhost is connected'); 

});

export default pool;