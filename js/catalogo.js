let servicios = obtenerServicios();
let catalogoCortes = obtenerDatos("catalogo_cortes");

function cargarCortes() {
  const selectCorte = document.getElementById("corteServicio");
  if (!selectCorte) {
    return;
  }

  selectCorte.innerHTML = '<option value="">Selecciona un corte asociado</option>';
  catalogoCortes.forEach(corte => {
    selectCorte.innerHTML += `<option value="${corte.id_corte}">${corte.nombre}</option>`;
  });
}

function agregarServicio() {
  const nombre = document.getElementById("nombreServicio")?.value.trim();
  const descripcion = document.getElementById("descripcionServicio")?.value.trim();
  const precio = Number(document.getElementById("precioServicio")?.value);
  const duracion = Number(document.getElementById("duracionServicio")?.value);
  const idCorte = document.getElementById("corteServicio")?.value;

  if (!nombre || !descripcion || !precio || !duracion) {
    return;
  }

  const nuevoId = servicios.length ? Math.max(...servicios.map(item => Number(item.id_servicio))) + 1 : 1;
  servicios.push({
    id_servicio: nuevoId,
    nombre,
    descripcion,
    precio,
    duracion_minutos: duracion,
    id_corte: idCorte ? Number(idCorte) : null
  });

  guardarDatos("servicios", servicios);
  mostrarServicios();

  document.getElementById("nombreServicio").value = "";
  document.getElementById("descripcionServicio").value = "";
  document.getElementById("precioServicio").value = "";
  document.getElementById("duracionServicio").value = "";
  document.getElementById("corteServicio").value = "";
}

function mostrarServicios() {
  servicios = obtenerServicios();
  catalogoCortes = obtenerDatos("catalogo_cortes");
  const lista = document.getElementById("listaServicios");
  lista.innerHTML = "";

  servicios.forEach(servicio => {
    const corte = catalogoCortes.find(item => Number(item.id_corte) === Number(servicio.id_corte));
    const nombreCorte = corte ? corte.nombre : "Sin corte asociado";

    lista.innerHTML += `
      <li>
        <div class="item-head">
          <span class="item-title">${servicio.nombre}</span>
          <span class="badge badge-pendiente">${servicio.duracion_minutos} min</span>
        </div>
        <div class="item-subtitle">${servicio.descripcion}</div>
        <div class="item-meta">
          <span>${formatearMoneda(servicio.precio)}</span>
          <span>${nombreCorte}</span>
        </div>
      </li>
    `;
  });
}

cargarCortes();
mostrarServicios();
