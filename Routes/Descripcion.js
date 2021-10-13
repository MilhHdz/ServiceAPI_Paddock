const conecction = require('../conexcionDB');


const getAllDescription = (req, res) => {
    const sql = 'SELECT * FROM descripcion';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}

module.exports = {
    getAllDescription
}