const conecction = require('../conexcionDB');


const getAllProductoCotizado = (req, res) => {
    const sql = 'SELECT * FROM producto_cotizado';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getAllProductoCotizadoByIdCotizacion = (req, res) => {
    const { id_cotizacion } = req.params
    const sql = `SELECT * FROM producto_cotizado WHERE id_cotizacion = ${id_cotizacion}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getProductoCotizado = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM producto_cotizado WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveProducto = (req, res) => {
    const sql = 'INSERT INTO producto_cotizado (id_cotizacion, id_producto, cantidad) VALUES ?';


    conecction.query(sql, [req.body.producto_cotizado], error => {
        if (error) throw error;
        res.json({'mensaje':'Producto Cotizado Exitosamente'});

    });
}


const updateProductoCotizado = (req, res) => {
    const { id } = req.params;
    const { id_cotizacion, id_producto, cantidad } = req.body;


    const sql = `UPDATE producto_cotizado SET
        id_cotizacion = '${id_cotizacion}',
        id_producto = '${id_producto}',
        cantidad = '${cantidad}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Actualización Exitosa'});
    });
}


const deleteProductoCotizado = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM producto_cotizado WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Producto eliminado'});
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
