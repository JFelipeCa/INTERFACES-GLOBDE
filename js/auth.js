function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem("usuario")) || null;
}

function guardarUsuarioActual(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

function obtenerRolPorId(idRol) {
  const roles = obtenerDatos("roles");
  return roles.find(rol => Number(rol.id_rol) === Number(idRol)) || null;
}

function obtenerNombreRol(usuario) {
  const rol = obtenerRolPorId(usuario?.id_rol);
  return rol ? rol.nombre : "";
}

function esCliente(usuario = obtenerUsuarioActual()) {
  return Number(usuario?.id_rol) === ROL_CLIENTE;
}

function esAdministrador(usuario = obtenerUsuarioActual()) {
  return Boolean(usuario) && !esCliente(usuario);
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

function obtenerDestinoPorRol(usuario = obtenerUsuarioActual()) {
  return esCliente(usuario) ? "dashboard-cliente.html" : "dashboard-admin.html";
}

function redirigirPorRol() {
  const usuario = obtenerUsuarioActual();
  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  window.location.href = obtenerDestinoPorRol(usuario);
}

function protegerRuta(tipoVista) {
  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    window.location.href = "login.html";
    return false;
  }

  if (tipoVista === "cliente" && !esCliente(usuario)) {
    window.location.href = "dashboard-admin.html";
    return false;
  }

  if (tipoVista === "admin" && !esAdministrador(usuario)) {
    window.location.href = "dashboard-cliente.html";
    return false;
  }

  return true;
}

function construirMenu() {
  const usuario = obtenerUsuarioActual();
  if (!usuario) {
    return;
  }

  const nav = document.querySelector("[data-nav]");
  if (!nav) {
    return;
  }

  const paginaActual = window.location.pathname.split("/").pop();
  const enlaces = esCliente(usuario)
    ? [
        { href: "dashboard-cliente.html", texto: "Inicio" },
        { href: "mis-citas.html", texto: "Mis citas" },
        { href: "catalogo.html", texto: "Catalogo" },
        { href: "perfil.html", texto: "Mi perfil" }
      ]
    : [
        { href: "dashboard-admin.html", texto: "Inicio" },
        { href: "clientes.html", texto: "Clientes" },
        { href: "citas.html", texto: "Citas" },
        { href: "catalogo.html", texto: "Catalogo" },
        { href: "perfil.html", texto: "Perfil" }
      ];

  const enlacesHtml = enlaces
    .map(enlace => {
      const clase = enlace.href === paginaActual ? ' class="active"' : "";
      return `<li><a href="${enlace.href}"${clase}>${enlace.texto}</a></li>`;
    })
    .join("");

  nav.innerHTML = `
    <h2>GLOBDE</h2>
    <ul>
      ${enlacesHtml}
      <li class="nav-user">${usuario.nombre} <span>${obtenerNombreRol(usuario)}</span></li>
      <li><button type="button" onclick="cerrarSesion()">Cerrar sesion</button></li>
    </ul>
  `;
}
