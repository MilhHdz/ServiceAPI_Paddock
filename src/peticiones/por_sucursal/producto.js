const connection = require('./../../../conexcionDB');


const getAllProducts = (req, res) => {
    const { sucursal } = req.params
    const sql = 'SELECT * FROM producto' + sucursal;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getProduct = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM producto${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const saveProduct = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO producto' + sucursal + ' SET ?';

    const productoObj = {
        nombre: req.body.nombre,
        unidad_de_medida: req.body.unidad_de_medida,
        tipo_de_producto: req.body.tipo_de_producto,
        clave_sat: req.body.clave_sat,
        linea: req.body.linea,
        categoria: req.body.categoria,
        parte: req.body.parte,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        proveedor: req.body.proveedor,
        factura: req.body.factura
    }

    connection.query(sql, productoObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Producto creado'});
    });
}


const updateProduct = (req, res) => {
    const { id, sucursal } = req.params;
    const { nombre, unidad_de_medida, tipo_de_producto,
        clave_sat, linea, categoria, parte,
        precio, cantidad, proveedor, factura } = req.body;


    const sql = `UPDATE producto${sucursal} SET 
        nombre = '${nombre}',
        unidad_de_medida = '${unidad_de_medida}',
        tipo_de_producto = '${tipo_de_producto}',
        clave_sat = '${clave_sat}',
        linea = '${linea}',
        categoria = '${categoria}',
        parte = '${parte}',
        precio = '${precio}',
        cantidad = '${cantidad}',
        proveedor = '${proveedor}',
        factura = '${factura}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto actualizado'});
    });
}


const updateProductStock = (req, res) => {
    const { id, sucursal, cantidad } = req.params;
    // const { cantidad } = req.body;

    const sql = `UPDATE producto${sucursal} SET cantidad = '${cantidad}' WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto actualizado'});
    });
} 


const deleteProduct = (req, res) => {
    const { id, sucursal } = req.params;
    const sql = `DELETE FROM producto${sucursal} WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Producto eliminado'});
    });
}

module.exports = {
    getAllProducts,
    getProduct,
    saveProduct,
    updateProductStock,
    updateProduct,
    deleteProduct
}
