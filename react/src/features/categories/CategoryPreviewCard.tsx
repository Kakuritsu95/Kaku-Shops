import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Category } from "../../types/categoryInterface";
import API_ROUTES from "../../api-routes/apiRoutes";

export default function CategoryPreviewCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link
      to={`/products/category/${category.id}`}
      className="flex h-[27rem] flex-col items-center rounded-3xl bg-orange-300 px-5 pt-7 text-center sm:w-[48%] lg:w-[32%]"
    >
      <div className="h-[175px] w-80">
        <div
          className="mx-auto h-40 w-40 bg-cover bg-center duration-300 hover:h-44 hover:w-44"
          style={{
            backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.categoryImage.download(category?.image.id)})`,
          }}
        />
      </div>
      <div className="space-y-5">
        <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
        <p className="text-sm">
          Discover the latest smartphones with cutting-edge technology, stunning
          designs, and powerful performance. designs, and powerful performance.
        </p>
        <Button color="sky">Explore now!</Button>
      </div>
    </Link>
  );
}
