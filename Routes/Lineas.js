const conecction = require('../conexcionDB');


const getAllLinea = (req, res) => {
    const sql = 'SELECT id, nombre FROM lineas';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getLinea = (req, res) => {
    const { id } = req.params
    const sql = `SELECT id, nombre FROM lineas WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveLinea = (req, res) => {
    const sql = 'INSERT INTO lineas SET ?';

    const lineaObj = {
        // clave: req.body.clave,
        nombre: req.body.nombre
    }

    conecction.query(sql, lineaObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Linea creada'});

    });
}


const updateLinea = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    // clave = '${clave}', 
    const sql = `UPDATE lineas SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Linea actualizada'});
    });
}


const deleteLinea = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM lineas WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Linea eliminada'});
    });
}

module.exports = {
    getAllLinea,
    getLinea,
    saveLinea,
    updateLinea,
    deleteLinea
}