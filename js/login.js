/* ---------------------- obtenemos variables globales ---------------------- */
const form = document.querySelector("form");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");

// validar si hay una sesion activa
const sesion = localStorage.getItem("tokens");
if (sesion) {
  location.replace("tareas.html");
}

// agregar evento al formulario

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = {
    email: "",
    password: "",
  };

  if (validarEmail(inputEmail) && validarTexto(inputPassword)) {
    usuario.email = normalizarEmail(inputEmail);
    usuario.password = normalizar(inputPassword);
    realizarLogin(usuario);
  } else {
    console.log("Ingrese un usuario valido");
  }
});

// realizar login

function realizarLogin(usuario) {
  const url = "https://todo-api-nest.onrender.com/auth/sign-in";
  const config = {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch(url, config)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.accessToken && json.refreshToken) {
        localStorage.setItem(
          "tokens",
          JSON.stringify({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
            userName: json.user.name,
          })
        );
        location.replace("tareas.html");
      }
    });
}
