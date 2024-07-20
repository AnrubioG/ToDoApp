/* ---------------------------------- texto --------------------------------- */
function normalizar(input) {
  return input.value.trim();
}

function validarTexto(input) {
  if (normalizar(input) === "") {
    return false;
  }
  return true;
}

/* ---------------------------------- email --------------------------------- */
function normalizarEmail(email) {
  return normalizar(email).toLowerCase();
}
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalizarEmail(email));
}

/* -------------------------------- password -------------------------------- */
// debe contener al menos una mayuscula, una minuscula, un caracter especial, un numero y al menos 8 caracteres
// let password1 = "Angela@rubi0";

function validarContrasenia(contrasenia) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(contrasenia);
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  if (contrasenia_1 === contrasenia_2) {
    return true;
  }
  return false;
}
