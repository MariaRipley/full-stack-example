import "./Usuario.css";

const Usuario = ({ nombre, edad, nacionalidad }) => {
  return (
    <>
      <h1 className="title">Nombre: {nombre}</h1>
      <p>Edad: {edad}</p>
      <p>Nacionalidad: {nacionalidad}</p>
      <hr />
    </>
  );
};

export default Usuario;
