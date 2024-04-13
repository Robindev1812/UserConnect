import bcryptjs from "bcryptjs"



const usuarios = [
  {
    user: "r",
    email: "r@r.com",
    password: "'$2a$10$Mx7Icb2C7OwJ4VtTP.OcE.jPDCiICbBfEcYpWDRpeaghi3dFMMlZy'" //r
  }
]


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

async function login(req, res) {

}


export const methods = {
  login,
  register
}