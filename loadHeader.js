// loadHeader.js
document.addEventListener("DOMContentLoaded", () => {
    let token = localStorage.getItem("token");

    // Si no hay token → mandar al login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    let payload = {};

    try {
        payload = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        payload = { nombre: "Doctor", apellido: "Simulado", rol: "doctor" };
    }

    const headerContainer = document.createElement("div");
    headerContainer.innerHTML = `
        <div class="header">
            <div class="header-left">
                <span id="info-doctor"></span>
            </div>
            <h1>Plataforma Web de Detección Temprana de Síntomas de Fibromialgia</h1>
            <button class="btn-cerrar">Cerrar sesión</button>
        </div>
    `;

    document.body.prepend(headerContainer);

    document.getElementById("info-doctor").textContent =
        `👤 ${payload.nombre} ${payload.apellido} — ${payload.rol}`;

    const btnCerrar = document.querySelector(".btn-cerrar");

    btnCerrar.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html"; // 👉 Redirige correctamente
    });
});
