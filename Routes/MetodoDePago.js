const conecction = require('../conexcionDB');

const getAllMetodoPago = (req, res) => {
    const sql = 'SELECT * FROM metodo_pago';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'});
    });
}

module.exports = {
    getAllMetodoPago
}