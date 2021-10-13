const connection = require('./../../../conexcionDB');
const agent = require('random-useragent');
const puppeteer = require('puppeteer');



const getAllCliente = (req, res) => {
    const { sucursal } = req.params
    const sql = 'SELECT * FROM cliente' + sucursal + ' WHERE eliminado = false';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const getCliente = (req, res) => {
    const { id, sucursal } = req.params
    const sql = `SELECT * FROM cliente${sucursal} WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        else if (results.length > 0) res.json({'code':200, 'result':results});
        else res.json({'code':404, 'result':'No hay resultados'});
    });
}


const init = async (razon_social, rfc, calle, num_ext, num_int, colonia, municipio, estado, cp, correo) => {
    const header = agent.getRandom();

    const browser = await puppeteer.launch();

    new_page = await browser.newPage();

    await new_page.setUserAgent(header);
    await new_page.setViewport({ width: 1050, height: 750 });

    const url_sesion = 'http://facturorapido.com/cfdi33/iniciar_sesion.php?id_user=';
    const url_new_client = 'http://facturorapido.com/cfdi33/aclientes.php?id_user=1';

    await new_page.goto(url_sesion);

    const input_user = await new_page.waitForSelector('input[name=user]');
    const input_pass = await new_page.waitForSelector('input[name=pass]');

    await input_user.type('prueba');
    await input_pass.type('1234');

    await new_page.click('input[name=submit]');

    await new_page.goto(url_new_client);

    const input_Razon = await new_page.waitForSelector('input[name=razon_social]');
    const input_RFC = await new_page.waitForSelector('input[name=rfc]');
    const select_Residencia = await new_page.waitForSelector('select[name=resfiscal]');
    const input_Calle = await new_page.waitForSelector('input[name=calle]');
    const input_Num_ext = await new_page.waitForSelector('input[name=num_ext]');
    const input_Num_int = await new_page.waitForSelector('input[name=num_int]');
    const input_Colonia = await new_page.waitForSelector('input[name=colonia]');
    const input_Municipio = await new_page.waitForSelector('input[name=ciudad]');
    const input_Estado = await new_page.waitForSelector('input[name=estado]');
    const input_Codigo = await new_page.waitForSelector('input[name=cp]');
    const select_País = await new_page.waitForSelector('select[name=pais]');
    const input_Correo = await new_page.waitForSelector('input[name=correo]');
    const input_copia = await new_page.waitForSelector('input[name=copia]');


    await input_Razon.type(razon_social);
    await input_RFC.type(rfc);
    await select_Residencia.select('MEX');

    await new_page.on('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.dismiss()
    });

    await input_Calle.type(calle);
    await input_Num_ext.click({ clickCount: 3 });
    await input_Num_ext.type(num_ext);
    await input_Num_int.click({ clickCount: 3 });
    await input_Num_int.type(num_int);
    await input_Colonia.type(colonia);
    await input_Municipio.type(municipio);
    await input_Estado.type(estado);
    await input_Codigo.type(cp);
    await select_País.select('MEX');
    await input_Correo.type(correo);
    await input_copia.type(correo);

    await new_page.click('input[name=button]');

    console.log('test');

    await browser.close();
}


const saveCliente = (req, res) => {
    const { sucursal } = req.params
    const sql = 'INSERT INTO cliente' + sucursal+ ' SET ?';

    init(req.body.razon_social, req.body.rfc, req.body.calle, req.body.num_ext, req.body.num_int, req.body.colonia, req.body.municipio, req.body.estado, req.body.cp, req.body.correo);

    const clienteObj = {
        nombre: req.body.nombre,
        ape_pat: req.body.ape_pat,
        ape_mat: req.body.ape_mat,
        correo: req.body.correo,
        telefono: req.body.telefono,
        razon_social: req.body.razon_social,
        rfc: req.body.rfc,
        calle: req.body.calle,
        num_ext: req.body.num_ext,
        num_int: req.body.num_int,
        colonia: req.body.colonia,
        municipio: req.body.municipio,
        estado: req.body.estado,
        cp: req.body.cp,
    }

    connection.query(sql, clienteObj, (error, results) => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'result':results.insertId, 'message':'Cliente creado'});
    });
}


const updateCliente = (req, res) => {
    const { id, sucursal } = req.params;
    const { nombre, ape_pat, ape_mat,
        telefono, correo } = req.body;

    const sql = `UPDATE cliente${sucursal} SET
        nombre = '${nombre}',
        ape_pat = '${ape_pat}',
        ape_mat = '${ape_mat}',
        telefono = '${telefono}',
        correo = '${correo}'
        WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Cliente actualizado'});
    });
}


const deleteCliente = (req, res) => {
    
    const { id, sucursal } = req.params;
    const sql = `DELETE FROM cliente${sucursal} WHERE id = ${id}`

    connection.query(sql, error => {
        if (error) res.json({'code':500, 'message':error});
        else res.json({'code':200, 'message':'Cliente eliminado'});
    });
}

module.exports = {
    getAllCliente,
    getCliente,
    saveCliente,
    updateCliente,
    deleteCliente
}