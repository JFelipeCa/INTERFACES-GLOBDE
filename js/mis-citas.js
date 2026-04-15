if (protegerRuta("cliente")) {
  construirMenu();

  const usuario = sincronizarSesionConUsuarios();
  const citas = obtenerCitas().filter(cita => Number(cita.id_cliente) === Number(usuario.id_usuario));
  const lista = document.getElementById("listaCitas");

  if (!citas.length) {
    lista.innerHTML = '<li class="cita-item"><span class="cita-vacia">No tienes citas registradas todavia.</span></li>';
  } else {
    const ordenadas = [...citas].sort((a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`));
    lista.innerHTML = ordenadas.map(cita => {
      const barbero = obtenerUsuarioPorId(cita.id_barbero);
      return `
        <li class="cita-item">
          <div>
            <span class="cita-servicio">${obtenerResumenServicios(cita)}</span>
            <span class="cita-detalle">Con ${barbero ? barbero.nombre : "Sin barbero"} | ${formatearFecha(cita.fecha)} | ${cita.hora}</span>
            <span class="cita-detalle">Total estimado: ${formatearMoneda(cita.total_precio || 0)}</span>
          </div>
          <div class="cita-acciones">
            <span class="${obtenerNombreEstadoClase(cita.estado)}">${cita.estado}</span>
          </div>
        </li>
      `;
    }).join("");
  }
}
