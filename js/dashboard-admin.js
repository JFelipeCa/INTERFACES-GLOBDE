if (protegerRuta("admin")) {
  construirMenu();

  const usuario = sincronizarSesionConUsuarios();
  const estadisticas = obtenerEstadisticas();
  const citas = obtenerCitas();
  const actividadAdmin = document.getElementById("actividadAdmin");

  const frecuenciaServicios = {};
  citas.forEach(cita => {
    const ids = Array.isArray(cita.servicio_ids) && cita.servicio_ids.length
      ? cita.servicio_ids
      : (cita.id_servicio ? [cita.id_servicio] : []);

    ids.forEach(idServicio => {
      const servicio = obtenerServicioPorId(idServicio);
      if (!servicio) {
        return;
      }
      frecuenciaServicios[servicio.nombre] = (frecuenciaServicios[servicio.nombre] || 0) + 1;
    });
  });

  const servicioTop = Object.entries(frecuenciaServicios).sort((a, b) => b[1] - a[1])[0];
  const recientes = [...citas]
    .sort((a, b) => new Date(`${b.fecha}T${b.hora}`) - new Date(`${a.fecha}T${a.hora}`))
    .slice(0, 6);

  document.getElementById("adminNombre").textContent = usuario.nombre;
  document.getElementById("totalClientes").textContent = estadisticas.clientes;
  document.getElementById("totalPersonal").textContent = estadisticas.personal;
  document.getElementById("totalCitas").textContent = estadisticas.citas;
  document.getElementById("totalServicios").textContent = estadisticas.servicios;
  document.getElementById("citasPendientes").textContent = citas.filter(cita => cita.estado === "pendiente").length;
  document.getElementById("citasConfirmadas").textContent = citas.filter(cita => cita.estado === "confirmada").length;
  document.getElementById("servicioTop").textContent = servicioTop ? servicioTop[0] : "Sin datos";

  if (!recientes.length) {
    actividadAdmin.innerHTML = '<div class="activity-item">No hay actividad reciente registrada.</div>';
  } else {
    actividadAdmin.innerHTML = recientes.map(cita => {
      const cliente = obtenerUsuarioPorId(cita.id_cliente);
      const barbero = obtenerUsuarioPorId(cita.id_barbero);
      return `
        <article class="activity-item">
          <div class="item-head">
            <span class="item-title">${obtenerResumenServicios(cita)}</span>
            <span class="${obtenerNombreEstadoClase(cita.estado)}">${cita.estado}</span>
          </div>
          <div class="item-meta">
            <span>Cliente: ${cliente ? cliente.nombre : "Sin cliente"}</span>
            <span>Barbero: ${barbero ? barbero.nombre : "Sin barbero"}</span>
            <span>${formatearFecha(cita.fecha)} | ${cita.hora}</span>
          </div>
        </article>
      `;
    }).join("");
  }
}
