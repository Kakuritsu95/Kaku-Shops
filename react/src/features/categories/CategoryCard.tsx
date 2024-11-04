import { Link } from "react-router-dom";

export default function CategoryCard() {
  return (
    <Link
      to={`/products/category/1`}
      className="flex h-[27rem] flex-col items-center rounded-3xl bg-orange-300 px-5 pt-7 text-center sm:w-[48%] lg:w-[32%]"
    >
      <div className="h-[175px] w-80">
        <div
          className="mx-auto h-40 w-40 bg-cover bg-center duration-300 hover:h-44 hover:w-44"
          style={{ backgroundImage: `url("/iphone.png")` }}
        />
      </div>
      <h3 className="mb-5 text-2xl font-bold text-gray-800">Smartphones</h3>
      <p className="text-sm">
        Discover the latest smartphones with cutting-edge technology, stunning
        designs, and powerful performance. designs, and powerful performance.
      </p>
      <button className="mt-6 rounded-lg bg-sky-600 px-8 py-3 text-gray-100">
        Explore now!
      </button>
    </Link>
  );
}
