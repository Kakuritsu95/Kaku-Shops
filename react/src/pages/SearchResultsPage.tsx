import { useSearchParams } from "react-router-dom";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("keyword"));
  return <div>Results for: {searchParams.get("keyword")}</div>;
}
