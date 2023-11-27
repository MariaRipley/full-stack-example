import { NavLink, Outlet } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink end to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/rickandmorty"}>Datos de Rick and Morty</NavLink>
          </li>
          <li>
            <NavLink to={"/pokemon"}>Datos de Pokémon</NavLink>
          </li>
          <li>
            <NavLink to={"/store"}>Fake Store</NavLink>
          </li>
          <li>
            <NavLink to={"/pruebas"}>
              Aquí hago todas mis pruebas de código
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  );
}
