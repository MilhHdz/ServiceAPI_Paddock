const mysql = require('mysql');


// const conecction = mysql.createPool({
//     host: '144.126.222.6',
//     user: 'neo',
//     database: 'paddockdb',
//     password: 'Milh30'
// });

const conecction = mysql.createPool({
    host: 'localhost',
    user: 'paddock',
    database: 'paddock',
    password: 'refacciones'
});

/**
 * host: us-cdbr-east-03.cleardb.com
 * user: b443f318a9f91e
 * database: heroku_4bd69bbb2cbb271
 * password: 46259865
 */


module.exports = conecction;