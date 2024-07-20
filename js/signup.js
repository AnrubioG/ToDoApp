/* ---------------------- obtenemos variables globales ---------------------- */
const form = document.querySelector("form");
const inputNombre = document.querySelector("#inputNombre");
const inputApellido = document.querySelector("#inputApellido");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const inputPasswordRepetida = document.querySelector("#inputPasswordRepetida");

// validar si los inpust son validos
const inputs = [
  inputNombre,
  inputApellido,
  inputEmail,
  inputPassword,
  inputPasswordRepetida,
];

function validarInputs() {
  return inputs.every((input) => validarTexto(input));
}

// validar si hay una sesion activa
const jwt = localStorage.getItem("tokens");
if (jwt) {
  location.replace("tasks.html");
}

// agregar evento al formulario

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoUsuario = {
    name: "",
    lastName: "",
    email: "",
    password: "",
  };

  if (!validarInputs()) {
    inputs.forEach((input) => {
      input.placeholder = "Todos los campos son requeridos";
    });
    return;
  }

  if (!validarEmail(inputEmail)) {
    inputEmail.value = "";
    inputEmail.placeholder = "ingrese un correo válido";
    return;
  }

  if (!validarContrasenia(inputPassword.value)) {
    inputPassword.value = "";
    inputPassword.placeholder = "ingrese una contraseña válida";
    return;
  }

  if (!compararContrasenias(inputPassword.value, inputPasswordRepetida.value)) {
    inputPasswordRepetida.value = "";
    inputPasswordRepetida.placeholder = "Las contraseñas no coinciden";
    return;
  }

  nuevoUsuario.name = normalizar(inputNombre);
  nuevoUsuario.lastName = normalizar(inputApellido);
  nuevoUsuario.email = normalizarEmail(inputEmail);
  nuevoUsuario.password = normalizar(inputPassword);
  realizarRegistro(nuevoUsuario);
});

// realizar Registro

function realizarRegistro(nuevoUsuario) {
  const url = "https://todo-api-nest.onrender.com/auth/sign-up";
  const config = {
    method: "POST",
    body: JSON.stringify(nuevoUsuario),
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
          })
        );
        location.replace("tareas.html");
      }
    });
}
