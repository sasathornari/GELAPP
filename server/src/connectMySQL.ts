import * as mysql1 from 'mysql';

// connection localhost
const pool3 = mysql1.createPool({
     host: 'ns17.hostinglotus.net',
     user: 'stplusc1_my3plus',
     password: '0tvpkdi^hwxmew,;jt',
     database: 'stplusc1_myapp',
     port: 3306
});

pool3.getConnection((err, connection) => {
     if (err) throw err; connection.release(); 
     console.log('MySQL of 3STPLUS is connected'); 

});

export default pool3;