
export default function HomePage () {
    return (
        <>
            <section className="main-content" id="root">
                <article className="inBox" id="joinSection">
                    <div id="ips">
                        <h2>Únete Al Servidor</h2>
                        <ul>
                            <li>
                                Java:
                                <code className="subBox copy">xbxt.xyz</code>
                            </li>
                            <li>
                                Bedrock:
                                <code className="subBox copy">xbxt.xyz:19132</code>
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
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </article>
                <article className="inBox">
                    <h2>Estadísticas</h2>
                    <ul>
                        <li id="uniqueUsers"></li>
                        <li id="activeTime"></li>
                        <li id="onlinePlayer"></li>
                        <li id="sizeWorlds"></li>
                    </ul>
                    <small>
                        Estadísticas a tiempo real
                    </small>
                </article>
                <article className="inBox">
                    <h2>Características</h2>
                    <h3>Frame dupe</h3>
                    <p id="frameDupe">
                        Puedes duplicar con un item frame y con un item. Actualmente, el fame dupe está al N/A%
                        de probabilidad
                    </p>
                    <h3>Abierto Para Todos</h3>
                    <p>
                        Todos los jugadores se puede unir como jugadores bedrock como de java y si eres
                        premium y no premium
                    </p>
                </article>

                <a className="inbox refImg" href="/img/Captura1.png">
                    <img src="/img/Captura1.png"
                         alt="Captura de pantalla del servidor"
                         className="imageInBox"
                         title="Portal del nether de xbxt.xyz"
                         loading="lazy"
                    />
                </a>
                <a className="inbox refImg" href="/img/Captura2.png">
                    <img src="/img/Captura2.png"
                         alt="Captura de pantalla del servidor"
                         title="Portal del nether de xbxt.xyz"
                         className="imageInBox"
                         loading="lazy"
                    />
                </a>
                <a className="inbox refImg" href="/img/Captura4.png">
                    <img src="/img/Captura4.png"
                         alt="Captura de pantalla del servidor"
                         title="Portal del nether de xbxt.xyz"
                         className="imageInBox"
                         loading="lazy"
                    />
                </a>
                <article className="inbox">
                    <h2>Jugadores conectados</h2>
                </article>
                <article className="inbox" id="render">
                    <p>Hola Mundo</p>
                </article>

            </section>
        </>
    )
}