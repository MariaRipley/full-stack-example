import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../componentes/Menu/Menu";

export default function Pokemon() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Llamada a la API de Pokémon para extraer nombres y URLs
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=10"
        );

        //Obtener las URLs de los Pokémon
        const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);

        //Realizar solicitudes a cada URL individual para obtener datos completos
        const pokemonDetails = await Promise.all(
          pokemonUrls.map((url) => axios.get(url))
        );

        //Extraer los datos completos de cada respuesta y actualizar el estado
        const updatedPokemonData = pokemonDetails.map((detail) => detail.data);
        setPokemonData(updatedPokemonData);
      } catch (error) {
        console.error("Error al obtener datos de la API de Pokémon: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h3>Pokémon</h3>
      <Menu />
      {/* Renderizar datos de la API de Pokémon */}
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>
            Nombre: {pokemon.name}, Altura: {pokemon.height}m, Peso:{" "}
            {pokemon.weight}kg
          </li>
        ))}
      </ul>
    </>
  );
}
