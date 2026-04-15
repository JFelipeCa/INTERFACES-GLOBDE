const ROL_ADMINISTRADOR = 1;
const ROL_BARBERO = 2;
const ROL_RECEPCIONISTA = 3;
const ROL_SUPERVISOR = 4;
const ROL_GERENTE = 5;
const ROL_CLIENTE = 6;

const datosBase = {
  roles: [
    { id_rol: ROL_ADMINISTRADOR, nombre: "Administrador", descripcion: "Control total del sistema" },
    { id_rol: ROL_BARBERO, nombre: "Barbero", descripcion: "Gestiona citas y servicios" },
    { id_rol: ROL_RECEPCIONISTA, nombre: "Recepcionista", descripcion: "Administra reservas" },
    { id_rol: ROL_SUPERVISOR, nombre: "Supervisor", descripcion: "Supervisa operaciones" },
    { id_rol: ROL_GERENTE, nombre: "Gerente", descripcion: "Gestion del negocio" },
    { id_rol: ROL_CLIENTE, nombre: "Cliente", descripcion: "Usuario que agenda citas" }
  ],
  catalogo_cortes: [
    { id_corte: 1, nombre: "Fade bajo", descripcion: "Degradado suave y elegante", imagen_url: "fade_bajo.jpg" },
    { id_corte: 2, nombre: "Fade alto", descripcion: "Degradado moderno alto", imagen_url: "fade_alto.jpg" },
    { id_corte: 3, nombre: "Corte clasico", descripcion: "Estilo tradicional", imagen_url: "clasico.jpg" },
    { id_corte: 4, nombre: "Undercut", descripcion: "Laterales cortos y volumen arriba", imagen_url: "undercut.jpg" },
    { id_corte: 5, nombre: "Buzz cut", descripcion: "Corte rapado uniforme", imagen_url: "buzzcut.jpg" },
    { id_corte: 6, nombre: "Pompadour", descripcion: "Volumen alto estilizado", imagen_url: "pompadour.jpg" },
    { id_corte: 7, nombre: "Corte infantil", descripcion: "Estilo moderno para ninos", imagen_url: "infantil.jpg" },
    { id_corte: 8, nombre: "Barba perfilada", descripcion: "Diseno de barba", imagen_url: "barba.jpg" }
  ],
  usuarios: [
    { id_usuario: 1, nombre: "Juan Felipe Canon", correo: "juan.canon@barbercontrol.com", contrasena: "JFcanon2026", telefono: "3004512387", id_rol: ROL_ADMINISTRADOR, fecha_creacion: "2026-03-08T16:45:14", fecha_registro: "2026-03-08T16:45:14", puntaje: 0 },
    { id_usuario: 2, nombre: "Carlos Mendez", correo: "carlos.mendez@barbercontrol.com", contrasena: "CarMend98", telefono: "3017854923", id_rol: ROL_BARBERO, fecha_creacion: "2026-03-08T16:45:14", fecha_registro: "2026-03-08T16:45:14", puntaje: 0 },
    { id_usuario: 3, nombre: "Andres Salgado", correo: "andres.salgado@barbercontrol.com", contrasena: "SalgaBarb22", telefono: "3026481395", id_rol: ROL_BARBERO, fecha_creacion: "2026-03-08T16:45:14", fecha_registro: "2026-03-08T16:45:14", puntaje: 0 },
    { id_usuario: 4, nombre: "Mateo Rivas", correo: "mateo.rivas@barbercontrol.com", contrasena: "MateoFade77", telefono: "3049825617", id_rol: ROL_BARBERO, fecha_creacion: "2026-03-08T16:45:14", fecha_registro: "2026-03-08T16:45:14", puntaje: 0 },
    { id_usuario: 5, nombre: "Laura Pardo", correo: "laura.pardo@barbercontrol.com", contrasena: "RecepLP2024", telefono: "3057138426", id_rol: ROL_RECEPCIONISTA, fecha_creacion: "2026-03-08T16:45:14", fecha_registro: "2026-03-08T16:45:14", puntaje: 0 },
    { id_usuario: 6, nombre: "Pedro Gomez", correo: "pedro.gomez01@gmail.com", contrasena: "cliente_default", telefono: "3105481293", id_rol: ROL_CLIENTE, fecha_creacion: "2026-03-08T16:46:30", fecha_registro: "2026-03-08T16:46:30", puntaje: 20 },
    { id_usuario: 7, nombre: "Luis Martinez", correo: "luis.martinez02@gmail.com", contrasena: "cliente_default", telefono: "3118734921", id_rol: ROL_CLIENTE, fecha_creacion: "2026-03-08T16:46:30", fecha_registro: "2026-03-08T16:46:30", puntaje: 40 },
    { id_usuario: 8, nombre: "Santiago Rojas", correo: "santiago.rojas03@gmail.com", contrasena: "cliente_default", telefono: "3125498137", id_rol: ROL_CLIENTE, fecha_creacion: "2026-03-08T16:46:30", fecha_registro: "2026-03-08T16:46:30", puntaje: 60 },
    { id_usuario: 9, nombre: "Daniel Herrera", correo: "daniel.herrera04@gmail.com", contrasena: "cliente_default", telefono: "3137849126", id_rol: ROL_CLIENTE, fecha_creacion: "2026-03-08T16:46:30", fecha_registro: "2026-03-08T16:46:30", puntaje: 10 },
    { id_usuario: 10, nombre: "Camilo Vargas", correo: "camilo.vargas05@gmail.com", contrasena: "cliente_default", telefono: "3149012736", id_rol: ROL_CLIENTE, fecha_creacion: "2026-03-08T16:46:30", fecha_registro: "2026-03-08T16:46:30", puntaje: 80 }
  ],
  servicios: [
    { id_servicio: 1, nombre: "Corte clasico", descripcion: "Corte tradicional con maquina y tijera", precio: 20000, duracion_minutos: 30, id_corte: 3 },
    { id_servicio: 2, nombre: "Corte degradado", descripcion: "Estilo fade moderno", precio: 25000, duracion_minutos: 40, id_corte: 2 },
    { id_servicio: 3, nombre: "Arreglo de barba", descripcion: "Perfilado y arreglo de barba", precio: 15000, duracion_minutos: 20, id_corte: 8 },
    { id_servicio: 4, nombre: "Corte + barba", descripcion: "Combo completo de corte y barba", precio: 35000, duracion_minutos: 50, id_corte: 8 },
    { id_servicio: 5, nombre: "Afeitado clasico", descripcion: "Afeitado con navaja y espuma", precio: 20000, duracion_minutos: 25, id_corte: null },
    { id_servicio: 6, nombre: "Corte infantil", descripcion: "Corte para ninos", precio: 18000, duracion_minutos: 25, id_corte: 7 },
    { id_servicio: 7, nombre: "Lavado capilar", descripcion: "Lavado profesional de cabello", precio: 12000, duracion_minutos: 10, id_corte: null },
    { id_servicio: 8, nombre: "Diseno de barba", descripcion: "Estilo personalizado de barba", precio: 18000, duracion_minutos: 20, id_corte: 8 }
  ],
  citas: []
};

function inicializarDatos() {
  Object.entries(datosBase).forEach(([clave, valor]) => {
    if (!localStorage.getItem(clave)) {
      localStorage.setItem(clave, JSON.stringify(valor));
    }
  });
}

function obtenerDatos(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function normalizarUsuarios(usuarios) {
  return usuarios.map((usuario, index) => ({
    id_usuario: Number(usuario.id_usuario || usuario.id || index + 1),
    nombre: usuario.apellido ? `${usuario.nombre} ${usuario.apellido}`.trim() : (usuario.nombre || ""),
    correo: usuario.correo || "",
    contrasena: usuario.contrasena || usuario.password || "cliente_default",
    telefono: usuario.telefono || "",
    id_rol: Number(usuario.id_rol || usuario.rol_id || ROL_CLIENTE),
    fecha_creacion: usuario.fecha_creacion || usuario.fecha_registro || new Date().toISOString(),
    fecha_registro: usuario.fecha_registro || usuario.fecha_creacion || new Date().toISOString(),
    puntaje: Number(usuario.puntaje ?? 0)
  }));
}

function migrarClientesAUsuarios() {
  const clientes = obtenerDatos("clientes");
  if (!clientes.length) {
    return;
  }

  const usuarios = obtenerDatos("usuarios");
  const correoExistente = new Set(usuarios.map(usuario => usuario.correo));
  const ultimoId = usuarios.reduce((maximo, usuario) => Math.max(maximo, Number(usuario.id_usuario) || 0), 0);

  const clientesMigrados = clientes
    .filter(cliente => cliente.correo && !correoExistente.has(cliente.correo))
    .map((cliente, index) => ({
      id_usuario: ultimoId + index + 1,
      nombre: cliente.apellido ? `${cliente.nombre} ${cliente.apellido}`.trim() : (cliente.nombre || ""),
      correo: cliente.correo || "",
      contrasena: "cliente_default",
      telefono: cliente.telefono || "",
      id_rol: ROL_CLIENTE,
      fecha_creacion: cliente.fecha_registro || new Date().toISOString(),
      fecha_registro: cliente.fecha_registro || new Date().toISOString(),
      puntaje: Number(cliente.puntaje ?? 0)
    }));

  if (clientesMigrados.length) {
    guardarDatos("usuarios", [...usuarios, ...clientesMigrados]);
  }

  localStorage.removeItem("clientes");
}

function normalizarServicios(servicios) {
  return servicios.map((servicio, index) => ({
    id_servicio: Number(servicio.id_servicio || servicio.id || index + 1),
    nombre: servicio.nombre || "",
    descripcion: servicio.descripcion || "",
    precio: Number(servicio.precio || 0),
    duracion_minutos: Number(servicio.duracion_minutos || servicio.duracion || 0),
    id_corte: servicio.id_corte == null || servicio.id_corte === "" ? null : Number(servicio.id_corte)
  }));
}

function normalizarCitas(citas) {
  return citas.map((cita, index) => ({
    id_cita: Number(cita.id_cita || cita.id || index + 1),
    id_cliente: Number(cita.id_cliente || cita.cliente_id || 0) || null,
    id_barbero: Number(cita.id_barbero || cita.id_usuario || 0) || null,
    id_servicio: Number(cita.id_servicio || 0) || null,
    servicio_ids: Array.isArray(cita.servicio_ids)
      ? cita.servicio_ids.map(id => Number(id)).filter(Boolean)
      : (cita.id_servicio ? [Number(cita.id_servicio)] : []),
    servicio_personalizado: cita.servicio_personalizado || "",
    total_precio: Number(cita.total_precio || 0),
    total_duracion: Number(cita.total_duracion || 0),
    fecha: cita.fecha || "",
    hora: cita.hora || "",
    estado: cita.estado || "pendiente",
    observaciones: cita.observaciones || ""
  }));
}

function normalizarDatos() {
  migrarClientesAUsuarios();

  const rolesActuales = obtenerDatos("roles");
  const roles = datosBase.roles.map(rolBase => {
    return rolesActuales.find(rol => Number(rol.id_rol) === Number(rolBase.id_rol)) || rolBase;
  });
  const usuarios = normalizarUsuarios(obtenerDatos("usuarios"));
  const servicios = normalizarServicios(obtenerDatos("servicios"));
  const citas = normalizarCitas(obtenerDatos("citas"));

  guardarDatos("roles", roles);
  guardarDatos("usuarios", usuarios.length ? usuarios : datosBase.usuarios);
  guardarDatos("servicios", servicios);
  guardarDatos("citas", citas);
}

inicializarDatos();
normalizarDatos();
