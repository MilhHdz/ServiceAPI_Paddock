const mysql = require('mysql');


// const conecction = mysql.createPool({
//     host: '144.126.222.6',
//     user: 'neo',
//     database: 'paddockdb',
//     password: 'Milh30'
// });

const conecction = mysql.createPool({
    host: '167.71.31.43',
    user: 'paddock',
    database: 'paddock_db',
    password: 'p4dd0ck_C#1s'
});

/**
 * host: us-cdbr-east-03.cleardb.com
 * user: b443f318a9f91e
 * database: heroku_4bd69bbb2cbb271
 * password: 46259865
 */


module.exports = conecction;