import { ReactNode } from "react";

export default function LoadingSkeletonsList({
  numberOfSkeletonsToRender = 9,
  children,
}: {
  numberOfSkeletonsToRender?: number;
  children: ReactNode;
}) {
  const arrayOfSkeletonsToRender = Array.from(
    { length: numberOfSkeletonsToRender },
    (_, index) => index,
  );

  return arrayOfSkeletonsToRender.map(() => children);
}
