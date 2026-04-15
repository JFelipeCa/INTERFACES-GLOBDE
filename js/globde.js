function formatearFecha(fechaIso) {
  if (!fechaIso) {
    return "Sin fecha";
  }

  const fecha = new Date(`${fechaIso}T00:00:00`);
  return fecha.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(Number(valor || 0));
}

function obtenerUsuarios() {
  return obtenerDatos("usuarios");
}

function obtenerServicios() {
  return obtenerDatos("servicios");
}

function obtenerCitas() {
  return obtenerDatos("citas");
}

function obtenerUsuarioPorId(idUsuario) {
  return obtenerUsuarios().find(usuario => Number(usuario.id_usuario) === Number(idUsuario)) || null;
}

function obtenerServicioPorId(idServicio) {
  return obtenerServicios().find(servicio => Number(servicio.id_servicio) === Number(idServicio)) || null;
}

function obtenerNombreEstadoClase(estado) {
  return `badge badge-${String(estado || "pendiente").replace(/\s+/g, "-")}`;
}

function obtenerResumenServicios(cita) {
  const servicios = obtenerServicios();
  const ids = Array.isArray(cita.servicio_ids) && cita.servicio_ids.length
    ? cita.servicio_ids
    : (cita.id_servicio ? [cita.id_servicio] : []);

  const nombres = ids
    .map(id => servicios.find(servicio => Number(servicio.id_servicio) === Number(id)))
    .filter(Boolean)
    .map(servicio => servicio.nombre);

  if (cita.servicio_personalizado) {
    return cita.servicio_personalizado;
  }

  return nombres.join(", ") || "Sin servicio";
}

function calcularTotalesServicios(idsServicios) {
  const servicios = obtenerServicios();
  return idsServicios.reduce(
    (acumulado, idServicio) => {
      const servicio = servicios.find(item => Number(item.id_servicio) === Number(idServicio));
      if (!servicio) {
        return acumulado;
      }

      acumulado.totalPrecio += Number(servicio.precio || 0);
      acumulado.totalDuracion += Number(servicio.duracion_minutos || 0);
      return acumulado;
    },
    { totalPrecio: 0, totalDuracion: 0 }
  );
}

function obtenerEstadisticas() {
  const usuarios = obtenerUsuarios();
  const citas = obtenerCitas();
  const servicios = obtenerServicios();

  return {
    clientes: usuarios.filter(usuario => Number(usuario.id_rol) === ROL_CLIENTE).length,
    personal: usuarios.filter(usuario => Number(usuario.id_rol) !== ROL_CLIENTE).length,
    citas: citas.length,
    servicios: servicios.length
  };
}

function sincronizarSesionConUsuarios() {
  const usuario = obtenerUsuarioActual();
  if (!usuario) {
    return null;
  }

  const usuarioActualizado = obtenerUsuarioPorId(usuario.id_usuario);
  if (usuarioActualizado) {
    guardarUsuarioActual(usuarioActualizado);
    return usuarioActualizado;
  }

  return usuario;
}
