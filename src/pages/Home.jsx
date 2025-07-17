import {useEffect, useState} from "react";

export default function HomePage () {

    const [setCopiedId] = useState(null);
    const [data, setData] = useState(null);
    const [players, setPlayers] = useState(null);

    // Función genérica de copiado
    const handleCopy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            // después de 1s, quitamos el estilo
            setTimeout(() => setCopiedId(null), 1000);
        } catch (err) {
            console.error("No se pudo copiar:", err);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const metadataResponse = await fetch("https://xbxt.xyz:8443/statistic");
                const json = await metadataResponse.json();
                setData(json);
            } catch (err) {
                console.error("Error al cargar metadata:", err);
            }
        };
        window.addEventListener('scroll', () => {
            updateScroll()
        });
        fetchImages();
        loadImageData();
        let MaxFrames = 377;


        let lastCall = 0;
        const throttleDelay = 50;
        let imageData = [];
        let lastFrame = -1;

        async function loadImageData() {
            try {
                const response = await fetch('/images.json');
                const data = await response.json();
                imageData = data.images;
                MaxFrames = imageData.length - 1; // El frame máximo es el total - 1
            } catch (error) {
                console.error("Error cargando el JSON:", error);
            }
        }

        const imgElement = document.getElementById('renderImg')
        const parallax = document.getElementById('backGroudAux');

        function updateScroll() {
            // Cálculos de posición
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;
            const scrollFraction = Math.min(1, Math.max(0, scrollPosition / maxScroll));
            parallax.style.transform = `translateY(${(scrollFraction * 150) - 150}px)`;

            const now = performance.now();

            // Throttle
            if (now - lastCall < throttleDelay) return;
            lastCall = now;


            // Cálculo de frame
            const currentFrame = Math.floor(scrollFraction * MaxFrames);

            // Cambiar imagen solo si es necesario
            if (currentFrame !== lastFrame && imageData[currentFrame]) {
                lastFrame = currentFrame;

                requestAnimationFrame(() => {
                    // Usar directamente el Base64 del JSON
                    imgElement.src = `data:image/jpeg;base64,${imageData[currentFrame].data}`;

                    // Opcional: Precargar frames siguientes
                    preloadNextFrames(currentFrame);
                });
            }

            function preloadNextFrames(currentFrame) {
                for (let i = 1; i <= 3; i++) {
                    const nextFrame = currentFrame + i;
                    if (nextFrame <= MaxFrames && imageData[nextFrame]) {
                        const img = new Image();
                        img.src = `data:image/jpeg;base64,${imageData[nextFrame].data}`;
                    }
                }
            }
        }
        updateScroll();
// Evento de scroll
        window.addEventListener('scroll', updateScroll);
    }, []);


    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const resp = await fetch('https://xbxt.xyz:8443/playerOnline/');
                const json = await resp.json();
                setPlayers(json);
            } catch (err) {
                console.error('Error al cargar jugadores online:', err);
            }
        };
        fetchPlayers();
        const interval = setInterval(fetchPlayers, 30000); // 30 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <link rel="stylesheet" href="/css/home.css"/>

            <section className="main-content" id="root">
                <article className="inBox" id="joinSection">
                    <div id="ips">
                        <h2>Únete Al Servidor</h2>
                        <ul>
                            <li>
                                Java:
                                <button>
                                    <code onClick={() => handleCopy("xbxt.xyz", "java")}>xbxt.xyz</code>
                                </button>
                            </li>
                            <li>
                                Bedrock:
                                <button onClick={() => handleCopy("xbxt.xyz:19132", "Bedrock")}>
                                    <code>xbxt.xyz:19132</code>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="iconLarge">
                        <img src="img/iconWebSide.png" alt="Icon de la web de XBXT"/>
                    </div>
                </article>
                <article className="inBox" id="decBox">
                    <h1>Descripción</h1>
                    <p>
                        Un servidor anárquico semi-vanilla donde no tendrá reinicios y con un mapa ilimitados, donde
                        podrás
                        hacer lo que quieres sin reglas ni restricciones de ningún tipo.
                    </p>
                </article>
                <article className="inbox" id="discordBox">
                    <iframe className="discord" src="https://discord.com/widget?id=1327001386142924822&theme=dark"
                            width="100%" height="800px" content="width=max, initial-scale=8.0" allowTransparency="true"
                            frameBorder="0"
                            title="Discord de xbxt"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </article>
                <article className="inBox">
                    <h2>Estadísticas</h2>
                    <ul>
                        <li>{data ? data.uniqueUsers || "?" : ""} jugadores unicos</li>
                        <li>Activo durante {Math.round(((data ? data.activeTime || 0 : 0) / 24 / 3600000))} dias
                            y {Math.round(((data ? data.activeTime || 0 : 0) / 3600000) % 24)} horas
                        </li>
                        <li>{Math.round((data ? data.sizeWorlds || 0 : 0) / (1024.0 * 1024))} MB de mundo</li>
                    </ul>
                    <small>
                        Estadísticas a tiempo real
                    </small>
                </article>
                <article className="inBox">
                    <h2>Características</h2>
                    <h3>Dupes</h3>
                    <p>
                        Tiene virios dupes actual mente tiene Frame Dupe y Pisto Dupe
                    </p>
                    <h3>Abierto Para Todos</h3>
                    <p>
                        Todos los jugadores se puede unir como jugadores bedrock como de java y si eres
                        premium y no premium
                    </p>
                </article>
                <article className="inBox" id="videoYouTube">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Lyi0Rn710QU"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen=""></iframe>
                </article>

                <a className="inbox refImg" href="/img/Captura1HighQ.png">
                    <img src="/img/Captura1LowQ.jpg"
                         alt="Captura de pantalla del servidor"
                         title="Grandes Lava Cast De XBXT"
                         className="imageInBox"
                         loading="lazy"
                    />
                </a>
                <a className="inbox refImg" href="/img/Captura2HighQ.png">
                    <img src="/img/Captura2LowQ.jpg"
                         alt="Captura de pantalla del servidor"
                         title="El End De XBXT"
                         className="imageInBox"
                         loading="lazy"
                    />
                </a>
                <article className="inbox" id={"contentPlayer"}>
                    <h2>Jugadores conectados</h2>
                    {players ? (
                        players.length > 0 ? (
                            <ul>
                                {players.map((p) => (
                                    <li>
                                        <div className={"elementPlayer"}>
                                            <strong>{p.name} </strong> <small>Ping: {p.ping} ms</small>
                                            <a className={"headPlayer"}
                                               href={`https://es.namemc.com/profile/${p ? p.uuid || "unknown" : ""}`}>
                                                <img src={`https://crafatar.com/renders/head/${p.uuidSkin}?scale=2`}
                                                     alt={"cabeza de" + p.name} title={p.name}/>
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay jugadores conectados en este momento.</p>
                        )
                    ) : (
                        <p>Cargando jugadores...</p>
                    )}
                </article>
                <article className="inbox" id="render">
                    <img loading="lazy" id={"renderImg"} src="img/FistRender.jpg" alt={"render del spawn"}/>
                </article>
            </section>
        </>
    )
}