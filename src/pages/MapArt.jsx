import { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import '../css/mapArt.css';


export default function MapGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://xbxt.xyz:8443/mapArtData/");
                const imageList = await response.json();

                const imageData = await Promise.all(
                    imageList.map(async (imageName) => {
                        const metadataResponse = await fetch(`https://xbxt.xyz:8443/mapArtData/${imageName}`);
                        const metadata = await metadataResponse.json();

                        return {
                            name: imageName,
                            url: `https://xbxt.xyz:8443/mapArtImg/${imageName}`,
                            title: metadata.author || "Desconocido",
                        };
                    })
                );

                setImages(imageData);
            } catch (err) {
                console.error("Error al cargar imágenes:", err);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const timeout = setTimeout(() => {
            const elem = document.querySelector('.masonryContainer');
            if (elem) {
                new Isotope(elem, {
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: 1,
                        fitWidth: true,
                    },
                });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [images]);

    return (
        <section id="mapContainer" className="masonryContainer">
            <div className="grid-sizer"></div>
            {images.map((img, index) => (
                <a
                    key={index}
                    className="grid-item refImg inbox"
                    href={`/mapart/id/${img.name}`}
                >
                    <img
                        src={img.url}
                        alt={`Map Art - ${img.name}`}
                        title={img.title}
                        style={{ cursor: "pointer" }}
                    />
                </a>
            ))}
        </section>
    );
}
