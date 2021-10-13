const connection = require('../../conexcionDB');

const getAllArmadora = (req, res) => {
    const sql = 'SELECT id, nombre FROM armadora';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const getArmadora = (req, res) => {
    const { id } = req.params
    const sql = `SELECT id, nombre FROM armadora WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error)res.json({'code':500, 'message':error});
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const saveArmadora = (req, res) => {
    const sql = 'INSERT INTO armadora SET ?';

    const armadoraObj = {
        clave: req.body.clave,
        nombre: req.body.nombre
    }

    connection.query(sql, armadoraObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Armadora creada'});
    });
}


const updateArmadora = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    
    const sql = `UPDATE armadora SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Armadora actualizada'});
    });
}


const deleteArmadora = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM armadora WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Armadora eliminada'});
    });
}

module.exports = {
    getAllArmadora,
    getArmadora,
    saveArmadora,
    updateArmadora,
    deleteArmadora
}