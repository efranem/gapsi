const Koa = require("koa");
var bodyParser = require("koa-body-parser");
const cors = require("@koa/cors");

// carga de propiedades
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

const app = (module.exports = new Koa());

//Configuraciones

const proveedores = require("./proveedores.js");

app.use(bodyParser());
app.use(cors());

app.use(proveedores.routes());

//app.listen(3000);

//incio el servidor
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
