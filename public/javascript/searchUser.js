async function buscar() {
    const query = document.getElementById("searchInput").value;

    try {
        // URL de la API (ejemplo con la API de Wikipedia)
        const response = await fetch(`https://xbxt.xyz:8443/playerStats/${query}`);
        const data = await response.json();
        const table = document.getElementById("statsTableBody");
        table.innerHTML = "";
        // Limpiar resultados anteriores

        // Mostrar resultados
        //const row = document.createElement("tr");
        let totalBlockBroken = 0;
        if (data.stats["minecraft:mined"]) {
            for (const bloque in data.stats["minecraft:mined"]) {
                let cantidad = data.stats["minecraft:mined"][bloque];
                totalBlockBroken += cantidad;
            }
            agregarFila("Bloques Rotos", totalBlockBroken);
        } else {
            agregarFila("Bloques Rotos", "0")
        }
        let totalBlockPlace = 0;

        if (data.stats["minecraft:used"]) {
            for (const bloque in data.stats["minecraft:used"]) {
                let cantidad = data.stats["minecraft:used"][bloque];
                totalBlockPlace += cantidad;
            }
            agregarFila("Items Usados/Colocados", totalBlockPlace);
        } else {
            agregarFila("Items Usados/Colocados", "0")
        }

        if (data.stats["minecraft:killed"]) {
            if (data.stats["minecraft:killed"]["minecraft:player"]) {
                agregarFila("Eliminaciones", data.stats["minecraft:killed"]["minecraft:player"])
            } else {
                agregarFila("Eliminaciones", "0")
            }
        }else {
            agregarFila("Eliminaciones", "0")
        }

        if (data.stats["minecraft:custom"]) {
            if (data.stats) {
                agregarFila("Muertes", data.stats["minecraft:custom"]["minecraft:deaths"]);
            } else {
                agregarFila("Muertes", "0");
            }
            if (data.stats["minecraft:custom"]["minecraft:mob_kills"]) {
                agregarFila("Mods Eliminados", data.stats["minecraft:custom"]["minecraft:mob_kills"])
            } else {
                agregarFila("Mods Eliminados", "0")
            }

            if (data.stats["minecraft:custom"]["minecraft:play_time"]) {
                agregarFila("Tiempo Jugado", Math.round(data.stats["minecraft:custom"]["minecraft:play_time"] /20/3600.0) + "h")
            }else {
                agregarFila("Tiempo Jugado", "0h")
            }

            if (data.stats["minecraft:custom"]["minecraft:walk_one_cm"]){
                agregarFila("Distancia Caminada", Math.round(data.stats["minecraft:custom"]["minecraft:walk_one_cm"] /1000) + "m")
            }else {
                agregarFila("Distancia Caminada", "0m")
            }

            if (data.stats["minecraft:custom"]["minecraft:fly_one_cm"]){
                agregarFila("Distancia Volada", Math.round(data.stats["minecraft:custom"]["minecraft:fly_one_cm"] /1000) + "m")
            }else {
                agregarFila("Distancia Volada", "0m")
            }
        }
    } catch (error) {
        mostrarCuadrado()
        console.error("Error en la búsqueda:", error);
    }
}

function mostrarCuadrado() {
    let cuadrado = document.getElementById("noFoundBox");
    cuadrado.style.opacity = "100"; // Muestra el cuadrado

    // Desaparece después de 2 segundos
    setTimeout(() => {
        cuadrado.style.opacity = "0";
    }, 3000);
}

function agregarFila(name, number) {
    const tbody = document.getElementById("statsTableBody");
    const fila = document.createElement("tr");
    fila.innerHTML = `<tr><td>${name}</td><td>${number}</td></tr>`;
    tbody.appendChild(fila);
}