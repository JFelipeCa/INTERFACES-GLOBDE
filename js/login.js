function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");
  const usuarios = obtenerDatos("usuarios");

  const usuarioEncontrado = usuarios.find(item => item.correo === usuario && item.contrasena === password);

  if (usuarioEncontrado) {
    mensaje.style.color = "green";
    mensaje.textContent = "Login exitoso";

    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    mensaje.style.color = "red";
    mensaje.textContent = "Correo o contrasena incorrectos";
  }
}
