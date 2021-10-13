const conecction = require('../conexcionDB');

const getAllVendedores = (req, res) => {
    const sql = 'SELECT * FROM vendedor WHERE eliminado = false';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'});
    });
}


const getVendedor = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM vendedor WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}

const CreateVendedor = (req, res) => {
    const sql = 'INSERT INTO vendedor SET ?';

    const VendedorObj = {
        nombre: req.body.nombre,
        ape_pat: req.body.ape_pat,
        ape_mat: req.body.ape_mat,
        telefono: req.body.telefono,
        correo: req.body.correo
    }

    conecction.query(sql, VendedorObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Nuevo vendedor creado'});

    });
}


const updateVendedor = (req, res) => {
    const { id } = req.params;
    const { nombre, ape_pat, ape_mat,
        telefono, correo } = req.body;

    const sql = `UPDATE vendedor SET
        nombre = '${nombre}',
        ape_pat = '${ape_pat}',
        ape_mat = '${ape_mat}',
        telefono = '${telefono}',
        correo = '${correo}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Vendedor actualizado'});
    });
}


const deleteVendedor = (req, res) => {
    
    const {id } = req.params;
    const sql = `UPDATE vendedor SET eliminado = true WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Vendedor eliminado'});
    });
}

module.exports = {
    getAllVendedores,
    getVendedor,
    CreateVendedor,
    updateVendedor,
    deleteVendedor
}