export const CEMENT_BLOCK = "\x1B[48;5;254m" + "  " + "\x1B[0m";
export const PLAYER_CAR = "\x1B[48;5;254m" + "🚘" + "\x1B[0m";
export const YELLOW_DIV = "\x1B[48;5;226m" + " " + "\x1B[0m";
export const BLACK_DIV = "\x1B[48;5;0m" + " " + "\x1B[0m";

export const highwayMaterials = (highway_details) => {
  const details = highway_details;
  const DIVIDERS = {
    "black": BLACK_DIV,
    "yellow": YELLOW_DIV,
  };
  const dividersCount = details.dividersCount();

  return ({
    "getDividers": () => {
      const divColor = details.currDivColor();
      console.log({ divColor }, { color: DIVIDERS[divColor] });
      const divider = DIVIDERS[divColor];
      const dividers = Array.from({ length: dividersCount }, () => divider);
      return dividers;
    },
    "getSegements": () => {
      const cway_segment = Array.from(
        { length: details.cwayWidth() },
        () => CEMENT_BLOCK,
      );
      const cways_segments = Array.from(
        { length: details.cwaysCount() },
        () => cway_segment,
      );
      return cways_segments;
    },
  });
};
