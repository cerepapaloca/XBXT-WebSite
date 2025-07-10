import { useEffect, useState } from "react";
import "../css/Command.css"

export default function CommandPage() {
    const [commands, setCommands] = useState([]); // 👈 ¡Aquí está el estado!

    useEffect(() => {
        fetch("https://localhost:8443/commands")
            .then(res => res.json())
            .then(data => setCommands(data))
            .catch(err => console.error("Error al cargar comandos:", err));
    }, []);

    return (
        <>
            <section className="row">
                <article className="inbox">
                    <div className="titleCommand">
                        <h1>Lista De Comandos</h1>
                    </div>
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
