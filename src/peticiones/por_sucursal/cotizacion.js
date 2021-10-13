const connection = require('./../../../conexcionDB');


const getAllCotizaciones = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'SELECT * FROM cotizacion' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getAllCotizacionesByIdCliente = (req, res) => {
    const { id_cliente, sucursal } = req.params;
    const sql = `SELECT * FROM cotizacion${sucursal} WHERE id_cliente = ${id_cliente} AND vendido = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}



const getCotizaciones = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `SELECT * FROM cotizacion${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveCotizaciones = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'INSERT INTO cotizacion' + sucursal + ' SET ?';

    const CotizacionesObj = {
        id_vendedor: req.body.id_vendedor,
        id_cliente: req.body.id_cliente,
        descuento: req.body.descuento
    }


    connection.query(sql, CotizacionesObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Cotizacion creada'});

    });
}


const updateCotizaciones = (req, res) => {
    const { id, sucursal } = req.params;
    const { id_vendedor, id_cliente, descuento, vendido } = req.body;


    const sql = `UPDATE cotizacion${sucursal} SET
        id_vendedor = ${id_vendedor},
        id_cliente = ${id_cliente},
        descuento = "${descuento}",
        vendido = ${vendido}
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Cotizacion actualizada'});
    });
}


const updateCotizacionesVendidas = (req, res) => {
    const { id, sucursal } = req.params;


    const sql = `UPDATE cotizacion${sucursal} SET
        vendido = 1
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Cotizacion actualizada'});
    });
}


const deleteCotizaciones = (req, res) => {
    const { id, sucursal } = req.params;

    const sql = `UPDATE cotizacion${sucursal} c
                INNER JOIN producto_cotizado${sucursal} pc
                ON c.id = pc.id_cotizacion
                SET c.eliminado = 1, pc.eliminado = 1
                WHERE c.id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Cotizacion eliminada'});
    });
}

module.exports = {
    getAllCotizaciones,
    getAllCotizacionesByIdCliente,
    getCotizaciones,
    saveCotizaciones,
    updateCotizaciones,
    updateCotizacionesVendidas,
    deleteCotizaciones
}