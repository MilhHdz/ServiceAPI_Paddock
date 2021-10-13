const connection = require('../../conexcionDB');


const getAllUnidadDeMedida = (req, res) => {
    const sql = 'SELECT * FROM unidad_de_medida';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


module.exports = {
    getAllUnidadDeMedida
}