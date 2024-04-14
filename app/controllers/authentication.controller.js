import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const usuarios = [
  {
    user: "r",
    email: "r@r.com",
    password: '$2a$10$Mx7Icb2C7OwJ4VtTP.OcE.jPDCiICbBfEcYpWDRpeaghi3dFMMlZy' //r
  }
]


async function login(req, res) {
  console.log(req.body)
  const user = req.body.user
  const password = req.body.password

  if (!user || !password) {
    return res.status(400).send({
      status: "Error", message: "Los campos estan incompletos"
    })
  }

  const reviewUser = usuarios.find(usuario => usuario.user === user)
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
  console.log(req.body)
  const user = req.body.user
  const email = req.body.email
  const password = req.body.password

  if (!user || !email || !password) {
    return res.status(400).send({
      status: "Error", message: "Los campos estan incompletos"
    })
  }

  const reviewUser = usuarios.find(usuario => usuario.user === user)
  if (reviewUser) {
    return res.status(400).send({
      status: "Error", message: "El usuario ya existe"
    })
  }

  const saltUser = await bcryptjs.genSalt()
  const hashPassword = await bcryptjs.hash(password, saltUser)

  const newUser = {
    user, email, password: hashPassword
  }

  usuarios.push(newUser)

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