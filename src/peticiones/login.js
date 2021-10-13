const connection = require('../../conexcionDB');


const Login = (req, res) => {
    const sql = `SELECT id_sucursal, id_rol, nombre FROM vendedor WHERE correo = "${req.body.correo}" AND contraseña = "${req.body.contraseña}"`;

    connection.query(sql, (error, results) => {
        if (error)res.json({'code':500, 'message':error});
        else if (results.length > 0) res.json({'code':200, 'sucursal':results[0].id_sucursal, 'rol':results[0].id_rol, 'nombre':results[0].nombre});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}

module.exports = {
    Login
}