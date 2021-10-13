const connection = require('./../../../conexcionDB');


const getAllProductoCotizado = (req, res) => {
    const { sucursal } = req.params;
    const sql = 'SELECT * FROM producto_cotizado' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getAllProductoCotizadoByIdCotizacion = (req, res) => {
    const { id_cotizacion, sucursal } = req.params
    const sql = `SELECT * FROM producto_cotizado${sucursal} WHERE id_cotizacion = ${id_cotizacion} AND eliminado = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getProductoCotizado = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM producto_cotizado${sucursal} WHERE id = ${id} AND eliminado = 0`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveProducto = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO producto_cotizado' + sucursal + ' (id_cotizacion, id_producto, precio, cantidad, descuento, costo) VALUES ?';


    connection.query(sql, [req.body.producto_cotizado], (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Producto cotizado creado'});

    });
}


const updateProductoCotizado = (req, res) => {
    const { id, sucursal } = req.params;
    const { id_cotizacion, id_producto, precio, cantidad, descuento } = req.body;


    const sql = `UPDATE producto_cotizado${sucursal} SET
        id_cotizacion = '${id_cotizacion}',
        id_producto = '${id_producto}',
        precio = '${precio}',
        cantidad = '${cantidad}',
        descuento = '${descuento}',
        costo = '${costo}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto cotizado actualizado'});
    });
}


const deleteProductoCotizado = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `UPDATE producto_cotizado${sucursal} SET eliminado = 1 WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto cotizado eliminado'});
    });
}

module.exports = {
    getAllProductoCotizado,
    getAllProductoCotizadoByIdCotizacion,
    getProductoCotizado,
    saveProducto,
    updateProductoCotizado,
    deleteProductoCotizado
}
