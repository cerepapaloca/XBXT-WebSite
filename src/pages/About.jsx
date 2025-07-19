import { useEffect, useState } from "react";
import "css/About.css"

export default function CommandPage() {
    const [data, setData] = useState([]);
    const [plugins, setPlugin] = useState([])

    useEffect(() => {
        fetch("https://xbxt.xyz:8443/about")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setPlugin(json.plugins)
            })
            .catch(err => console.error("Error al cargar comandos:", err));
    }, []);

    return (
        <>
            <div className={"main-content"}>
                <section className="inbox question">
                    <h1>Preguntas Frecuentes</h1>
                    <article className={"subBox"}>
                        <h3>¿Me puedo unir si soy de bedrock?</h3>
                        <p>Si, el servidor tiene geyser y unas modificaciones especial para los jugadores bedrock para que sea lo más cómodo de jugar</p>
                    </article>
                    <article className={"subBox"}>
                        <h3>¿Se puede usar Hacks?</h3>
                        <p>Si se permite usar hacks o clientes modificados</p>
                    </article>
                    <article className={"subBox"}>
                        <h3>¿Me puedo unir como jugador no premium?</h3>
                        <p>Si, eso si requieres una contraseña para iniciar sesión en el servidor</p>
                    </article>
                    <article className={"subBox"}>
                        <h3>¿Que hago si se me olvido mi contraseña?</h3>
                        <p>No te preocupes solo abre ticked en el servidor de <a href="https://discord.gg/7ubQQFVMWF" target="_blank">discord</a> para restablece
                            la contraseña</p>
                    </article>
                    <article className={"subBox"}>
                        <h3>¿Por que juega poca gente?</h3>
                        <p>No ha una explicación exacta, puede ser baja visibilidad del servidor y la baja cantidad de jugadores actualmente, esto crea
                        un circulo vicioso</p>
                    </article>
                    <article className={"subBox"}>
                        <h3>¿Quien es el Owner?</h3>
                        <p>Actualmente el owner es <a href={"https://es.namemc.com/profile/cerespapaloca"} target="_blank">cerespapaloca</a></p>
                    </article>
                    <article  className={"subBox"}>
                        <h3>¿Como me cambio de Skin?</h3>
                        <p>Para cambiar de skin usa <code>/skin set</code> pero para que se muestre en la pagina no uses skin por URL ni custom solo por UUID o nombre</p>
                    </article>
                    <article  className={"subBox"}>
                        <h3>¿Como puedo publicar mi MapArt?</h3>
                        <p>necesitas un mapArt en la mano y ejecutas <code>/mapart</code> y listo ya se habrá publicado, Si se ve vacío es normal hay que esperara que el server guarde el
                        mapArt este proceso puede tardar horas</p>
                    </article>
                </section>
                <article className={"inbox"}>
                    <h2>Especificaciones Del Servidor</h2>
                    <p>Actualmente esta hosteado en la casa de <a href={"https://es.namemc.com/profile/cerespapaloca"} target="_blank">cerespapaloca</a> en colombia
                    en un portatil <a href={"https://pcsupport.lenovo.com/co/es/products/laptops-and-netbooks/ideapad-y-series-laptops/ideapad-y480"} target="_blank">Y480</a> con
                    16GB de ram, permanentemente encendido</p>
                    <p>De sistema operativo usa Linux Ubuntu Server <i>(24.04.2 LTS)</i></p>
                    <ul>
                        <li>Version Mc: {data.versionMc} <small>{data.versionFull}</small></li>
                        <li>Software: {data.softwareName}</li>
                        <li>Ram: 16gb <small>12GB para minecraft</small></li>
                        <li>CPU: i7-3610QM</li>
                        <li>Almacenamiento: HDD 1TB <small>Usable por el servidor 800gb~</small></li>
                    </ul>
                </article>
                <section className={"inbox "}>
                    <h2>Plugins</h2>
                    <div className={"plugins"}>
                        {plugins ? (
                            plugins.length > 0 ? (
                                plugins.map((p) => (
                                    p.webSite ? (
                                        <article className={"subBox"}>
                                            <h4><a href={p.webSite} target="_blank">{p.name}</a></h4>
                                            <i>{p.author}</i> <small>v{p.version}</small>
                                        </article>
                                    ) : (
                                        <article className={"subBox"}>
                                            <h4>{p.name}</h4>
                                            <i>{p.author}</i> <small>v{p.version}</small>
                                        </article>
                                    )
                                ))
                            ) : (
                                <p>No hay plugins?!</p>
                            )
                        ) : (
                            <p>Cargando plugins...</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
