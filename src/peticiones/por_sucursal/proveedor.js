const connection = require('./../../../conexcionDB');


const getAllProveedor = (req, res) => {
    const { sucursal } = req.params
    const sql = 'SELECT * FROM proveedor' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getProveedor = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM proveedor${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveProveedor = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO proveedor' + sucursal +' SET ?';

    const proveedorObj = {
        nombre: req.body.nombre
    }

    connection.query(sql, proveedorObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Proveedor creado'});

    });
}


const updateProveedor = (req, res) => {
    const { id, sucursal } = req.params;
    const { nombre } = req.body;


    const sql = `UPDATE proveedor${sucursal} SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Proveedor actualizado'});
    });
}


const deleteProveedor = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `DELETE FROM proveedor${sucursal} WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Proveedor eliminado'});
    });
}

module.exports = {
    getAllProveedor,
    getProveedor,
    saveProveedor,
    updateProveedor,
    deleteProveedor
}