const datosBase = {
  roles: [
    { id_rol: 1, nombre: "Administrador", descripcion: "Control total del sistema" },
    { id_rol: 2, nombre: "Barbero", descripcion: "Gestiona citas y servicios" },
    { id_rol: 3, nombre: "Recepcionista", descripcion: "Administra reservas" },
    { id_rol: 4, nombre: "Supervisor", descripcion: "Supervisa operaciones" },
    { id_rol: 5, nombre: "Gerente", descripcion: "Gestion del negocio" }
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
    { id_usuario: 1, nombre: "Juan Felipe Canon", correo: "juan.canon@barbercontrol.com", contrasena: "JFcanon2026", telefono: "3004512387", id_rol: 1, fecha_creacion: "2026-03-08T16:45:14" },
    { id_usuario: 2, nombre: "Carlos Mendez", correo: "carlos.mendez@barbercontrol.com", contrasena: "CarMend98", telefono: "3017854923", id_rol: 2, fecha_creacion: "2026-03-08T16:45:14" },
    { id_usuario: 3, nombre: "Andres Salgado", correo: "andres.salgado@barbercontrol.com", contrasena: "SalgaBarb22", telefono: "3026481395", id_rol: 2, fecha_creacion: "2026-03-08T16:45:14" },
    { id_usuario: 4, nombre: "Mateo Rivas", correo: "mateo.rivas@barbercontrol.com", contrasena: "MateoFade77", telefono: "3049825617", id_rol: 2, fecha_creacion: "2026-03-08T16:45:14" },
    { id_usuario: 5, nombre: "Laura Pardo", correo: "laura.pardo@barbercontrol.com", contrasena: "RecepLP2024", telefono: "3057138426", id_rol: 3, fecha_creacion: "2026-03-08T16:45:14" }
  ],
  clientes: [
    { id_cliente: 1, nombre: "Pedro Gomez", telefono: "3105481293", correo: "pedro.gomez01@gmail.com", fecha_registro: "2026-03-08T16:46:30", puntaje: 20 },
    { id_cliente: 2, nombre: "Luis Martinez", telefono: "3118734921", correo: "luis.martinez02@gmail.com", fecha_registro: "2026-03-08T16:46:30", puntaje: 40 },
    { id_cliente: 3, nombre: "Santiago Rojas", telefono: "3125498137", correo: "santiago.rojas03@gmail.com", fecha_registro: "2026-03-08T16:46:30", puntaje: 60 },
    { id_cliente: 4, nombre: "Daniel Herrera", telefono: "3137849126", correo: "daniel.herrera04@gmail.com", fecha_registro: "2026-03-08T16:46:30", puntaje: 10 },
    { id_cliente: 5, nombre: "Camilo Vargas", telefono: "3149012736", correo: "camilo.vargas05@gmail.com", fecha_registro: "2026-03-08T16:46:30", puntaje: 80 }
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

function normalizarDatos() {
  const clientes = obtenerDatos("clientes").map((cliente, index) => ({
    id_cliente: cliente.id_cliente || cliente.id || index + 1,
    nombre: cliente.apellido ? `${cliente.nombre} ${cliente.apellido}`.trim() : cliente.nombre,
    telefono: cliente.telefono || "",
    correo: cliente.correo || "",
    fecha_registro: cliente.fecha_registro || new Date().toISOString(),
    puntaje: cliente.puntaje ?? 0
  }));

  const servicios = obtenerDatos("servicios").map((servicio, index) => ({
    id_servicio: servicio.id_servicio || servicio.id || index + 1,
    nombre: servicio.nombre || "",
    descripcion: servicio.descripcion || "",
    precio: servicio.precio || 0,
    duracion_minutos: servicio.duracion_minutos || servicio.duracion || 0,
    id_corte: servicio.id_corte ?? null
  }));

  const usuarios = obtenerDatos("usuarios").map((usuario, index) => ({
    id_usuario: usuario.id_usuario || usuario.id || index + 1,
    nombre: usuario.nombre || "",
    correo: usuario.correo || "",
    contrasena: usuario.contrasena || usuario.password || "",
    telefono: usuario.telefono || "",
    id_rol: usuario.id_rol || 2,
    fecha_creacion: usuario.fecha_creacion || new Date().toISOString()
  }));

  const citas = obtenerDatos("citas").map((cita, index) => ({
    id_cita: cita.id_cita || cita.id || index + 1,
    id_cliente: cita.id_cliente || null,
    id_usuario: cita.id_usuario || null,
    id_servicio: cita.id_servicio || null,
    cliente: cita.cliente || "",
    barbero: cita.barbero || "",
    servicio: cita.servicio || "",
    fecha: cita.fecha || "",
    hora: cita.hora || "",
    estado: cita.estado || "pendiente",
    observaciones: cita.observaciones || ""
  }));

  guardarDatos("clientes", clientes);
  guardarDatos("servicios", servicios);
  guardarDatos("usuarios", usuarios);
  guardarDatos("citas", citas);
}

inicializarDatos();
normalizarDatos();
