console.log("Sistema de barberia iniciado");

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}
