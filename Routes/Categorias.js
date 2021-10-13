const conecction = require('../conexcionDB');


const getAllCategories = (req, res) => {

    const sql = 'SELECT * FROM categorias';

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}

const getCategory = (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM categorias WHERE id = ${id}`;

    conecction.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) res.json(results);
        else res.json({'mensaje':'No hay resultados'})
    });
}


const saveCategory = (req, res) => {
    const sql = 'INSERT INTO categorias SET ?';

    const categoriaObj = {
        nombre: req.body.nombre
    }

    conecction.query(sql, categoriaObj, error => {
        if (error) throw error;
        res.json({'mensaje':'Categoria creada'});

    });
}


const updateCategory = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;


    const sql = `UPDATE categorias SET 
        nombre = '${nombre}' WHERE id = ${id}`;

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Categoria actualizada'});
    });
}


const deleteCategory = (req, res) => {
    
    const {id } = req.params;
    const sql = `DELETE FROM categorias WHERE id = ${id}`

    conecction.query(sql, error => {
        if (error) throw error;
        res.json({'mensaje':'Categoria eliminada'});
    });
}


module.exports = {
    getAllCategories,
    getCategory,
    saveCategory,
    updateCategory,
    deleteCategory
}