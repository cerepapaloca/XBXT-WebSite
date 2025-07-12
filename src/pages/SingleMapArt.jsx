import '../css/SingleMapArt.css';
import {useEffect, useRef, useState} from "react";

export default function SingleMapArtPage({ routeParams }) {
    const imgRef = useRef();
    const [data, setData] = useState(null);

    const id = routeParams.uuid

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const metadataResponse = await fetch(`https://localhost:8443/mapArtData/${id}`);
                const json = await metadataResponse.json();
                setData(json);
            } catch (err) {
                console.error("Error al cargar metadata:", err);
            }
        };

        fetchImages();
    }, [id]);

    return (
        <>
            <meta name="description" content="MapArts De XBXT"/>
            <meta property="og:image" content= {`https://localhost:8443/mapArtImg/${id}?scale=4`}/>
            <meta property="twitter:image" content={`https://localhost:8443/mapArtImg/${id}?scale=4`} />
            <title>Map Art</title>

            <section className="contentSection">
                <a className="inbox refImg" href={`https://localhost:8443/mapArtImg/${id}?scale=6`}>
                    <img
                        className="imageInBox largeMapArt"
                        src={`https://localhost:8443/mapArtImg/${id}`}
                        alt={`MapArt ${id}`}
                    />
                </a>
                <article className="inbox contentText">
                    <small>Nombre</small>
                    <h1>{data ? data.name || "N/A" : ""}</h1>
                    <br/>
                    <small>Descripción</small>
                    <p>{data ? data.description || "N/A" : ""}</p>
                    <h3>Autor</h3>
                    <p>{data ? data.author || "N/A" : ""}</p>

                    <p>Tamaño: {data ? data.width || "" : ""}x{data ? data.height || "" : ""}</p>

                    <p>NSFW: {data ? (data.nsfw ? "no" : "si") || "?" : ""}</p>

                    <p>Subido por: <a
                        href={`https://es.namemc.com/profile/${data ? data.uploaderUUID || "unknown" : ""}`}>
                        {data ? data.uploader || "N/A" : ""}
                    </a></p>
                    <img src={`https://crafatar.com/renders/body/${data ? data.uploaderUUID || "unknown" : ""}?scale=2`}
                         alt={"Cuerpo de " + (data ? data.uploader || "unknown" : "")}
                         title={data ? data.uploader || "unknown" : ""}/>
                </article>
            </section>
        </>
    );
}