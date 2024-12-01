import { CgSpinner } from "react-icons/cg";
export default function Spinner({
  absoluteCenter,
  size,
}: {
  absoluteCenter?: boolean;
  size: number;
}) {
  return (
    <CgSpinner
      size={size}
      className={`mx-auto animate-spin ${absoluteCenter && "absolute left-1/2 top-1/2"}`}
    />
  );
}
