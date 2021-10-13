const connection = require('../../conexcionDB');


const getAllTransfer = (req, res) => {

    const sql = 'SELECT * FROM tranferencia';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const saveTransfer = (req, res) => {
    const sql = 'INSERT INTO tranferencia SET ?';

    const categoriaObj = {
        de_id_sucursal: req.body.de_id_sucursal,
	    nombre_producto: req.body.nombre_producto,
	    para_id_sucursal: req.body.para_id_sucursal,
	    cantidad: req.body.cantidad
    }

    connection.query(sql, categoriaObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Transferencia creada'});
    });
}


module.exports = {
    getAllTransfer,
    saveTransfer
}