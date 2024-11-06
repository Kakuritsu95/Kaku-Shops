import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" className="w-44 min-w-36" />
    </Link>
  );
}
