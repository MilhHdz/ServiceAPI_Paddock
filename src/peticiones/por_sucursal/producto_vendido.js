const connection = require('./../../../conexcionDB');


const getAllProductoVendido = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'SELECT * FROM producto_vendido' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getAllProductoVendidoByIdVenta = (req, res) => {
    const { id_venta, sucursal } = req.params
    const sql = `SELECT * FROM producto_vendido${sucursal} WHERE id_venta = ${id_cotizacion} AND cancelado = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getProductoVendido = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM producto_vendido${sucursal} WHERE id = ${id} AND cancelado = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveProducto = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO producto_vendido' + sucursal + ' (id_venta, id_producto, precio, cantidad, descuento, costo) VALUES ?';


    connection.query(sql, [req.body.producto_vendido], (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Producto(s) se a(n) registrado'});

    });
}


const updateProductoVendido = (req, res) => {
    const { id, sucursal } = req.params;
    const { id_venta, id_producto, precio, cantidad, descuento, costo } = req.body;


    const sql = `UPDATE producto_vendido${sucursal} SET
        id_venta = '${id_venta}',
        id_producto = '${id_producto}',
        precio = '${precio}',
        cantidad = '${cantidad}',
        descuento = '${descuento}',
        costo = '${costo}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto actualizado'});
    });
}


const deleteProductoVendido = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `UPDATE producto_vendido${sucursal} SET cancelado = 1 WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto cancelado'});
    });
}

module.exports = {
    getAllProductoVendido,
    getAllProductoVendidoByIdVenta,
    getProductoVendido,
    saveProducto,
    updateProductoVendido,
    deleteProductoVendido
}
