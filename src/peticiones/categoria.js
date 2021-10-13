const connection = require('../../conexcionDB');


const getAllCategories = (req, res) => {

    const sql = 'SELECT * FROM categoria';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const getCategory = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM categoria WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'})
    });
}


const saveCategory = (req, res) => {
    const sql = 'INSERT INTO categoria SET ?';

    const categoriaObj = {
        nombre: req.body.nombre
    }

    connection.query(sql, categoriaObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Categoria creada'});
    });
}


const updateCategory = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;


    const sql = `UPDATE categoria SET 
        nombre = '${nombre}' WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Categoria actualizada'});
    });
}


const deleteCategory = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM categoria WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Categoria eliminada'});
    });
}

module.exports = {
    getAllCategories,
    getCategory,
    saveCategory,
    updateCategory,
    deleteCategory
}