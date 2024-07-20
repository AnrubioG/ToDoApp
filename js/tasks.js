// validar si hay una sesion activa
const jwt = localStorage.getItem("tokens");

if (!jwt) {
  location.replace("index.html");
}
