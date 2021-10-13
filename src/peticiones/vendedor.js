const connection = require('../../conexcionDB');

const getAllVendedores = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM vendedor WHERE eliminado = false AND id_sucursal = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const getVendedor = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM vendedor WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}

const saveVendedor = (req, res) => {
    const sql = 'INSERT INTO vendedor SET ?';

    const VendedorObj = {
        nombre: req.body.nombre,
        ape_pat: req.body.ape_pat,
        ape_mat: req.body.ape_mat,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        id_sucursal: req.body.id_sucursal,
        id_rol: req.body.id_rol
    }

    connection.query(sql, VendedorObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Vendedor creado'});

    });
}


const updateVendedor = (req, res) => {
    const { id } = req.params;
    const { nombre, ape_pat, ape_mat,
        telefono, correo, contraseña,
        id_sucursal, id_rol } = req.body;

    const sql = `UPDATE vendedor SET
        nombre = '${nombre}',
        ape_pat = '${ape_pat}',
        ape_mat = '${ape_mat}',
        telefono = '${telefono}',
        correo = '${correo}',
        contraseña = '${contraseña}',
        id_sucursal = ${id_sucursal},
        id_rol = '${id_rol}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Vendedor actualizado'});
    });
}


const deleteVendedor = (req, res) => {
    
    const {id } = req.params;
    const sql = `UPDATE vendedor SET eliminado = true WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Vendedor eliminado'});
    });
}

module.exports = {
    getAllVendedores,
    getVendedor,
    saveVendedor,
    updateVendedor,
    deleteVendedor
}