import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/eshoplogo.png" className="w-36 min-w-36" />
    </Link>
  );
}
