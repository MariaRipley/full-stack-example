import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../componentes/Menu/Menu";

export default function RickAndMorty() {
  const [rickAndMortyData, setRickandMortyData] = useState([]);

  useEffect(() => {
    //Llamada para obtener datos de Rick and Morty desde servidor
    axios
      .get("http://localhost:3001/table-data")
      .then((response) => {
        console.log("Personajes de Rick and Morty: ", response.data);
        setRickandMortyData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener personajes de Rick and Morty: ", error);
      });
  }, []);

  return (
    <>
      {/* Renderizar datos de la tabla 'personajes' */}
      <h3>Rick and Morty</h3>
      <Menu />
      <ul>
        {rickAndMortyData.map((character, index) => (
          <li key={index}>
            Nombre: {character.nombre} | Ubicación: {character.ubicación} | Núm
            de episodios: {character.num_episodios}
          </li>
        ))}
      </ul>
    </>
  );
}
