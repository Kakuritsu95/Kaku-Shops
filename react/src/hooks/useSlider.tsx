import { useEffect, useRef, useState } from "react";

export function useSlider() {
  const [indexOfItemsGroupToDisplay, setIndexOfItemsGroupToDisplay] =
    useState<number>(0);
  const sliderContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const containerWidth = sliderContainerRef.current?.clientWidth;
    if (sliderContainerRef && sliderContainerRef.current && containerWidth) {
      sliderContainerRef.current.style.transform = `translateX(${
        -indexOfItemsGroupToDisplay * containerWidth
      }px)`;
    }
  }, [indexOfItemsGroupToDisplay]);

  return {
    sliderContainerRef,
    setIndexOfItemsGroupToDisplay,
    indexOfItemsGroupToDisplay,
  };
}
