import { useEffect, useState } from "react";

const breakpoints = {
  sm: 688,
  md: 976,
  lg: 1248,
};

const getColumnCount = (): number => {
  const { innerWidth } = window;

  if (innerWidth < breakpoints.sm) return 1;
  if (innerWidth < breakpoints.md) return 2;
  if (innerWidth < breakpoints.lg) return 3;

  return 4;
};

export const useResponsiveColumns = () => {
  const [columnCount, setColumnCount] = useState(getColumnCount());

  const handleResize = () => setColumnCount(getColumnCount());

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return columnCount;
};
