if (protegerRuta()) {
  construirMenu();

  const usuario = sincronizarSesionConUsuarios();
  const nombre = document.getElementById("perfilNombre");
  const correo = document.getElementById("perfilCorreo");
  const telefono = document.getElementById("perfilTelefono");
  const contrasena = document.getElementById("perfilContraseña");
  const mensaje = document.getElementById("mensajePerfil");

  document.getElementById("perfilRolEtiqueta").textContent = esCliente(usuario) ? "Perfil cliente" : "Perfil administrador";
  document.getElementById("perfilTitulo").textContent = esCliente(usuario) ? "Tu cuenta de cliente" : "Tu perfil administrativo";
  document.getElementById("perfilDescripcion").textContent = esCliente(usuario)
    ? "Actualiza tus datos de contacto y conserva tu acceso a reservas."
    : "Gestiona tus datos de acceso y manten actualizada tu informacion interna.";

  document.getElementById("perfilRol").textContent = obtenerNombreRol(usuario);
  document.getElementById("perfilPuntaje").textContent = usuario.puntaje || 0;
  document.getElementById("perfilRegistro").textContent = formatearFecha((usuario.fecha_registro || usuario.fecha_creacion || "").slice(0, 10));
  document.getElementById("perfilId").textContent = usuario.id_usuario;

  nombre.value = usuario.nombre || "";
  correo.value = usuario.correo || "";
  telefono.value = usuario.telefono || "";

  window.guardarPerfil = function guardarPerfil() {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex(item => Number(item.id_usuario) === Number(usuario.id_usuario));

    if (indice < 0) {
      return;
    }

    usuarios[indice] = {
      ...usuarios[indice],
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      telefono: telefono.value.trim(),
      contrasena: contrasena.value.trim() ? contrasena.value.trim() : usuarios[indice].contrasena
    };

    guardarDatos("usuarios", usuarios);
    guardarUsuarioActual(usuarios[indice]);
    mensaje.textContent = "Perfil actualizado correctamente.";
    mensaje.style.color = "var(--exito)";
    contrasena.value = "";
  };
}
