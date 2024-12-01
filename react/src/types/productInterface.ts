import { Image } from "./imageInterface";
import { Category } from "./categoryInterface";
import { PagedData } from "./PagedData";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  inventory: number;
  description: string;
  averageRating: number;
  category: Category;
  images: Array<Image>;
}
export interface AddProduct
  extends Omit<Product, "id" | "category" | "images"> {
  category: string;
  images: Array<File>;
}

export interface SearchProductsResult {
  products: PagedData<Product>;
  relevantCategories: Array<Category>;
  relevantBrands: Array<string>;
}
export type UpdateProduct = Partial<AddProduct>;
