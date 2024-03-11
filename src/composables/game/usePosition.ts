import { useMemo } from "react";

export interface Position {
  x: number;
  y: number;
}

export function usePosition(pos: Position) {
  const position = useMemo(() => {
    return {
      left: pos.x * 32 + "px",
      top: pos.y * 32 + "px",
    };
  }, [pos]);

  return {
    position,
  };
}
