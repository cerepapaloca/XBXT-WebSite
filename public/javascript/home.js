async function obtenerEstado() {
    try {
        let response = await fetch("https://xbxt.xyz:8443/statistic");
        let data = await response.json();
        document.getElementById("uniqueUsers").textContent = `${data.uniqueUsers} jugadores unicos`;
        let hour = convertirToHour(data.activeTime);
        document.getElementById("activeTime").textContent = `Tiempo activo durante ${Math.round(hour/24)} dias y ${hour%24} horas`
        document.getElementById("onlinePlayer").textContent = `${data.onlinePlayer} jugadores conectados de ${data.maxPlayers}`
        document.getElementById("sizeWorlds").textContent = `${Math.round(data.sizeWorlds/(1024.0 * 1024))} MB de mundo`
        document.getElementById("frameDupe").textContent = document.getElementById("frameDupe").textContent.replace("N/A", data.frameDupe*100)
    } catch (error) {
        console.error("Error al obtener el estado:", error);
    }

}
obtenerEstado();
setInterval(obtenerEstado, 1000*60);

function convertirToHour(ms) {
    let segundos = Math.floor(ms / 1000);
    let minutos = Math.floor(segundos / 60);
    return Math.floor(minutos / 60)
}
document.querySelectorAll(".copy").forEach((button) => {
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(button.textContent).then(() => {
            button.style.backgroundColor = "#00b62f";

            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 1000);
        });
    });
});