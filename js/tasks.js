// variables globales
const closeApp = document.querySelector("#closeApp");
const userName = document.querySelector("#user-name");
const formTareas = document.querySelector(".nueva-tarea");
const inputNuevaTarea = document.querySelector("#nuevaTarea");
const tareasTerminadas = document.querySelector(".tareas-terminadas");
const tareasPendientes = document.querySelector(".tareas-pendientes");

// validar si hay una sesion activa
const sesion = localStorage.getItem("tokens");
const datos = JSON.parse(sesion);
const token = datos.accessToken;
if (!sesion) {
  location.replace("index.html");
}

consultarTareas();

// funcion para cerrar sesion
closeApp.addEventListener("click", () => {
  localStorage.removeItem("tokens");
  location.replace("index.html");
});

// Asignar nombre de usuario en informacion
function asiganrNombre() {
  userName.textContent = datos.userName;
}

// renderizar tareas
function renderizarTareas(tarea) {
  if (tarea.isCompleted) {
    tareasTerminadas.innerHTML += `
            <li class="tarea" data-aos="fade-up">
              <div class="hecha">
                <i class="fa-regular fa-circle-check"></i>
              </div>
              <div class="descripcion">
                <p class="nombre">${tarea.title}</p>
                <div class="cambios-estados">
                  <button class="change completa" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                  <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
                </div>
              </div>
            </li>`;
  } else {
    tareasPendientes.innerHTML += `
          <li class="tarea" data-aos="fade-down">
            <button class="change" id="${
              tarea.id
            }"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.title}</p>
              <p class="timestamp">${new Date(
                tarea.createdAt
              ).toLocaleDateString()}</p>
            </div>
          </li>`;
  }
}

// consultar  tareas
function consultarTareas() {
  const url = "https://todo-api-nest.onrender.com/todos";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, config)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      tareasTerminadas.innerHTML = "";
      tareasPendientes.innerHTML = "";
      json.forEach((tarea) => {
        renderizarTareas(tarea);
      });
    });
}

// crear tarea
formTareas.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarea = {
    title: inputNuevaTarea.value.trim(),
  };
  crearTarea(tarea);
  inputNuevaTarea.value = "";
});

function crearTarea(tarea) {
  const url = "https://todo-api-nest.onrender.com/todos";
  const config = {
    method: "POST",
    body: JSON.stringify(tarea),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, config)
    .then((response) => response.json())
    .then((json) => {
      consultarTareas();
    });
}

function botonesCambioEstado() {}

asiganrNombre();
