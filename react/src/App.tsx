import { useEffect } from "react";
import { Product } from "./types/productInterface";
import cartService from "./service/cartService";

function App() {
  useEffect(() => {
    async function getById() {
      const product: Product = await cartService.addItem(3, 1);
    }
    getById();
  }, []);
  return <p className="text-blue-200">his</p>;
}

export default App;
