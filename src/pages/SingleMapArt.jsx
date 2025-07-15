import '../css/SingleMapArt.css';
import {useEffect, useRef, useState} from "react";

export default function SingleMapArtPage({ routeParams }) {
    const imgRef = useRef();
    const [data, setData] = useState(null);
    const [players, setPlayers] = useState(null);

    const id = routeParams.uuid

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const metadataResponse = await fetch(`https://xbxt.xyz:8443/mapArtData/${id}`);
                const json = await metadataResponse.json();
                setData(json);
                setPlayers(json.players)
            } catch (err) {
                console.error("Error al cargar metadata:", err);
            }
        };

        fetchImages();

        const container = document.getElementById('mapArtImg');
        const maxHeight = 770;

        const originalWidth = container.clientWidth;
        const originalHeight = container.clientHeight;
        if (originalHeight > maxHeight) {

            // img.style.height = `${maxHeight}px`;
        }
        const scale = maxHeight / originalHeight;
        container.style.maxWidth = `${originalWidth * scale}px`;

    }, [id]);

    return (
        <>
            <meta name="description" content="MapArts De XBXT"/>
            <meta property="og:image" content= {`https://xbxt.xyz:8443/mapArtImg/${id}?scale=4`}/>
            <meta property="twitter:image" content={`https://xbxt.xyz:8443/mapArtImg/${id}?scale=4`} />
            <title>Map Art</title>

            <section className="contentSection">
                <a className="inbox refImg" id={"mapArtImg"} href={`https://xbxt.xyz:8443/mapArtImg/${id}?scale=6`}>
                    <img
                        className="imageInBox largeMapArt"
                        src={`https://xbxt.xyz:8443/mapArtImg/${id}`}
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

                    <p>Subido por: {data ? data.uploader || "N/A" : ""}</p>

                    <div className={"skinPlayerContainer"}>
                        {players ? (
                            players.length > 0 ? (
                                players.map((player) => (
                                    <a className={"skinPlayer"} href={`https://es.namemc.com/profile/${player ? player.uuidSkin || "unknown" : ""}`}>
                                        <img src={`https://crafatar.com/renders/body/${player.uuidSkin ? player.uuidSkin || "unknown" : ""}?scale=2`}
                                             alt={"Cuerpo de " + (player.name ? player.name || "unknown" : "")}
                                             title={player.name ? player.name || "unknown" : ""}/>
                                    </a>
                                ))
                            ) : (
                                <p>No hay jugadores conectados en este momento.</p>
                            )
                        ) : (
                            <p>Cargando jugadores...</p>
                        )}
                    </div>
                </article>
            </section>
        </>
    );
}