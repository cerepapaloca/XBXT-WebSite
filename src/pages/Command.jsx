import { useEffect, useState } from "react";

export default function CommandPage() {
    const [commands, setCommands] = useState([]); // 👈 ¡Aquí está el estado!

    useEffect(() => {
        fetch("https://xbxt.xyz:8443/commands")
            .then(res => res.json())
            .then(data => setCommands(data))
            .catch(err => console.error("Error al cargar comandos:", err));
    }, []);

    return (
        <>
            <section className="row">
                <article className="inbox">
                    <h2>Lista De Comandos</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Description</th>
                            <th>Usage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {commands.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.usage}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </article>
            </section>
        </>
    );
}
