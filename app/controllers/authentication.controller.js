import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
import { conecction } from "../database/db.js";

dotenv.config()


const getUsers = async function () {
  const [result] = await conecction.query('SELECT * FROM user_admin')
  return result
}

export const usuarios = await getUsers()

async function login(req, res) {

  const getUsers = async function () {
    const [result] = await conecction.query('SELECT * FROM user_admin')
    return result
  }
  const usuarios = await getUsers()

  console.log(req.body)
  const user = req.body.user
  const password = req.body.password

  if (!user || !password) {
    return res.status(400).send({
      status: "Error", message: "Los campos estan incompletos"
    })
  }

  const reviewUser = usuarios.find(usuario => usuario.name === user)
  if (!reviewUser) {
    return res.status(400).send({
      status: "Error", message: "Error al iniciar sesión"
    })
  }

  const successLogin = await bcryptjs.compare(password, reviewUser.password)
  if (!successLogin) {
    return res.status(400).send({ status: "Error", message: "Error durante login" })
  }

  console.log(successLogin)

  const token = jsonwebtoken.sign(
    { user: reviewUser.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION });

  const cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    path: "/"
  }
  res.cookie("jwt", token, cookieOption);
  res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
}



async function register(req, res) {

  const getUsers = async function () {
    const [result] = await conecction.query('SELECT * FROM user_admin')
    return result
  }
  const usuarios = await getUsers()

  console.log(req.body)
  const user = req.body.user
  const email = req.body.email
  const password = req.body.password

  if (!user || !email || !password) {
    return res.status(400).send({
      status: "Error", message: "Los campos estan incompletos"
    })
  }

  const reviewUser = usuarios.find(usuario => usuario.name === user)
  if (reviewUser) {
    return res.status(400).send({
      status: "Error", message: "El usuario ya existe"
    })
  }

  const saltUser = await bcryptjs.genSalt()
  const hashPassword = await bcryptjs.hash(password, saltUser)

  await conecction.query('INSERT INTO user_admin (name, email, password) VALUES (?, ?, ?)', [user, email, hashPassword])

  console.log(usuarios)
  return res.status(201).send({
    status: "ok",
    message: "Usuario registrado con éxito",
    redirect: "/login"
  })
}


export const methods = {
  login,
  register
}