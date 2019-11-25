const mysql=require('mysql');
const connection=mysql.createConnection({
        host:'ns17.hostinglotus.net',
        user:'stplusc1_my3plus',
        password:'0tvpkdi^hwxmew,;jt',
        database:'stplusc1_myapp'
});

connection.connect(function(error: any){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 



