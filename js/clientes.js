let usuarios = obtenerUsuarios();

function obtenerClientes() {
  return usuarios.filter(usuario => Number(usuario.id_rol) === ROL_CLIENTE);
}

function agregarCliente() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("contrasena").value.trim();

  if (!nombre || !telefono || !correo || !password) {
    return;
  }

  const correoExiste = usuarios.some(usuario => usuario.correo === correo);
  if (correoExiste) {
    return;
  }

  const nuevoId = usuarios.length ? Math.max(...usuarios.map(usuario => Number(usuario.id_usuario))) + 1 : 1;
  usuarios.push({
    id_usuario: nuevoId,
    nombre,
    correo,
    contrasena: password,
    telefono,
    id_rol: ROL_CLIENTE,
    fecha_creacion: new Date().toISOString(),
    fecha_registro: new Date().toISOString(),
    puntaje: 0
  });

  guardarDatos("usuarios", usuarios);
  mostrarClientes();

  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("contrasena").value = "";
}

function mostrarClientes() {
  usuarios = obtenerUsuarios();
  const lista = document.getElementById("listaClientes");
  const clientes = obtenerClientes();

  lista.innerHTML = clientes.map(cliente => `
    <li>
      <div class="item-head">
        <span class="item-title">${cliente.nombre}</span>
        <span class="badge badge-confirmada">Cliente</span>
      </div>
      <div class="item-meta">
        <span>${cliente.correo}</span>
        <span>${cliente.telefono || "Sin telefono"}</span>
        <span>Puntaje: ${cliente.puntaje || 0}</span>
      </div>
    </li>
  `).join("");
}

mostrarClientes();
