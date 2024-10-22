import { useEffect } from "react";
import { productService } from "./service/productService";
import { Product } from "./types/productInterface";

function App() {
  useEffect(() => {
    async function getById() {
      const product: Product = await productService.getById(1);
      console.log(product.id);
    }
    getById();
  }, []);
  return <p className="text-blue-200">his</p>;
}

export default App;
