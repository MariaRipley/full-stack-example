import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  return (
    <>
      <h1>Detalle de producto : {params.id}</h1>
    </>
  );
};

export default ProductDetails;
