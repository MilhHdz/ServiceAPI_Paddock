const conecction = require('../conexcionDB');


const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM productos';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getProduct = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM productos WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveProduct = (req, res) => {
    const sql = 'INSERT INTO productos SET ?';

    const productoObj = {
        nombre: req.body.nombre,
        unidadmedida: req.body.unidadmedida,
        tipo: req.body.tipo,
        linea: req.body.linea,
        categoria: req.body.categoria,
        parte: req.body.parte,
        precio: req.body.precio,
        uni_9na: req.body.uni_9na,
        uni_pan: req.body.uni_pan,
        uni_sup: req.body.uni_sup,
        proveedor: req.body.proveedor,
        factura: req.body.factura
    }

    conecction.query(sql, productoObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Producto creado'});
    });
}


const updateProduct = (req, res) => {
    const { id } = req.params;
    const { nombre, unidadmedida, tipo,
        linea, categoria, parte,
        precio, uni_9na, uni_pan,
        uni_sup, proveedor, factura } = req.body;


    const sql = `UPDATE productos SET 
        nombre = '${nombre}',
        unidadmedida = '${unidadmedida}',
        tipo = '${tipo}',
        linea = '${linea}',
        categoria = '${categoria}',
        parte = '${parte}',
        precio = '${precio}',
        uni_9na = '${uni_9na}',
        uni_pan = '${uni_pan}',
        uni_sup = '${uni_sup}',
        proveedor = '${proveedor}',
        factura = '${factura}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Producto actualizado'});
    });
}


const deleteProduct = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM productos WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Producto eliminado'});
    });
}

module.exports = {
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}