if (protegerRuta("cliente")) {
  construirMenu();

  const usuario = sincronizarSesionConUsuarios();
  const servicios = obtenerServicios();
  const usuarios = obtenerUsuarios();
  const citas = obtenerCitas().filter(cita => Number(cita.id_cliente) === Number(usuario.id_usuario));

  const catalogoCliente = document.getElementById("catalogoCliente");
  const serviciosSeleccionables = document.getElementById("serviciosSeleccionables");
  const resumenSeleccion = document.getElementById("resumenSeleccion");
  const citasPreview = document.getElementById("citasClientePreview");
  const selectBarbero = document.getElementById("clienteBarbero");
  const mensajeCita = document.getElementById("mensajeCita");

  function renderResumenServiciosSeleccionados() {
    const seleccionados = Array.from(document.querySelectorAll('input[name="servicioCliente"]:checked')).map(item => Number(item.value));
    if (!seleccionados.length) {
      resumenSeleccion.innerHTML = "<strong>Sin servicios seleccionados.</strong>";
      return;
    }

    const nombres = seleccionados
      .map(idServicio => obtenerServicioPorId(idServicio))
      .filter(Boolean)
      .map(servicio => servicio.nombre);

    const totales = calcularTotalesServicios(seleccionados);
    resumenSeleccion.innerHTML = `
      <strong>${nombres.join(", ")}</strong><br>
      Duracion estimada: ${totales.totalDuracion} min | Total aproximado: ${formatearMoneda(totales.totalPrecio)}
    `;
  }

  function renderCatalogo() {
    catalogoCliente.innerHTML = "";
    servicios.forEach(servicio => {
      catalogoCliente.innerHTML += `
        <article class="servicio-card">
          <div class="servicio-icono">*</div>
          <h3>${servicio.nombre}</h3>
          <p>${servicio.descripcion}</p>
          <div class="servicio-footer">
            <span class="servicio-precio">${formatearMoneda(servicio.precio)}</span>
            <span class="servicio-duracion">${servicio.duracion_minutos} min</span>
          </div>
        </article>
      `;
    });
  }

  function renderSelectorServicios() {
    serviciosSeleccionables.innerHTML = "";
    servicios.forEach(servicio => {
      serviciosSeleccionables.innerHTML += `
        <div class="service-option">
          <input type="checkbox" id="servicio-${servicio.id_servicio}" name="servicioCliente" value="${servicio.id_servicio}">
          <label for="servicio-${servicio.id_servicio}">
            <strong>${servicio.nombre}</strong>
            <span>${formatearMoneda(servicio.precio)} | ${servicio.duracion_minutos} min</span>
          </label>
        </div>
      `;
    });

    document.querySelectorAll('input[name="servicioCliente"]').forEach(input => {
      input.addEventListener("change", renderResumenServiciosSeleccionados);
    });
  }

  function renderBarberos() {
    const barberos = usuarios.filter(item => Number(item.id_rol) === ROL_BARBERO);
    selectBarbero.innerHTML = '<option value="">Selecciona un barbero</option>';
    barberos.forEach(barbero => {
      selectBarbero.innerHTML += `<option value="${barbero.id_usuario}">${barbero.nombre}</option>`;
    });
  }

  function renderCitasPreview() {
    citasPreview.innerHTML = "";

    const ordenadas = [...citas]
      .sort((a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`))
      .slice(0, 4);

    if (!ordenadas.length) {
      citasPreview.innerHTML = '<li class="cita-item"><span class="cita-vacia">Aun no tienes citas reservadas.</span></li>';
      return;
    }

    ordenadas.forEach(cita => {
      const barbero = obtenerUsuarioPorId(cita.id_barbero);
      citasPreview.innerHTML += `
        <li class="cita-item">
          <div>
            <span class="cita-servicio">${obtenerResumenServicios(cita)}</span>
            <span class="cita-detalle">Con ${barbero ? barbero.nombre : "Sin barbero"} | ${formatearFecha(cita.fecha)} | ${cita.hora}</span>
          </div>
          <div class="cita-acciones">
            <span class="${obtenerNombreEstadoClase(cita.estado)}">${cita.estado}</span>
          </div>
        </li>
      `;
    });
  }

  window.agendarCitaCliente = function agendarCitaCliente() {
    const idsServicios = Array.from(document.querySelectorAll('input[name="servicioCliente"]:checked')).map(item => Number(item.value));
    const idBarbero = Number(selectBarbero.value);
    const fecha = document.getElementById("clienteFecha").value;
    const hora = document.getElementById("clienteHora").value;
    const observaciones = document.getElementById("clienteObservaciones").value.trim();

    if (!idsServicios.length || !idBarbero || !fecha || !hora) {
      mensajeCita.textContent = "Selecciona servicios, barbero, fecha y hora.";
      mensajeCita.style.color = "var(--error)";
      return;
    }

    const citasGuardadas = obtenerCitas();
    const choque = citasGuardadas.find(cita =>
      Number(cita.id_barbero) === idBarbero &&
      cita.fecha === fecha &&
      cita.hora === hora
    );

    if (choque) {
      mensajeCita.textContent = "Ese barbero ya tiene una cita en ese horario.";
      mensajeCita.style.color = "var(--error)";
      return;
    }

    const totales = calcularTotalesServicios(idsServicios);
    const nuevaCita = {
      id_cita: citasGuardadas.length ? Math.max(...citasGuardadas.map(item => Number(item.id_cita))) + 1 : 1,
      id_cliente: usuario.id_usuario,
      id_barbero: idBarbero,
      id_servicio: idsServicios[0],
      servicio_ids: idsServicios,
      servicio_personalizado: idsServicios.length > 1 ? "Servicio personalizado" : "",
      total_precio: totales.totalPrecio,
      total_duracion: totales.totalDuracion,
      fecha,
      hora,
      estado: "pendiente",
      observaciones
    };

    citasGuardadas.push(nuevaCita);
    guardarDatos("citas", citasGuardadas);
    mensajeCita.textContent = "Solicitud enviada correctamente.";
    mensajeCita.style.color = "var(--exito)";
    window.location.reload();
  };

  document.getElementById("clienteNombre").textContent = usuario.nombre;
  document.getElementById("clientePuntaje").textContent = usuario.puntaje || 0;
  document.getElementById("clienteCitas").textContent = citas.filter(cita => cita.estado !== "cancelada").length;
  document.getElementById("clienteServicios").textContent = servicios.length;
  document.getElementById("clienteCorreo").textContent = usuario.correo || "Sin correo";
  document.getElementById("clienteTelefono").textContent = usuario.telefono || "Sin telefono";

  renderCatalogo();
  renderSelectorServicios();
  renderBarberos();
  renderCitasPreview();
  renderResumenServiciosSeleccionados();
}
