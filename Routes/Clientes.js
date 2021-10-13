const conecction = require('../conexcionDB');


const getAllCliente = (req, res) => {
    const sql = 'SELECT * FROM cliente';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getCliente = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM cliente WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveCliente = (req, res) => {
    const sql = 'INSERT INTO cliente SET ?';

    const clienteObj = {
        nombre: req.body.nombre,
        ape_pat: req.body.ape_pat,
        ape_mat: req.body.ape_mat,
        telefono: req.body.telefono,
        correo: req.body.correo
    }

    conecction.query(sql, clienteObj, error => {
        if (error) throw error;
        res.json({'mensaje':'cliente creado'});

    });
}


const updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, ape_pat, ape_mat,
        telefono, correo } = req.body;

    const sql = `UPDATE cliente SET
        nombre = '${nombre}',
        ape_pat = '${ape_pat}',
        ape_mat = '${ape_mat}',
        telefono = '${telefono}',
        correo = '${correo}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Cliente actualizado'});
    });
}


const deleteCliente = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM cliente WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Cliente eliminado'});
    });
}

module.exports = {
    getAllCliente,
    getCliente,
    saveCliente,
    updateCliente,
    deleteCliente
}