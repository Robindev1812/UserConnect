console.log("Conectado desde el home")
document.getElementsByTagName("a")[1].addEventListener("click", () => {
  document.location.href = "/register"
})

document.getElementsByTagName("a")[2].addEventListener("click", () => {
  document.location.href = "/login"
})


