const connection = require('./../../../conexcionDB');

const getAllFactura = (req, res) => {
    const { sucursal } = req.params
    const sql = 'SELECT * FROM factura' + sucursal + ' WHERE eliminado = false';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getAllFacturaByProveedor = (req, res) => {
    const { sucursal, id_proveedor } = req.params
    const sql = `SELECT * FROM factura${sucursal} WHERE id_proveedor = ${id_proveedor} AND eliminado = false`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getFactura = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM factura${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveFactura = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO factura' + sucursal+ ' SET ?';

    const FacturaObj = {
        id_proveedor: req.body.id_proveedor,
        folio: req.body.folio
    }

    connection.query(sql, FacturaObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Factura creada'});

    });
}


const updateFactura = (req, res) => {
    const { id, sucursal } = req.params;
    const { folio } = req.body;


    const sql = `UPDATE factura${sucursal} SET
        folio = '${folio}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Factura actualizada'});
    });
}


const deleteFactura = (req, res) => {
    
    const { id, sucursal } = req.params;
    const sql = `UPDATE factura${sucursal} SET eliminado = true WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Factura eliminada'});
    });
}

module.exports = {
    getAllFactura,
    getFactura,
    getAllFacturaByProveedor,
    saveFactura,
    updateFactura,
    deleteFactura
}