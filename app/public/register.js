console.log("conectado desde el register");

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target.children.email.value);

  (res = await fetch("localhost:4000/api/register")),
  {
    method: "POST",
    headers: {
      "Conten-Type": "application/json",
    },
    body: JSON.stringify({
      user: e.target.children.user.value,
      email: e.target.children.email.value,
      password: e.target.children.password.value,
    }),
  };
});

