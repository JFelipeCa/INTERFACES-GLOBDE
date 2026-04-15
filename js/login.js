function login() {
  const correo = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");
  const usuarios = obtenerDatos("usuarios");

  const usuarioEncontrado = usuarios.find(
    usuario => usuario.correo === correo && usuario.contrasena === password
  );

  if (!usuarioEncontrado) {
    mensaje.style.color = "red";
    mensaje.textContent = "Correo o contrasena incorrectos";
    return;
  }

  guardarUsuarioActual(usuarioEncontrado);
  mensaje.style.color = "green";
  mensaje.textContent = esCliente(usuarioEncontrado)
    ? "Ingreso de cliente exitoso"
    : "Ingreso administrativo exitoso";

  setTimeout(() => {
    window.location.href = obtenerDestinoPorRol(usuarioEncontrado);
  }, 700);
}

(function validarSesionActiva() {
  const usuario = obtenerUsuarioActual();
  if (usuario) {
    window.location.href = obtenerDestinoPorRol(usuario);
  }
})();
