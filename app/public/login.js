const showError = document.getElementsByClassName("error")[0]

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault()
  const user = e.target.children.user.value
  const password = e.target.children.password.value
  const URL = "http://localhost:4000/api/login"

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user, password
    })
  })

  if (!res.ok) return showError.classList.toggle("escondido", false)

  const resJson = await res.json()
  if (resJson.redirect) {
    window.location.href = resJson.redirect
  }
})