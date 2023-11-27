import { useEffect, useState } from "react";
import axios from "axios";
import Usuario from "./componentes/Usuario/Usuario";
import Card from "./componentes/Card/Card";
import ProductList from "./componentes/ProductList.jsx/ProductList";
import Menu from "./componentes/Menu/Menu";
import { Routes, Route } from "react-router-dom";
import FakeStore from "./rutas/Fake-store";
import Home from "./rutas/Home";
import Pokemon from "./rutas/Pokemon";
import RickAndMorty from "./rutas/Rick-and-Morty";
import Error from "./rutas/Error";
import ProductDetails from "./rutas/ProductDetails";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [rickAndMortyData, setRickAndMortyData] = useState([]);
  const [rickAndMortyFetched, setRickAndMortyFetched] = useState(false);

  // Llamada a endpoint local
  const callEndpoint = () => {
    axios
      .get("/api/endpoint")
      .then((response) => {
        console.log("Respuesta del servidor: ", response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud al servidor: ", error);
      });
  };

  // Llamada a la API de Pokémon
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
      const pokemonDetails = await Promise.all(
        pokemonUrls.map((url) => axios.get(url))
      );
      const updatedPokemonData = pokemonDetails.map((detail) => detail.data);
      setPokemonData(updatedPokemonData);
    } catch (error) {
      console.error("Error al obtener datos de la API de Pokémon: ", error);
    }
  };

  // Llamada para obtener datos de Rick and Morty desde servidor
  const fetchRickAndMortyData = () => {
    axios
      .get("http://localhost:3001/table-data")
      .then((response) => {
        console.log("Personajes de Rick and Morty: ", response.data);
        setRickAndMortyData(response.data);
        setRickAndMortyFetched(true);
      })
      .catch((error) => {
        console.error("Error al obtener personajes de Rick and Morty: ", error);
      });
  };

  useEffect(() => {
    // Llamar a las funciones que realizan las solicitudes
    callEndpoint();
    fetchPokemonData();
    if (!rickAndMortyFetched) {
      //Llamar a fetchRickAndMortyData solo si los datos no se han obtenido
      fetchRickAndMortyData();
    }
  }, [rickAndMortyFetched]); //Ejecutar useEffect cada vez que rickAndMortyFetched cambie

  return (
    <>
      <h1>ROUTES</h1>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="store" element={<FakeStore />}></Route>
          <Route path="store/:id" element={<ProductDetails />}></Route>
          <Route path="rickandmorty" element={<RickAndMorty />}></Route>
          <Route path="pokemon" element={<Pokemon />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
