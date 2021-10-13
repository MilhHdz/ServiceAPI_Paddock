const conecction = require('../conexcionDB');


const getAllProveedor = (req, res) => {
    const sql = 'SELECT * FROM proveedor';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getProveedor = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM proveedor WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveProveedor = (req, res) => {
    const sql = 'INSERT INTO proveedor SET ?';

    const proveedorObj = {
        nombre: req.body.nombre
    }

    conecction.query(sql, proveedorObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Proveedor creado'});

    });
}


const updateProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;


    const sql = `UPDATE proveedor SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Proveedor actualizado'});
    });
}


const deleteProveedor = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM proveedor WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Proveedor eliminado'});
    });
}

module.exports = {
    getAllProveedor,
    getProveedor,
    saveProveedor,
    updateProveedor,
    deleteProveedor
}