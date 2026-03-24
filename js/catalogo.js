let servicios = obtenerDatos("servicios");
let catalogoCortes = obtenerDatos("catalogo_cortes");

function cargarCortes() {
  const selectCorte = document.getElementById("corteServicio");
  selectCorte.innerHTML = '<option value="">Selecciona un corte asociado</option>';

  catalogoCortes.forEach(corte => {
    selectCorte.innerHTML += `<option value="${corte.id_corte}">${corte.nombre}</option>`;
  });
}

function agregarServicio() {
  const nombre = document.getElementById("nombreServicio").value.trim();
  const descripcion = document.getElementById("descripcionServicio").value.trim();
  const precio = Number(document.getElementById("precioServicio").value);
  const duracion = Number(document.getElementById("duracionServicio").value);
  const idCorte = document.getElementById("corteServicio").value;

  if (!nombre || !descripcion || !precio || !duracion) return;

  const servicio = {
    id_servicio: servicios.length + 1,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    duracion_minutos: duracion,
    id_corte: idCorte ? Number(idCorte) : null
  };

  servicios.push(servicio);
  guardarDatos("servicios", servicios);
  mostrarServicios();

  document.getElementById("nombreServicio").value = "";
  document.getElementById("descripcionServicio").value = "";
  document.getElementById("precioServicio").value = "";
  document.getElementById("duracionServicio").value = "";
  document.getElementById("corteServicio").value = "";
}

function mostrarServicios() {
  const lista = document.getElementById("listaServicios");
  lista.innerHTML = "";

  servicios.forEach(servicio => {
    const corte = catalogoCortes.find(item => item.id_corte === servicio.id_corte);
    const nombreCorte = corte ? corte.nombre : "Sin corte asociado";

    lista.innerHTML += `<li>${servicio.nombre} - ${servicio.descripcion} - $${servicio.precio} - ${servicio.duracion_minutos} min - ${nombreCorte}</li>`;
  });
}

cargarCortes();
mostrarServicios();
