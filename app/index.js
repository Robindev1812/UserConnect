import { scrypt } from "crypto";
import express from "express";

//Fix para __direname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication } from "./pages/controllers/authentication.controller.js"

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
app.get("/register", (req, res) =>
  res.sendFile(__dirname + "/pages/register.html")
);
app.get("/login", (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.post("/api/register", authentication.register)
app.post("/api/login", authentication.login)