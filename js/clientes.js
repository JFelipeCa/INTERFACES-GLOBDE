let clientes = obtenerDatos("clientes");

function agregarCliente() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre || !telefono || !correo) return;

  const cliente = {
    id_cliente: clientes.length + 1,
    nombre: nombre,
    telefono: telefono,
    correo: correo,
    fecha_registro: new Date().toISOString(),
    puntaje: 0
  };

  clientes.push(cliente);
  guardarDatos("clientes", clientes);
  mostrarClientes();

  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
}

function mostrarClientes() {
  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes.forEach(cliente => {
    lista.innerHTML += `<li>${cliente.nombre} - ${cliente.telefono} - ${cliente.correo} - Puntaje: ${cliente.puntaje}</li>`;
  });
}

mostrarClientes();
