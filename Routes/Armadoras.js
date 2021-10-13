const conecction = require('../conexcionDB');


const getAllArmadora = (req, res) => {
    const sql = 'SELECT id, nombre FROM armadoras';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const getArmadora = (req, res) => {
    const { id } = req.params
    const sql = `SELECT id, nombre FROM armadoras WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveArmadora = (req, res) => {
    const sql = 'INSERT INTO armadoras SET ?';

    const armadoraObj = {
        // clave: req.body.clave,
        nombre: req.body.nombre
    }

    conecction.query(sql, armadoraObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Armadora creada'});

    });
}


const updateArmadora = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;


    // clave = '${clave}', 
    const sql = `UPDATE armadoras SET
        nombre = '${nombre}'
        WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Armadora actualizada'});
    });
}


const deleteArmadora = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM armadoras WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Armadora eliminada'});
    });
}

module.exports = {
    getAllArmadora,
    getArmadora,
    saveArmadora,
    updateArmadora,
    deleteArmadora
}