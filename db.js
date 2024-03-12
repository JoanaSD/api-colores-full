require('dotenv').config();

const {MongoClient,ObjectId} = require("mongodb");

function conectar(){
    return MongoClient.connect(process.env.URL_MONGO);
}

function leerColores() {

    return new Promise (async (ok,ko) => {

        try{

            const conexion = await conectar();

            let coleccion = conexion.db("colores").collection("colores");

            let colores = await coleccion.find({}).toArray();

            conexion.close();

            ok(colores);

        }catch(error){

            ko({error: "error BBDD"});

        }

    });

}

function crearColor(color) {

    return new Promise (async (ok,ko) => {

        try{

            const conexion = await conectar();

            let coleccion = conexion.db("colores").collection("colores");

            let {insertedId} = await coleccion.insertOne(color);

            conexion.close();

            ok({id: insertedId});

        }catch(error){

            ko({error: "error BBDD"});

        }

    });

}

function borrarColor(id) {

    return new Promise (async (ok,ko) => {

        try{

            const conexion = await conectar();

            let coleccion = conexion.db("colores").collection("colores");

            let {deletedCount} = await coleccion.deleteOne({_id: new ObjectId(id)});

            conexion.close();

            ok(deletedCount);

        }catch(error){

            ko({error: "error BBDD"});

        }

    });

}

module.exports = {leerColores, crearColor, borrarColor};