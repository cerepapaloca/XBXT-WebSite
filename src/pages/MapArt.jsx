import { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import '../css/mapArt.css';


export default function MapGallery() {
    // const updateFade = function () {
    //     let boxMap = document.querySelectorAll('.transformUp');
    //     let altura = window.innerHeight / 1.5;
    //
    //     boxMap.forEach(bax => {
    //         let distance = bax.getBoundingClientRect().top;
    //
    //         if (distance <= altura) {
    //             bax.classList.add('aparece');
    //         } else {
    //             bax.classList.remove('aparece');
    //         }
    //     })
    // }
    // window.addEventListener('scroll', updateFade)

    const showItem = function () {
        const items = document.querySelectorAll('.grid-item');

        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('aparece');
            }, index * 50); // animación escalonada
        });
    };

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://localhost:8443/mapArtData/");
                const imageList = await response.json();

                const imageData = await Promise.all(
                    imageList.map(async (imageName) => {
                        const metadataResponse = await fetch(`https://localhost:8443/mapArtData/${imageName}`);
                        const metadata = await metadataResponse.json();

                        return {
                            name: imageName,
                            url: `https://localhost:8443/mapArtImg/${imageName}`,
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
            showItem()
            // updateFade()

        }, 200);

        return () => clearTimeout(timeout);
    }, [images]);





    return (
        <section id="mapContainer" className="masonryContainer">
            <div className="grid-sizer"></div>
            {images.map((img, index) => (
                <a
                    key={index}
                    className="grid-item refImg inbox transformUp"
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
