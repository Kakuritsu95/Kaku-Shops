export default function CategoryCard() {
  return (
    <div className="flex h-[500px] flex-col items-center space-y-6 rounded-3xl bg-orange-500 px-8 text-center sm:w-[48%] lg:w-[32%]">
      <div
        className="mt-8 h-48 w-48 bg-cover bg-center duration-300 hover:h-52 hover:w-52"
        style={{ backgroundImage: `url("/iphone.png")` }}
      />
      <h3 className="text-2xl font-bold text-gray-800">Smartphones</h3>
      <p className="text-sm">
        Discover the latest smartphones with cutting-edge technology, stunning
        designs, and powerful performance. designs, and powerful performance.
      </p>
      <button className="rounded-lg bg-sky-600 px-10 py-3.5 text-gray-100">
        Explore now!
      </button>
    </div>
  );
}
