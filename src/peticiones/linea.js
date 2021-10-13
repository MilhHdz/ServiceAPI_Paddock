const connection = require('../../conexcionDB');

const getAllLinea = (req, res) => {
    const sql = 'SELECT id, nombre FROM linea';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const getLinea = (req, res) => {
    const { id } = req.params
    const sql = `SELECT id, nombre FROM linea WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const saveLinea = (req, res) => {
    const sql = 'INSERT INTO linea SET ?';

    const lineaObj = {
        clave: req.body.clave,
        nombre: req.body.nombre
    }

    connection.query(sql, lineaObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Linea creada'});

    });
}


const updateLinea = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    
    const sql = `UPDATE linea SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Linea actualizada'});
    });
}


const deleteLinea = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM linea WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Linea eliminada'});
    });
}


module.exports = {
    getAllLinea,
    getLinea,
    saveLinea,
    updateLinea,
    deleteLinea
}