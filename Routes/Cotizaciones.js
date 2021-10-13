// id	creado	id_trabajado	id_cliente	descuento	vendido

const conecction = require('../conexcionDB');


const getAllCotizaciones = (req, res) => {
    const sql = 'SELECT * FROM cotizacion';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getAllCotizacionesByIdCliente = (req, res) => {
    const { id_cliente } = req.params;
    const sql = `SELECT * FROM cotizacion WHERE id_cliente = ${id_cliente}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}



const getCotizaciones = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM cotizacion WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveCotizaciones = (req, res) => {
    const sql = 'INSERT INTO cotizacion SET ?';

    const CotizacionesObj = {
        id_trabajado: req.body.id_trabajado,
        id_cliente: req.body.id_cliente,
        descuento: req.body.descuento
    }


    conecction.query(sql, CotizacionesObj, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.json({'mensaje':'Cotizacion Guardada', 'id':results.insertId});

    });
}


const updateCotizaciones = (req, res) => {
    const { id } = req.params;
    const { id_trabajado, id_cliente, descuento, vendido } = req.body;


    const sql = `UPDATE cotizacion SET
        id_trabajado = ${id_trabajado},
        id_cliente = ${id_cliente},
        descuento = ${descuento},
        vendido = ${vendido}
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Actualización Exitosa'});
    });
}


const deleteCotizaciones = (req, res) => {
    
    const {id } = req.params;
    const sql = `delete cotizacion, producto_cotizado
                from cotizacion
                join producto_cotizado
                on cotizacion .id = producto_cotizado.id_cotizacion 
                where producto_cotizado.id_cotizacion = ${id};`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Cotizacion eliminada'});
    });
}

module.exports = {
    getAllCotizaciones,
    getAllCotizacionesByIdCliente,
    getCotizaciones,
    saveCotizaciones,
    updateCotizaciones,
    deleteCotizaciones
}
