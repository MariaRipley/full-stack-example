import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import "./ProductList.css";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const totalProducts = products.length;

  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const products = await data.json();

    setProducts(products);
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <>
      <div className="container-products">
        {products
          .map((product) => (
            <div key={product.id} className="product">
              <figure className="container-img">
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="info-product">
                <NavLink to={`/store/${product.id}`}>
                  <h3>{product.title}</h3>
                </NavLink>
                <p className="price">$ {product.price}</p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))
          .slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
      />
    </>
  );
};

export default ProductList;
