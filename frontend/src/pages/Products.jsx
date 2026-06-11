import { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "../components/ProductTable";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>

      <ProductTable products={products} />
    </div>
  );
}

export default Products;