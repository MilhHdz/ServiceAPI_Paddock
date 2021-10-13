const conecction = require('../conexcionDB');


const getAllFactura = (req, res) => {
    const sql = 'SELECT * FROM factura';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getFactura = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM factura WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveFactura = (req, res) => {
    const sql = 'INSERT INTO factura SET ?';

    const FacturaObj = {
        folio: req.body.folio
    }

    conecction.query(sql, FacturaObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Factura creada'});

    });
}


const updateFactura = (req, res) => {
    const { id } = req.params;
    const { folio } = req.body;


    const sql = `UPDATE factura SET
        folio = '${folio}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Factura actualizada'});
    });
}


const deleteFactura = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM factura WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Factura eliminada'});
    });
}

module.exports = {
    getAllFactura,
    getFactura,
    saveFactura,
    updateFactura,
    deleteFactura
}