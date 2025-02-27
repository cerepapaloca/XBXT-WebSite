
async function ImageGallery() {
    let response = await fetch("https://xbxt.xyz:8443/mapArtData/");
    let json = await response.json();
    const container = document.getElementById("mapContainer");
    for (const data of json) {
        const index = `https://xbxt.xyz:8443/mapArtImg/${data}`
        let response = await fetch(`https://xbxt.xyz:8443/mapArtData/${data}`);
        let json = await response.json();
        const rowElement = document.createElement("a");
        rowElement.className = "grid-item inbox refImg"
        rowElement.href = index
        rowElement.innerHTML = `<img src=${index} alt={Image ${index}} title="${json.author}"/>`;
        container.appendChild(rowElement)
    }
}
ImageGallery()
