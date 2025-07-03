import { RefObject, useEffect } from "react";

export const getMaxZIndex = (): number => {
  const elements = Array.from(document.querySelectorAll("*"));
  return elements.reduce((maxZ, el) => {
    const zIndex = parseFloat(window.getComputedStyle(el).zIndex);
    return zIndex > maxZ ? zIndex : maxZ;
  }, 0);
};

export const useZIndex = (
  dropdownRef: RefObject<HTMLDivElement>,
  isOpen: boolean
) => {
  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        const maxZIndex = getMaxZIndex();
        dropdownRef.current.style.zIndex = (maxZIndex + 1).toString();
      } else {
        dropdownRef.current.style.zIndex = "";
      }
    }
  }, [isOpen, dropdownRef]);
};
