import Searchbar from "./Searchbar";
import Topbar from "./Topbar";
import Brandbar from "./Brandbar";

export default function Navbar() {
  return (
    <header className="space-y-3">
      <Topbar />
      <Brandbar />
      <Searchbar smallScreen={true} />
      <div>categories</div>
    </header>
  );
}
