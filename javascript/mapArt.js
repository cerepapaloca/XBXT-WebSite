async function ImageGallery() {
    const container = document.getElementById("mapContainer");

    // Cargar lista de imágenes
    const response = await fetch("https://xbxt.xyz:8443/mapArtData/");
    const imageList = await response.json();

    for (const imageName of imageList) {
        const imageUrl = `https://xbxt.xyz:8443/mapArtImg/${imageName}`;
        const metadataResponse = await fetch(`https://xbxt.xyz:8443/mapArtData/${imageName}`);
        const metadata = await metadataResponse.json();

        // Crear contenedor para cada imagen
        const wrapper = document.createElement("div");
        wrapper.className = "grid-item refImg inbox";

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = `Map Art - ${imageName}`;
        image.title = metadata.author || "Desconocido";
        image.style.cursor = "pointer";

        // Abrir imagen en nueva pestaña al hacer clic
        image.addEventListener("click", () => {
            window.open(image.src, '_blank');
        });

        wrapper.appendChild(image);
        container.appendChild(wrapper);
    }
    setTimeout(() => {
        const elem = document.querySelector('.masonryContainer');
        const iso = new Isotope(elem, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 1,
                fitWidth: true

            },
        });
    }, 100);
// Por esto:

}

ImageGallery();