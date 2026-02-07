export const highway_details = (
  cway_width = 3,
  cway_height = 12,
  cways_count = 3,
) => {
  const curr_div_to_use = ["black", "yellow"];
  let count = 0;
  return ({
    "cwayWidth": () => cway_width,
    "cwayHeight": () => cway_height,
    "cwaysCount": () => cways_count,
    "dividersCount": () => cways_count - 1,
    "currDivColor": () => curr_div_to_use[count++ % curr_div_to_use.length],
  });
};
