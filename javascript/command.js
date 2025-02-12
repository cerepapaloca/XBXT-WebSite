async function obtenerEstado(){
    // JSON con los datos
    let response = await fetch("https://xbxt.xyz:8443/commands");
    let data = await response.json();
    const tablaBody = document.getElementById("tabla-body");

    data.forEach(item => {
        const fila = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = item.name;

        const description = document.createElement("td");
        description.textContent = item.description;

        const usage = document.createElement("td");
        usage.textContent = item.usage;

        fila.appendChild(name);
        fila.appendChild(description);
        fila.appendChild(usage);
        tablaBody.appendChild(fila);
    });
}
obtenerEstado()