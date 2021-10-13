const request = require('request');

let cookie = '';

const getSelect2 = (req, res) => {
    const { tipo } = req.params;
    url = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=CategoriaProductos&tipo=' + tipo;

    request(url, function (error, response, body) {
        res.json(JSON.parse(body));
    })
}


const getSelect3 = (req, res) => {
    const { tipo, primera } = req.params;
    url = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=CategoriaProductos&tipo=' + tipo
        + '&primera=' + primera;

    request(url, function (error, response, body) {
        res.json(JSON.parse(body));
    })

}


const getSelect4 = (req, res) => {
    const { tipo, primera, segunda } = req.params;
    url = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=CategoriaProductos&tipo=' + tipo
        + '&primera=' + primera + '&segunda=' + segunda;

    request(url, function (error, response, body) {
        res.json(JSON.parse(body));
    })

}


const searchProduct = (req, res) => {
    const { tipo, primera, segunda, tercera, pagina } = req.params;
    url_sgj = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=BusquedaProductosCategoria&tipo=' + tipo
        + '&primera=' + primera + '&segunda=' + segunda
        + '&tercera=' + tercera
        + '&cuarta=&pagina=' + pagina;

    request(url_sgj, function (error, response, body) {
        res.json(JSON.parse(body));
    })

}


const getAplications = (req, res) => {
    const { clproducto } = req.params;
    url = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=Aplicaciones&clproducto=' + clproducto;

    request(url,
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
}


const getEquivalences = (req, res) => {
    const { clproducto } = req.params;
    url = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=ProductosEquivalentes&clproducto=' + clproducto;

    request(url,
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
}

const getCredentials = (req, res) => {
    url_sgj = 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=IniciaSesion&cllogin=0079697&password=MARINA14';

    request(url_sgj, function (error, response, body) {
        cookie = response.headers['set-cookie'][0];
        res.json("Loggeado");
    })
}

const test = (req, res) => {
    console.log(cookie)
    request({
        headers: {
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://ecommerce.sagaji.com.mx/sagaji/MVC?id=BusquedaProductosCategoriaLogin&tipo=DescripcionModeloLinea&primera=13%2C765&segunda=6001&tercera=60&cuarta=&pagina=0'
      }, function (error, response, body) {
        // console.log(body);
        res.json(JSON.parse(body));
      });
}


module.exports = {
    getSelect2,
    getSelect3,
    getSelect4,
    searchProduct,
    getAplications,
    getEquivalences,
    getCredentials,
    test
}
