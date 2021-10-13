const conecction = require('../conexcionDB');


const getAllModelos = (req, res) => {
    const sql = 'SELECT * FROM modelos';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}

module.exports = {
    getAllModelos
}