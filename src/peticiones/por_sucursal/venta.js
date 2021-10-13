const connection = require('./../../../conexcionDB');


const getAllVentas = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'SELECT * FROM venta' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getAllVentasByIdCliente = (req, res) => {
    const { id_cliente, sucursal } = req.params;
    const sql = `SELECT * FROM venta${sucursal} WHERE id_cliente = ${id_cliente} AND vendido = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}



const getVentas = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `SELECT * FROM venta${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveVentas = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'INSERT INTO venta' + sucursal + ' SET ?';

    const VentasObj = {
        id_cotizacion: req.body.id_cotizacion,
        id_cliente: req.body.id_cliente,
        id_vendedor: req.body.id_vendedor,
        id_metodo_pago: req.body.id_metodo_pago,
        descuento: req.body.descuento,
        subtotal: req.body.subtotal,
        total: req.body.total,
        dinero_recivido: req.body.dinero_recivido,
        cambio: req.body.cambio
    }


    connection.query(sql, VentasObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'venta creada'});

    });
}


const updateVentas = (req, res) => {
    const { id, sucursal } = req.params;
    const { id_cotizacion, id_cliente, id_vendedor, id_metodo_pago, descuento, subtotal, total, dinero_recivido, cambio } = req.body;


    const sql = `UPDATE venta${sucursal} SET
                id_cotizacion = ${id_cotizacion},
                id_cliente = ${id_cliente},
                id_vendedor = ${id_vendedor},
                id_metodo_pago = ${id_metodo_pago},
                descuento = "${descuento}",
                subtotal = "${subtotal}",
                total = "${total}",
                dinero_recivido = "${dinero_recivido}",
                cambio = "${cambio}"
                WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'venta actualizada'});
    });
}


const deleteVentas = (req, res) => {
    const { id, sucursal } = req.params;

    const sql = `UPDATE venta${sucursal} v
                INNER JOIN producto_vendido${sucursal} pv
                ON v.id = pv.id_venta
                SET v.cancelado = 1, pv.cancelado = 1
                WHERE v.id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'venta cancelada'});
    });
}

module.exports = {
    getAllVentas,
    getAllVentasByIdCliente,
    getVentas,
    saveVentas,
    updateVentas,
    deleteVentas
}