let citas = obtenerDatos("citas");
let clientes = obtenerDatos("clientes");
let usuarios = obtenerDatos("usuarios");
let servicios = obtenerDatos("servicios");

function cargarClientes() {
  const selectCliente = document.getElementById("cliente");
  selectCliente.innerHTML = '<option value="">Selecciona un cliente</option>';

  clientes.forEach(cliente => {
    selectCliente.innerHTML += `<option value="${cliente.id_cliente}">${cliente.nombre}</option>`;
  });
}

function cargarBarberos() {
  const selectBarbero = document.getElementById("barbero");
  const barberos = usuarios.filter(usuario => usuario.id_rol === 2);

  selectBarbero.innerHTML = '<option value="">Selecciona un barbero</option>';

  barberos.forEach(barbero => {
    selectBarbero.innerHTML += `<option value="${barbero.id_usuario}">${barbero.nombre}</option>`;
  });
}

function cargarServicios() {
  const selectServicio = document.getElementById("servicio");
  selectServicio.innerHTML = '<option value="">Selecciona un servicio</option>';

  servicios.forEach(servicio => {
    selectServicio.innerHTML += `<option value="${servicio.id_servicio}">${servicio.nombre}</option>`;
  });
}

function agendarCita() {
  const idCliente = Number(document.getElementById("cliente").value);
  const idUsuario = Number(document.getElementById("barbero").value);
  const idServicio = Number(document.getElementById("servicio").value);
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const estado = document.getElementById("estado").value;
  const observaciones = document.getElementById("observaciones").value.trim();

  if (!idCliente || !idUsuario || !idServicio || !fecha || !hora) return;

  const cliente = clientes.find(item => item.id_cliente === idCliente);
  const barbero = usuarios.find(item => item.id_usuario === idUsuario);
  const servicio = servicios.find(item => item.id_servicio === idServicio);
  const citaExistente = citas.find(item => item.id_usuario === idUsuario && item.fecha === fecha && item.hora === hora);

  if (citaExistente) return;

  const cita = {
    id_cita: citas.length + 1,
    id_cliente: idCliente,
    id_usuario: idUsuario,
    id_servicio: idServicio,
    cliente: cliente ? cliente.nombre : "",
    barbero: barbero ? barbero.nombre : "",
    servicio: servicio ? servicio.nombre : "",
    fecha: fecha,
    hora: hora,
    estado: estado,
    observaciones: observaciones
  };

  citas.push(cita);
  guardarDatos("citas", citas);
  mostrarCitas();

  document.getElementById("cliente").value = "";
  document.getElementById("barbero").value = "";
  document.getElementById("servicio").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("estado").value = "pendiente";
  document.getElementById("observaciones").value = "";
}

function mostrarCitas() {
  const lista = document.getElementById("listaCitas");
  lista.innerHTML = "";

  citas.forEach(cita => {
    lista.innerHTML += `<li>${cita.cliente} - ${cita.servicio} con ${cita.barbero} - ${cita.fecha} ${cita.hora} - ${cita.estado}${cita.observaciones ? ` - ${cita.observaciones}` : ""}</li>`;
  });
}

cargarClientes();
cargarBarberos();
cargarServicios();
mostrarCitas();
