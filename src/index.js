const express = require("express");
const bodyParser = require("body-parser");
const v1PersonajeRouter = require("./v1/routes/narutoRoutes");
const apicache = require("apicache");
const cors = require("cors");
const client = require("./database/cassandraClient"); 

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

const whitelist = ["http://localhost:4200", "http://otrodominio.com"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"), false);
        }
    },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cache("1 minutes"));
app.use("/api/v1/personajes", v1PersonajeRouter);

client.connect()
    .then(() => {
        console.log('Conexión con Cassandra exitosa.');
        app.listen(PORT, () => {
            console.log(`API is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se pudo conectar a Cassandra:", error);
    });
