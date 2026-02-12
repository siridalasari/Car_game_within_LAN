export const CEMENT_BLOCK = "\x1B[48;5;254m" + "  " + "\x1B[0m";
export const PLAYER_CAR = "\x1B[48;5;254m" + "🚘" + "\x1B[0m";
export const YELLOW_DIV = "\x1B[48;5;226m" + " " + "\x1B[0m";
export const BLACK_DIV = "\x1B[48;5;0m" + " " + "\x1B[0m";
export const CAR1 = "\x1B[48;5;254m" + "🔵" + "\x1B[0m";
export const CAR2 = "\x1B[48;5;254m" + "⚫️" + "\x1B[0m";
export const CAR3 = "\x1B[48;5;254m" + "🟠" + "\x1B[0m";

export const highwayMaterials = (highwayBluePrint) => {
  const bluePrint = highwayBluePrint;
  const DIVIDERS = {
    "black": BLACK_DIV,
    "yellow": YELLOW_DIV,
  };
  const dividersCount = bluePrint.dividersCount();
  // const dividerPalette = bluePrint.dividerPalette();
  //let dividerColor = dividerPalette[0];

  return ({
    "getDividers": () => {
      const divColor = bluePrint.currDivColor();
      const divider = DIVIDERS[divColor];
      const dividers = Array.from({ length: dividersCount }, () => divider);
      return dividers;
    },

    "getSegments": () => {
      const cway_segment = Array.from(
        { length: bluePrint.trackWidth() },
        () => CEMENT_BLOCK,
      );
      const cways_segments = Array.from(
        { length: bluePrint.trackCount() },
        () => cway_segment,
      );
      return cways_segments;
    },
  });
};
