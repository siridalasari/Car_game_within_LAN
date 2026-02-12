export const getHighwayBluePrint = (
  trackWidth = 3,
  trackHeight = 12,
  trackCount = 3,
) => {
  const dividerPalette = ["black", "yellow"];

  let count = 1;
  return ({
    "trackWidth": () => trackWidth,
    "trackHeight": () => trackHeight,
    "trackCount": () => trackCount,
    "dividersCount": () => trackCount - 1,
    "currDivColor": () => {
      console.log(count);
      return dividerPalette[count++ % dividerPalette.length];
    },
  });
};
