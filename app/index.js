import express from "express";

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log("Puerto corriendo");
});

//configuración
app.use(express.static(__dirname + "/public"));

//Routes
app.get("/", (req,res)=> res.sendFile(__dirname + "/pages/index.html"));