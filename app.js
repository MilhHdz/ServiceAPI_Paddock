const bodyParser = require('body-parser');
const express = require('express');
const conecction = require('./conexcionDB');
const cors = require('cors');
const htpp = require('request');

const ruta = './src/peticiones/';
// Peticiones
const CATEGORIA = require(ruta + 'categoria');
const ARMADORA = require(ruta + 'armadora');
const DESCRIPCION = require(ruta + 'descripcion');
const LINEA = require(ruta + 'linea');
const MODELO = require(ruta + 'modelo');
const METODO_DE_PAGO = require(ruta + 'metodo_de_pago');
const UNIDAD_DE_MEDIDA = require(ruta + 'unidad_de_medida');
const SUCURSAL = require(ruta + 'sucursal');
const VENDEDOR = require(ruta + 'vendedor');
const LOGIN = require(ruta + 'login');
const ROL = require(ruta + 'rol');
const TRANSFER = require(ruta + 'transferencia');


const sagaji = require('./Routes/Sagaji');

por_sucursal = ruta + 'por_sucursal/';

const CLIENTE = require(por_sucursal + 'cliente');
const PROVEEDOR = require(por_sucursal + 'proveedor');
const FACTURA = require(por_sucursal + 'factura');
const PRODUCTO = require(por_sucursal + 'producto');
const COTIZACION = require(por_sucursal + 'cotizacion');
const PRODUCTO_COTIZADO = require(por_sucursal + 'producto_cotizado');
const PRODUCTO_VENDIDO = require(por_sucursal + 'producto_vendido');
const VENTA = require(por_sucursal + 'venta');



const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors(), bodyParser.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Welcome');
});


app.post('/login', LOGIN.Login)


// PRODUCTOS
app.get('/product/:sucursal/', PRODUCTO.getAllProducts);
app.get('/product/:sucursal/:id', PRODUCTO.getProduct);
app.post('/product/:sucursal/', PRODUCTO.saveProduct);
app.put('/product/:sucursal/:id', PRODUCTO.updateProduct);
app.put('/products/:sucursal/:id/:cantidad', PRODUCTO.updateProductStock);
app.delete('/product/:sucursal/:id', PRODUCTO.deleteProduct);


// CATEGORIAS
app.get('/category/', CATEGORIA.getAllCategories);
app.get('/category/:id', CATEGORIA.getCategory);
app.post('/category/', CATEGORIA.saveCategory);
app.put('/category/:id', CATEGORIA.updateCategory);
app.delete('/category/:id', CATEGORIA.deleteCategory);


// ARMADORAS
app.get('/armadora/', ARMADORA.getAllArmadora);
app.get('/armadora/:id', ARMADORA.getArmadora);
app.post('/armadora/', ARMADORA.saveArmadora);
app.put('/armadora/:id', ARMADORA.updateArmadora);
app.delete('/armadora/:id', ARMADORA.deleteArmadora);


// LINEAS
app.get('/linea/', LINEA.getAllLinea);
app.get('/linea/:id', LINEA.getLinea);
app.post('/linea/', LINEA.saveLinea);
app.put('/linea/:id', LINEA.updateLinea);
app.delete('/linea/:id', LINEA.deleteLinea);


// CLIENTES
app.get('/cliente/:sucursal', CLIENTE.getAllCliente);
app.get('/cliente/:sucursal/:id', CLIENTE.getCliente);
app.post('/cliente/:sucursal', CLIENTE.saveCliente);
app.put('/cliente/:sucursal/:id', CLIENTE.updateCliente);
app.delete('/cliente/:sucursal/:id', CLIENTE.deleteCliente);


// PROVEEDORES
app.get('/proveedor/:sucursal/', PROVEEDOR.getAllProveedor);
app.get('/proveedor/:sucursal/:id', PROVEEDOR.getProveedor);
app.post('/proveedor/:sucursal/', PROVEEDOR.saveProveedor);
app.put('/proveedor/:sucursal/:id', PROVEEDOR.updateProveedor);
app.delete('/proveedor/:sucursal/:id', PROVEEDOR.deleteProveedor);


// FACTURAS
app.get('/factura/:sucursal/', FACTURA.getAllFactura);
app.get('/factura/:sucursal/:id', FACTURA.getFactura);
app.get('/facturap/:sucursal/:id_proveedor', FACTURA.getAllFacturaByProveedor);
app.post('/factura/:sucursal/', FACTURA.saveFactura);
app.put('/factura/:sucursal/:id', FACTURA.updateFactura);
app.delete('/factura/:sucursal/:id', FACTURA.deleteFactura);


// PRODUCTO COTIZADO
app.get('/producto-cotizado/:sucursal/', PRODUCTO_COTIZADO.getAllProductoCotizado);
app.get('/producto-cotizado/:sucursal/cotizacion/:id_cotizacion', PRODUCTO_COTIZADO.getAllProductoCotizadoByIdCotizacion);
app.get('/producto-cotizado/:sucursal/:id', PRODUCTO_COTIZADO.getProductoCotizado);
app.post('/producto-cotizado/:sucursal/', PRODUCTO_COTIZADO.saveProducto);
app.put('/producto-cotizado/:sucursal/:id', PRODUCTO_COTIZADO.updateProductoCotizado);
app.delete('/producto-cotizado/:sucursal/:id', PRODUCTO_COTIZADO.deleteProductoCotizado);


// COTIZACION
app.get('/cotizacion/:sucursal/', COTIZACION.getAllCotizaciones);
app.get('/cotizacion/:sucursal/cliente/:id_cliente', COTIZACION.getAllCotizacionesByIdCliente);
app.get('/cotizacion/:sucursal/:id', COTIZACION.getCotizaciones);
app.post('/cotizacion/:sucursal/', COTIZACION.saveCotizaciones);
app.put('/cotizacion/:sucursal/:id', COTIZACION.updateCotizaciones);
app.get('/cotizacions/:sucursal/:id', COTIZACION.updateCotizacionesVendidas);
app.delete('/cotizacion/:sucursal/:id', COTIZACION.deleteCotizaciones);


// METODOS DE PAGO
app.get('/metodo_pago', METODO_DE_PAGO.getAllMetodoPago);


// UNIDAD DE MEDIDA
app.get('/unidad_de_medida/', UNIDAD_DE_MEDIDA.getAllUnidadDeMedida);


// VENDEDORES
app.get('/vendedor/sucursal/:id', VENDEDOR.getAllVendedores);
app.get('/vendedor/:id', VENDEDOR.getVendedor);
app.post('/vendedor', VENDEDOR.saveVendedor);
app.put('/vendedor/:id', VENDEDOR.updateVendedor);
app.delete('/vendedor/:id', VENDEDOR.deleteVendedor);


// PRODUCTO VENDIDO
app.get('/producto-vendido/:sucursal/', PRODUCTO_VENDIDO.getAllProductoVendido);
app.get('/producto-vendido/:sucursal/venta/:id_venta', PRODUCTO_VENDIDO.getAllProductoVendidoByIdVenta);
app.get('/producto-vendido/:sucursal/:id', PRODUCTO_VENDIDO.getProductoVendido);
app.post('/producto-vendido/:sucursal/', PRODUCTO_VENDIDO.saveProducto);
app.put('/producto-vendido/:sucursal/:id', PRODUCTO_VENDIDO.updateProductoVendido);
app.delete('/producto-vendido/:sucursal/:id', PRODUCTO_VENDIDO.deleteProductoVendido);


// VENTAS
app.get('/venta/:sucursal/', VENTA.getAllVentas);
app.get('/venta/:sucursal/cliente/:id_cliente', VENTA.getAllVentasByIdCliente);
app.get('/venta/:sucursal/:id', VENTA.getVentas);
app.post('/venta/:sucursal/', VENTA.saveVentas);
app.put('/venta/:sucursal/:id', VENTA.updateVentas);
app.delete('/venta/:sucursal/:id', VENTA.deleteVentas);


// ROLEs
app.get('/rol', ROL.getAllRol);


// MODELOS
app.get('/modelo/', MODELO.getAllModelos);


// SUCURSAL
app.get('/sucursal/', SUCURSAL.getAllSucursal);


// DESCRIPCION
app.get('/descripcion/', DESCRIPCION.getAllDescription);

// TRANSFERENCIA
app.get('/transferencia/', TRANSFER.getAllTransfer);
app.post('/transferencia/', TRANSFER.saveTransfer);


// SAGAJI
app.get('/sagaji/:tipo', sagaji.getSelect2);
app.get('/sagaji/:tipo/:primera', sagaji.getSelect3);
app.get('/sagaji/:tipo/:primera/:segunda', sagaji.getSelect4);
app.get('/sagaji/:tipo/:primera/:segunda/:tercera/:pagina', sagaji.searchProduct);
app.post('/info', sagaji.getCredentials);
app.get('/test', sagaji.test);


app.get('/aplicaciones/:clproducto', sagaji.getAplications);
app.get('/equivalentes/:clproducto', sagaji.getEquivalences);


// mysql://b443f318a9f91e:46259865@us-cdbr-east-03.cleardb.com/heroku_4bd69bbb2cbb271?reconnect=true

conecction.query('select 1 + 1', (err, rows) => { /* */ });


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
