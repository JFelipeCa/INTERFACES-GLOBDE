let citas = obtenerCitas();
let usuarios = obtenerUsuarios();
let servicios = obtenerServicios();

const selectCliente = document.getElementById("cliente");
const selectBarbero = document.getElementById("barbero");
const listaCitas = document.getElementById("listaCitas");
const mensajeCitaAdmin = document.getElementById("mensajeCitaAdmin");
const resumenCitaAdmin = document.getElementById("resumenCitaAdmin");
const campoEditandoId = document.getElementById("citaEditandoId");
const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");

function obtenerClientes() {
  return usuarios.filter(usuario => Number(usuario.id_rol) === ROL_CLIENTE);
}

function obtenerBarberos() {
  return usuarios.filter(usuario => Number(usuario.id_rol) === ROL_BARBERO);
}

function cargarClientes() {
  selectCliente.innerHTML = '<option value="">Selecciona un cliente</option>';
  obtenerClientes().forEach(cliente => {
    selectCliente.innerHTML += `<option value="${cliente.id_usuario}">${cliente.nombre}</option>`;
  });
}

function cargarBarberos() {
  selectBarbero.innerHTML = '<option value="">Selecciona un barbero</option>';
  obtenerBarberos().forEach(barbero => {
    selectBarbero.innerHTML += `<option value="${barbero.id_usuario}">${barbero.nombre}</option>`;
  });
}

function cargarServiciosSeleccionables() {
  const contenedor = document.getElementById("serviciosCitaAdmin");
  contenedor.innerHTML = "";

  servicios.forEach(servicio => {
    contenedor.innerHTML += `
      <div class="service-option">
        <input type="checkbox" id="admin-servicio-${servicio.id_servicio}" name="servicioAdmin" value="${servicio.id_servicio}">
        <label for="admin-servicio-${servicio.id_servicio}">
          <strong>${servicio.nombre}</strong>
          <span>${formatearMoneda(servicio.precio)} | ${servicio.duracion_minutos} min</span>
        </label>
      </div>
    `;
  });

  document.querySelectorAll('input[name="servicioAdmin"]').forEach(input => {
    input.addEventListener("change", actualizarResumenCitaAdmin);
  });
}

function obtenerServiciosSeleccionados() {
  return Array.from(document.querySelectorAll('input[name="servicioAdmin"]:checked')).map(item => Number(item.value));
}

function actualizarResumenCitaAdmin() {
  const idsServicios = obtenerServiciosSeleccionados();

  if (!idsServicios.length) {
    resumenCitaAdmin.innerHTML = "<strong>Selecciona uno o varios servicios.</strong>";
    return;
  }

  const nombres = idsServicios
    .map(idServicio => obtenerServicioPorId(idServicio))
    .filter(Boolean)
    .map(servicio => servicio.nombre);

  const totales = calcularTotalesServicios(idsServicios);
  resumenCitaAdmin.innerHTML = `
    <strong>${nombres.join(", ")}</strong><br>
    Duracion estimada: ${totales.totalDuracion} min | Total aproximado: ${formatearMoneda(totales.totalPrecio)}
  `;
}

function limpiarFormularioCita() {
  campoEditandoId.value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("estado").value = "pendiente";
  document.getElementById("observaciones").value = "";
  selectCliente.value = "";
  selectBarbero.value = "";
  document.querySelectorAll('input[name="servicioAdmin"]').forEach(input => {
    input.checked = false;
  });

  document.getElementById("tituloFormularioCita").textContent = "Nueva cita";
  document.getElementById("descripcionFormularioCita").textContent = "Completa los datos para registrar una cita.";
  btnCancelarEdicion.classList.add("hidden");
  actualizarResumenCitaAdmin();
}

function cargarCitaEnFormulario(idCita) {
  const cita = citas.find(item => Number(item.id_cita) === Number(idCita));
  if (!cita) {
    return;
  }

  campoEditandoId.value = cita.id_cita;
  selectCliente.value = cita.id_cliente || "";
  selectBarbero.value = cita.id_barbero || "";
  document.getElementById("fecha").value = cita.fecha || "";
  document.getElementById("hora").value = cita.hora || "";
  document.getElementById("estado").value = cita.estado || "pendiente";
  document.getElementById("observaciones").value = cita.observaciones || "";

  document.querySelectorAll('input[name="servicioAdmin"]').forEach(input => {
    input.checked = (cita.servicio_ids || []).includes(Number(input.value));
  });

  document.getElementById("tituloFormularioCita").textContent = "Editar cita";
  document.getElementById("descripcionFormularioCita").textContent = "Ajusta los datos y guarda los cambios.";
  btnCancelarEdicion.classList.remove("hidden");
  actualizarResumenCitaAdmin();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.cancelarEdicionCita = function cancelarEdicionCita() {
  limpiarFormularioCita();
  mensajeCitaAdmin.textContent = "";
};

window.guardarCitaAdmin = function guardarCitaAdmin() {
  citas = obtenerCitas();
  usuarios = obtenerUsuarios();
  servicios = obtenerServicios();

  const idEditando = Number(campoEditandoId.value);
  const idCliente = Number(selectCliente.value);
  const idBarbero = Number(selectBarbero.value);
  const idsServicios = obtenerServiciosSeleccionados();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const estado = document.getElementById("estado").value;
  const observaciones = document.getElementById("observaciones").value.trim();

  if (!idCliente || !idBarbero || !idsServicios.length || !fecha || !hora) {
    mensajeCitaAdmin.textContent = "Completa todos los campos obligatorios.";
    mensajeCitaAdmin.style.color = "var(--error)";
    return;
  }

  const choque = citas.find(cita =>
    Number(cita.id_cita) !== idEditando &&
    Number(cita.id_barbero) === idBarbero &&
    cita.fecha === fecha &&
    cita.hora === hora
  );

  if (choque) {
    mensajeCitaAdmin.textContent = "Ese barbero ya tiene una cita en ese horario.";
    mensajeCitaAdmin.style.color = "var(--error)";
    return;
  }

  const totales = calcularTotalesServicios(idsServicios);
  const payload = {
    id_cliente: idCliente,
    id_barbero: idBarbero,
    id_servicio: idsServicios[0],
    servicio_ids: idsServicios,
    servicio_personalizado: idsServicios.length > 1 ? "Servicio personalizado" : "",
    total_precio: totales.totalPrecio,
    total_duracion: totales.totalDuracion,
    fecha,
    hora,
    estado,
    observaciones
  };

  if (idEditando) {
    const indice = citas.findIndex(cita => Number(cita.id_cita) === idEditando);
    if (indice >= 0) {
      citas[indice] = { ...citas[indice], ...payload };
    }
    mensajeCitaAdmin.textContent = "Cita actualizada correctamente.";
  } else {
    const nuevoId = citas.length ? Math.max(...citas.map(item => Number(item.id_cita))) + 1 : 1;
    citas.push({
      id_cita: nuevoId,
      ...payload
    });
    mensajeCitaAdmin.textContent = "Cita registrada correctamente.";
  }

  mensajeCitaAdmin.style.color = "var(--exito)";
  guardarDatos("citas", citas);
  mostrarCitas();
  limpiarFormularioCita();
}

function mostrarCitas() {
  citas = obtenerCitas();
  usuarios = obtenerUsuarios();
  servicios = obtenerServicios();

  if (!citas.length) {
    listaCitas.innerHTML = '<li class="cita-item">No hay citas registradas.</li>';
    return;
  }

  const ordenadas = [...citas].sort((a, b) => new Date(`${b.fecha}T${b.hora}`) - new Date(`${a.fecha}T${a.hora}`));

  listaCitas.innerHTML = ordenadas.map(cita => {
    const cliente = obtenerUsuarioPorId(cita.id_cliente);
    const barbero = obtenerUsuarioPorId(cita.id_barbero);

    return `
      <li>
        <div class="item-head">
          <span class="item-title">${obtenerResumenServicios(cita)}</span>
          <span class="${obtenerNombreEstadoClase(cita.estado)}">${cita.estado}</span>
        </div>
        <div class="item-meta">
          <span>Cliente: ${cliente ? cliente.nombre : "Sin cliente"}</span>
          <span>Barbero: ${barbero ? barbero.nombre : "Sin barbero"}</span>
          <span>${formatearFecha(cita.fecha)} | ${cita.hora}</span>
          <span>${formatearMoneda(cita.total_precio || 0)}</span>
        </div>
        ${cita.observaciones ? `<div class="item-subtitle">${cita.observaciones}</div>` : ""}
        <div class="item-actions" style="margin-top: 14px;">
          <button type="button" class="btn-secundario" onclick="cargarCitaEnFormulario(${cita.id_cita})">Editar</button>
        </div>
      </li>
    `;
  }).join("");
}

window.cargarCitaEnFormulario = cargarCitaEnFormulario;

cargarClientes();
cargarBarberos();
cargarServiciosSeleccionables();
limpiarFormularioCita();
mostrarCitas();
