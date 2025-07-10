import { useParams } from 'react-router-dom';
import '../css/SingleMapArt.css';
import { useEffect, useState } from "react";

export default function SingleMapArtPage() {
    const [data, setData] = useState(null);

    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const metadataResponse = await fetch(`https://localhost:8443/mapArtData/${id}`);
                const json = await metadataResponse.json();
                console.log(json)
                setData(json);
            } catch (err) {
                console.error("Error al cargar metadata:", err);
            }
        };

        fetchImages();
    }, [id]);

    return (
        <section className="contentSection">
            <a className="inbox refImg">
                <img
                    className="imageInBox largeMapArt"
                    src={`https://localhost:8443/mapArtImg/${id}`}
                    alt={`MapArt ${id}`}
                />
            </a>
            <article className="inbox contentText">
                <h1>{data ? data.name || "*Sin Nombre" : ""}</h1>
                <h2>Descripción</h2>
                <p>{data ? data.description || "*Sin Descripción" : ""}</p>
                <ul>
                    <li>
                        <p>Autor: {data ? data.author || "*Anónimo" : ""}</p>
                    </li>
                    <li>
                        <p>Tamaño: {data ? data.width || "" : ""}x{data ? data.height || "" : ""}</p>
                    </li>
                    <li>
                        <p>NSFW: {data ? (data.nsfw ? "no" : "si") || "?" : ""}</p>
                    </li>
                </ul>
            </article>
        </section>
    );
}