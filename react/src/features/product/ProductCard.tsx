import { Link } from "react-router-dom";
import { Product } from "../../types/productInterface";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li className="sm:w-[48%] lg:w-[32%]">
      <div className="flex h-[25rem] items-center rounded-md bg-gray-100">
        <div
          className="mx-auto h-64 w-64 bg-cover bg-center duration-300"
          style={{ backgroundImage: `url("/iphone.png")` }}
        />
      </div>
      <div className="my-2 flex flex-col space-y-1">
        <Link
          to=""
          className="font-semibold tracking-wide underline-offset-2 hover:underline"
        >
          {product.name}
        </Link>
        <span>Made by {product.brand}</span>
        <span className="text-lg font-bold">{product.price}€</span>
      </div>
    </li>
  );
}
