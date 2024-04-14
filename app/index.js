import { scrypt } from "crypto";
import express from "express";

//Fix para __direname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication } from "./controllers/authentication.controller.js"
import { methods as authorization } from "./middlewares/authorization.js";

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log("Puerto corriendo");
});

//configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json())


//Routes
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/index.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/login", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/register", authentication.register)
app.post("/api/login", authentication.login)