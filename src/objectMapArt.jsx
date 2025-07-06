import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MapArtObject() {

    // const { uuid } = useParams(); // Lee la UUID desde la URL
    // const [objeto, setObjeto] = useState(null);

    // useEffect(() => {
    //     // Simular una petición al backend (puedes usar fetch o axios)
    //     fetch(`https://tu-api.com/objetos/${uuid}`)
    //         .then(res => res.json())
    //         .then(data => setObjeto(data))
    //         .catch(err => console.error(err));
    // }, [uuid]);

    // if (!objeto) return <div>Cargando objeto con ID a...</div>;


    return (
        <div>
            <h1>Objeto: a</h1>
            <p>UUID: a</p>
            <p>Descripción: a</p>
        </div>
    );
}
export default MapArtObject;