import { CgSpinner } from "react-icons/cg";
export default function Spinner({
  absoluteCenter,
  displayStart,
  size = 24,
}: {
  absoluteCenter?: boolean;
  displayStart?: boolean;
  size?: number;
}) {
  return (
    <CgSpinner
      size={size}
      className={`animate-spin ${absoluteCenter && "absolute left-1/2 top-1/2"} ${!displayStart && "mx-auto"}`}
    />
  );
}
